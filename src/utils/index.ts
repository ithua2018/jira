import { useEffect, useState } from "react"

export  const isFlasy = (value:unknown) => value === 0 ? false : !value

export const isVoid = (value:unknown) => value ===undefined || value === '' || value === null
export const cleanObject  = (object:{[key: string]: unknown}) => {
    const result = {...object}
    Object.keys(object).forEach(key=>{
        const value = result[key]
        if(isVoid(value)) {
            delete result[key]
        }
    })

    return result

}

export const useMount = (callBack: ()=> void) => {
    useEffect(()=>{
        callBack()  
        //eslint-disable-next-line  react-hooks/exhaustive-deps
    }, [])
}


export const useDebounce =<V>(value:V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(()=>{
          const timeOut = setTimeout(()=> setDebouncedValue(value), delay)
          return () => clearTimeout(timeOut)
    }, [value,delay])
 
    return debouncedValue
}