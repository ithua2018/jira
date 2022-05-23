import { useState } from "react";

interface IState<D> {
    error: Error | null;
    data: D | null;
    state: 'idle' | 'loading' | 'error' | 'success'
}
const defaultInitialState: IState<null> = {
    state: 'idle',
    data: null,
    error: null
}

export const UseAsync = <D>(initialState?: IState<D>) =>{
     const [state, setState] = useState<IState<D>>({
             ...defaultInitialState,
             ...initialState
     })

     const setData = (data:D) => setState({
         data,
         state: 'success',
         error: null
     })
     const setError = (error:Error) => setState({
        error,
        state: 'error',
        data: null
    })

    const run = (promise: Promise<D>) =>{
        if(!promise || !promise.then) {
            throw new Error('请输入Promise类型数据')
        }

        setState({...state, state: 'loading'})
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error=>{
            setError(error)
            return error
        })

    }

    return {
        isIdle: state.state === 'idle',
        isLoding: state.state === 'loading',
        isErroe: state.state === 'error',
        isSuccess: state.state === 'success',
        run,
        setData,
        setError,
        ...state
    }

}