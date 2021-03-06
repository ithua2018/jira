import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import { Button, Dropdown,Menu } from "antd";
export const AuthenticatedApp = () => {
    const {logout, user} = useAuth()
    return <Container>
        <Header between={true}>
            <HeaderLeft grap={true}>
               <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'}/>
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
           
            <Dropdown overlay={<Menu>
                <Menu.Item><Button type={"link"}  onClick={logout}>登出</Button></Menu.Item>
            </Menu>}>
              <Button type={"link"} >
                  Hi,{user?.name}
              </Button>      

            </Dropdown>
            </HeaderRight>
           
        </Header>
        {/* <Nav>nav</Nav> */}
        <Main>
             <ProjectListScreen/>
        </Main>
        {/* <Aside>aside</Aside> */}
        <Footer>footer</Footer>
    </Container>
}

const Container = styled.div`
 display: grid;
 grid-template-rows: 6rem 1fr 6rem;
 /* grid-template-columns: 20rem 1fr 20rem;
 grid-template-areas: 
 "header header header"
 "nav main aside"
 "footer footer footer"
 ; */
 height: 100vh;
 /* grid-gap: 10rem; */
`
const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``

const Nav = styled.nav``

const Aside = styled.aside``
    
const Footer = styled.footer``