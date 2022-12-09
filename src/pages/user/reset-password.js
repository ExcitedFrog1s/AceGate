import {
    Box,
    Button,
    Center, Checkbox, Flex,
    FormControl,
    FormLabel,
    HStack,
    Image,
    Input, Link,
    SimpleGrid,
    Text,
    VStack
} from '@chakra-ui/react'
import Header from "../../components/header/header";

import loginImg from '../../assets/login_img.jpg'

function ResetPassword(){
    return (
        <div>
            <Header textColor={'black'} />
            <Box
                height={'80vh'}
            >
                <Center
                    height={'100%'}
                >
                    <Box
                        width={'50vw'}
                        height={'60vh'}

                        borderRadius={"min(2vw, 18px)"}

                        boxShadow='base'
                    >
                        <SimpleGrid columns={2}>
                            <Box
                                width={'100%'}
                                height={'60vh'}

                                backgroundImage={loginImg}
                                backgroundSize={'fill'}
                                backgroundRepeat={'no-repeat'}
                                backgroundPosition={'center'}

                                borderRadius={"min(2vw, 18px)"}
                            >

                            </Box>
                            <Box>
                                <VStack
                                    spacing={'min(60px, 8vh)'}
                                    width={'74%'}
                                    height={'94%'}
                                    mx={'13%'}
                                >
                                    <Box height={'30px'}/>
                                    <VStack
                                        width={'100%'}
                                    >
                                        <Text fontSize={'32px'} fontWeight={'semibold'}>
                                            重新设置密码
                                        </Text>
                                    </VStack>
                                    <VStack
                                        width={'100%'}
                                        spacing={'min(15px, 2vh)'}
                                    >
                                        <FormControl id="username">
                                            <FormLabel fontSize={'15px'}>注册账户时使用的邮箱</FormLabel>
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
                                        发送找回邮件
                                    </Button>
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

export default ResetPassword;
