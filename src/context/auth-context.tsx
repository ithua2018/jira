import React, { ReactNode, useState } from "react";
import * as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
interface IAuthForm  {
    username: string;
    password: string;
 }
 const bootstrapUser =async () => {
     let user = null
     const token = auth.getToken()
     if(token) {
         const data = await http('me', {token})
         user = data.user
     }
     return user
 }
const AuthContext = React.createContext<{
    user: User | null,
    register: (form: IAuthForm) => Promise<void>,
    login: (form: IAuthForm) => Promise<void>,
    logout: () => Promise<void>

} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'
export const AuthProvider = ({children}:{children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
     //point free setUser  ==== user => setUser(user)
    const login = (form: IAuthForm) => auth.login(form).then(setUser)
     //point free setUser  ==== user => setUser(user)
    const register = (form: IAuthForm) =>    auth.register(form).then(setUser)
    const logout = () =>  auth.logout().then(() => setUser(null))
    useMount(()=>{
        bootstrapUser().then(setUser)
    })
    return <AuthContext.Provider  children={children} value={{user, login, register, logout}}  />
}

export const useAuth = () =>{
    const context =React.useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth 必须在AuthProvider中使用')
    }

    return context
}
