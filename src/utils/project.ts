import { useEffect } from "react"
import { Project } from "screens/project-list/list"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { UseAsync } from "./use-async"

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    const {run, ...result} = UseAsync<Project[]>()
    useEffect(()=>{
       run(client('projects', {data: cleanObject(param || {})}))
        //eslint-disable-next-line  react-hooks/exhaustive-deps
    }, [param])

    return result
}