
import {Box, Center, Flex, Grid, GridItem, HStack, Input, Link, Text, useColorModeValue} from '@chakra-ui/react'

import {Link as RouterLink} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";



const usefulLinks = [
    {
        name: "中文查重-PaperFree",
        link: "https://www.paperfree.cn/"
    },
    {
        name: "英文查重-Turnitin",
        link: "https://www.turnitin.com/zh-hans"
    },
    {
        name: "Google Scholar",
        link: "https://scholar.google.com"
    },
    {
        name: "arXiv",
        link: "https://arxiv.org/"
    },
    {
        name: "权威期刊分区-SJR",
        link: "https://www.scimagojr.com/journalrank.php"
    },
    {
        name: "权威会议分区-ConferenceRanks",
        link: "http://www.conferenceranks.com/"
    },
    {
        name: "中科院分区-LetPub",
        link: "https://www.letpub.com.cn/index.php?page=journalapp"
    },
    {
        name: "计算机科学排名-csrankings",
        link: "http://csrankings.org/"
    },
    {
        name: "上交自研排名引擎-AceRankings",
        link: "https://www.acemap.info/ranking"
    },
    {
        name: "上交自研学术平台-AceMap",
        link: "https://www.acemap.info"
    },
]


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
            w='80vw'
            mx={'10vw'}
            h='8vh'
            color={textColor}
        >
            <Flex
                h={'100%'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <HStack
                    spacing={'15vw'}
                >
                    <Text fontSize={28}>Logo</Text>
                    <HStack

                        as={'nav'}
                        spacing={'5vw'}
                        display={{ base: 'none', md: 'flex' }}>

                        {isLanding ?
                            <Box />
                            :
                            <Input
                                size='md'
                                backgroundColor='white'
                                width='25vw'
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

                    </HStack>
                </HStack>
                <HStack spacing={'3vw'}>
                    {sections.map((link) => (
                        <NavLink key={link}>{link}</NavLink>
                    ))}
                    {isLoggedIn ?
                        <Link
                            as={RouterLink} to={'/landing'}
                            fontSize={'16px'}
                            _hover={{
                                textDecoration: 'none',
                            }}
                        >欢迎回来，{loggedInUsername}</Link>
                    :
                        <Link
                            as={RouterLink} to={'/login2'}
                            fontSize={'16px'}
                            _hover={{
                                textDecoration: 'none',
                            }}
                        >登录/注册</Link>
                    }

                </HStack>

            </Flex>
        </Box>

    )
}

export default Header;
