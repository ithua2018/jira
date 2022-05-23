import { useEffect, useState } from "react"
import { cleanObject, useDebounce, useMount } from "utils"
import { List, Project } from "./list"
import { SearchPanel } from "./search-panel"
import { useHttp } from "utils/http"
import styled from "@emotion/styled"
import { useProjects } from "utils/project"
import { Typography } from "antd"
import { useUsers } from "utils/user"
export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId:''
    })
  
    const debouncedParam = useDebounce(param, 2000)
    const {isLoding, error, data:list} = useProjects(debouncedParam)

    const {data: users} = useUsers()


    return <Container>

        <h1>项目列表</h1>
        <SearchPanel  param={param} setParam = {setParam}  users={users || []}/>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List loading={isLoding}  dataSource={list || []}  users={users || []}/>
    </Container>
}

const Container = styled.div`
    padding: 3.2rem;
`