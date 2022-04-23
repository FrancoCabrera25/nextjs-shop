import { FC } from "react";
import { Slide } from "react-slideshow-image";
import styles from './SlidesShow.module.css';
interface Props {
  images: string[];
}

const SlidesShow: FC<Props> = ({ images }) => {
  return(
    <Slide
    easing='ease'
    duration= { 700 }
    indicators
    >
      {
          images.map(image => {
              const url = `/products/${image}`;
              return (
                  <div className={styles['each-slide'] } key={image}>
                        <div style={{
                            backgroundImage: `url(${url})`,
                            backgroundSize:'cover'
                        }}>

                        </div>
                  </div>
              )
          })
      }
    </Slide>
  )
};

export default SlidesShow;
