import { FC, useReducer, PropsWithChildren } from "react";
import { UiContext, uiReducer } from "./";

export interface UiState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};

type Props = {};
export const UiProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
      dispatch({ type: '[UI] - ToggleMenu'});
  }

  return (
    <UiContext.Provider
      value={{
        ...state,

        //methods
        toggleSideMenu
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
