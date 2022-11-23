import {Box, Center, Image, SimpleGrid} from '@chakra-ui/react'
import Header from "../../components/header/header";



function Login(){
    return (
        <div>
            <Header />
            <Box
                height={'80vh'}
            >
                <Center
                    height={'100%'}
                >
                    <Box
                        width={'50vw'}
                        height={'60vh'}

                        border={'2px solid black'}
                        borderRadius={"min(2vw, 18px)"}
                    >
                        <SimpleGrid columns={2} spacing={0}>
                            <Box
                                width={'100%'}
                                height={'60vh'}
                            >
                                <Image src="https://bit.ly/dan-abramov" fit={'fill'}/>
                            </Box>

                            <Box>
                                用户登录表单放此处
                            </Box>
                        </SimpleGrid>
                    </Box>
                </Center>
            </Box>
        </div>

    )
}

export default Login
