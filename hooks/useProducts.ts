import useSWR, { SWRConfiguration } from 'swr'
import { IProduct } from '../interface'

//const fetcher = (...args:[key: any]) => fetch(...args).then(res => res.json())

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
    const { data, error } = useSWR<IProduct[]>(`/api/${url}`, config)


    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error,
    }
}