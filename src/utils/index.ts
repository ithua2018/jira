import { useEffect, useState } from "react"

export  const isFlasy = (value:unknown) => value === 0 ? false : !value


export const cleanObject  = (object:Object) => {
    const result = {...object}
    Object.keys(object).forEach(key=>{
        // @ts-ignore
        const value = result[key]
        if(isFlasy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })

    return result

}

export const useMount = (callBack: ()=> void) => {
    useEffect(()=>{
        callBack()  
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