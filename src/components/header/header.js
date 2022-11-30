
import {Box, Center, Flex, Grid, GridItem, HStack, Link, Text, useColorModeValue} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons";



const NavLink = ({ children }) => (
    <Link
        px={2}
        py={1}
        rounded={'sm'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);


function Header({textColor}){

    const sections = ['选项1', '选项2', '选项3']

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
                    spacing={'20vw'}
                >
                    <Text fontSize={28}>Logo</Text>
                    <HStack
                        as={'nav'}
                        spacing={'5vw'}
                        display={{ base: 'none', md: 'flex' }}>
                        {sections.map((link) => (
                            <NavLink key={link}>{link}</NavLink>
                        ))}
                    </HStack>
                </HStack>
                <Text>登录</Text>
            </Flex>
        </Box>

    )
}

export default Header;
