import qs from "qs"
import * as auth from  'auth-provider'
import { useAuth } from "context/auth-context"
const apiUrl = process.env.REACT_APP_API_URL
interface IConfig extends RequestInit {
    token ?: string
    data?: object
}
export const http =async (endpint: string, {data, token, headers, ...customConfig}:IConfig={}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-type': data? `application/json`: ''
        },
        ...customConfig
    }

    if(config.method.toLocaleUpperCase() === 'GET') {
        endpint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})    
    }
    return window.fetch(`${apiUrl}/${endpint}`, config).then(async response => {
        if(response.status === 401) {
            await auth.logout()
            window.location.reload()
            return Promise.reject({message: '请重新登录'})

        }
        const data = await response.json()
        if(response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

export const useHttp = () =>{
    const {user} = useAuth()
    // [string, IConfig]  ===  Parameters<typeof http>
    return (...[endpoint, config]: Parameters<typeof http> ) => http(endpoint, {...config, token: user?.token})
}