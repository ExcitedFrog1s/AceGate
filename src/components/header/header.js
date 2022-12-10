
import {Box, Center, Flex, Grid, GridItem, HStack, Input, Link, Text, useColorModeValue} from '@chakra-ui/react'

import {Link as RouterLink} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import React from "react";



const NavLink = ({ children }) => (
    <Link
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

    const sections = ['工具箱']

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
                            />
                        }

                    </HStack>
                </HStack>
                <HStack spacing={'3vw'}>
                    {sections.map((link) => (
                        <NavLink key={link}>{link}</NavLink>
                    ))}
                    <Link
                        as={RouterLink} to={'/login'}
                        fontSize={'16px'}
                        _hover={{
                            textDecoration: 'none',
                            color: 'black'
                        }}
                    >登录</Link>
                </HStack>

            </Flex>
        </Box>

    )
}

export default Header;
