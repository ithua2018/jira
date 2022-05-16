import { useEffect, useState } from "react"

export  const isFlasy = (value) => value === 0 ? false : !value


export const cleanObject  = (object) => {
    const result = {...object}
    Object.keys(object).forEach(key=>{
        const value = result[key]
        if(isFlasy(value)) {
            delete result[key]
        }
    })

    return result

}

export const useMount = (callBack) => {
    useEffect(()=>{
        callBack()  
    }, [])
}


export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(()=>{
          const timeOut = setTimeout(()=> setDebouncedValue(value), delay)
          return () => clearTimeout(timeOut)
    }, [value,delay])
 
    return debouncedValue
}