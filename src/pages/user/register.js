import {
    Box,
    Button,
    Center, Checkbox, Flex,
    FormControl,
    FormLabel,
    HStack,
    Image,
    Input, InputGroup, InputRightAddon, InputRightElement, Link,
    SimpleGrid,
    Text,
    VStack
} from '@chakra-ui/react'
import Header from "../../components/header/header";

import loginImg from '../../assets/login_img.jpg'
import {useState} from "react";

async function registerUser() {
    // TODO
}

async function sendVerificationEmail() {

}


function Register(){

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [verifyCode, setVerifycode] = useState();
    const [countdown, setCountdown] = useState();

    const handleSendVerifyEmail = e => {

    }

    const handleRegister = e => {

    }

    return (
        <div>
            <Header textColor={'black'} />
            <Box
                height={'90vh'}
            >
                <Center
                    height={'100%'}
                >
                    <Box
                        width={'60vw'}
                        height={'70vh'}

                        borderRadius={"min(2vw, 18px)"}

                        boxShadow='base'
                    >
                        <SimpleGrid columns={2}>
                            <Box
                                width={'100%'}
                                height={'70vh'}

                                backgroundImage={loginImg}
                                backgroundSize={'fill'}
                                backgroundRepeat={'no-repeat'}
                                backgroundPosition={'center'}

                                borderRadius={"min(2vw, 18px)"}
                            >

                            </Box>
                            <Box>
                                <VStack
                                    spacing={'min(30px, 4vh)'}
                                    width={'74%'}
                                    height={'94%'}
                                    mx={'13%'}
                                >
                                    <Box height={'10px'}/>
                                    <VStack
                                        width={'100%'}
                                    >
                                        <Text fontSize={'32px'} fontWeight={'semibold'}>
                                            注册
                                        </Text>
                                    </VStack>
                                    <VStack
                                        width={'100%'}
                                        spacing={'min(10px, 1.7vh)'}
                                    >
                                        <FormControl id="username">
                                            <FormLabel fontSize={'15px'}>用户名</FormLabel>
                                            <Input type="text" />
                                        </FormControl>
                                        <FormControl id="password">
                                            <FormLabel fontSize={'15px'}>密码</FormLabel>
                                            <Input type="password" />
                                        </FormControl>
                                        <FormControl id="email">
                                            <FormLabel fontSize={'15px'}>邮箱</FormLabel>
                                            <InputGroup>
                                                <Input type="email" />
                                                <InputRightElement  w={'110px'}>
                                                    <Button>
                                                        {"发送验证码"}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>

                                        </FormControl>
                                        <FormControl id="emailVerifyCode">
                                            <FormLabel fontSize={'15px'}>邮箱验证码</FormLabel>
                                            <Input type="text" />
                                        </FormControl>
                                    </VStack>
                                    <Button
                                        bg={'#0087FF'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'rgb(0, 160, 255)',
                                        }}
                                        width={'100%'}
                                    >
                                        注册
                                    </Button>
                                    <Link color={'blue.400'}>去登录</Link>
                                </VStack>
                                <Center>
                                    <Text fontSize={'12px'} color={'darkgray'}>
                                        Your gate towards academia.
                                    </Text>
                                </Center>
                            </Box>

                        </SimpleGrid>
                    </Box>
                </Center>
            </Box>
        </div>

    )
}

export default Register;
