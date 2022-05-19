import { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "utils"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import qs from 'qs'
import { useHttp } from "utils/http"
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId:''
    })
    const [users, setUsers] = useState([])
    const debouncedParam = useDebounce(param, 2000)
    const [list, setList] = useState([])

    const client = useHttp()
    
    useEffect(()=>{
        client('projects', {data: cleanObject(debouncedParam)}).then(setList)
    }, [debouncedParam])


    useMount(()=>{
        client('users').then(setUsers)
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if(response.ok) {
        //        setUsers(await response.json())
        //     }
        // })
    })



    return <div>
        <SearchPanel  param={param} setParam = {setParam}  users={users}/>
        <List  list={list}  users={users}/>
    </div>
}