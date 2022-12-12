
import {Box, Center, Flex, Grid, GridItem, HStack, Input, Link, Text, useColorModeValue} from '@chakra-ui/react'

import {Link as RouterLink} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import {Row,Col} from 'antd'
import * as React from "react";



const NavLink = ({ children }) => (
    <Link
        as={RouterLink}
        to={'/toolbox'}
        px={2}
        py={1}
        rounded={'sm'}
        fontSize={'16px'}
        _hover={{
            textDecoration: 'none',
            // bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

React.useEffect(() => {
    
}, [])


function Header({textColor, isLanding=false}){

    const [input,setInput] = React.useState()

    const sections = ['工具箱']

    let isLoggedIn = 0;
    let loggedInUsername = "";

    if (localStorage.getItem("userToken") !== null) {
        // 已经登录
        isLoggedIn = 1;
        loggedInUsername = localStorage.getItem("username");
        // console.log(localStorage.getItem("userToken"));
        // console.log(localStorage.getItem("username"));
    }


    // 只有white和black两种选项
    if (textColor.localeCompare("white") !== 0){
        textColor = "black"
    }

    return (
        <Box
            w='100%'
            h='9.5vh'
            bg='#0a2a43'
        >
            <Row>
                <Col span='2' offset={1}>
                    <Avatar src={require("../../assets/acegate_icon.png")} width='75px' height='75px'></Avatar>
                </Col>
                <Col span='10' offset={2}>
                    {isLanding ?
                            <Box />
                            :
                            <Input
                                size='md'
                                backgroundColor='white'
                                focusBorderColor = "white"
                                width='40vw'
                                mt='14px'
                                placeholder="快捷搜索……"
                                onChange={(e) => {
                                    setInput(e.target.value)
                                }}
                                onKeyPress={(value) => {
                                        if(value.key === "Enter") {
                                            window.open("/defaultSearch?q=" + input)
                                        }
                                }}
                            />
                    }
                </Col>
                <Col span='1'  offset='1' style={{margin:'auto'}}>
                    {sections.map((link) => (
                        // <NavLink key={link} >{link}</NavLink>
                        <Text color='tomato'>工具箱</Text>
                    ))}
                </Col>
                <Col span='2' offset={1} style={{margin:'auto'}}>
                    {isLoggedIn ?
                        <Link
                            color='tomato'
                            as={RouterLink} to={'/landing'}
                            fontSize={'16px'}
                            _hover={{
                                textDecoration: 'none',
                            }}
                        >欢迎回来，{loggedInUsername}</Link>
                    :
                        <Link
                        color='white'
                            as={RouterLink} to={'/login2'}
                            fontSize={'16px'}
                            _hover={{
                                textDecoration: 'none',
                            }}
                        >登录/注册</Link>
                    }
                </Col>
            </Row>
        </Box>

    )
}

export default Header;
