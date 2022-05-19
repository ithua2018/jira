import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
export const  LoginScreen = () => {
    // const login = (param:{username:string, password:string}) =>{
    //     fetch(`${apiUrl}/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body:JSON.stringify(param)
    //     }).then(async response => {
    //         if(response.ok) {
             
    //         }
    //     })
    const {login, user} = useAuth()
    const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
             event.preventDefault()
             const username = (event.currentTarget.elements[0] as HTMLInputElement).value
             const password = (event.currentTarget.elements[1] as HTMLInputElement).value
             login({username, password})

    }
    return <form onSubmit={handleSubmit}>
       
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" name="username" id="username"/>
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <button type="submit">登录</button>
            </div>

    </form>
}