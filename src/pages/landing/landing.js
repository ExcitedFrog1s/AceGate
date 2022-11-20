import React from 'react';
import Header from "../../components/header/header";
import landing_bg from "../../assets/landing_bg.png";
import {Box, Button, Center, HStack, Input, Text, VStack} from "@chakra-ui/react";
import RecommendVenuesCard from "./recommend-venues-card";

function Landing(){
    return (
        <div>
            <Box
                w='100%'
                h='60vh'
                backgroundImage={landing_bg}
                bgSize='100%'
            >
                <VStack
                    spacing={7}
                >
                    <Header />
                    <Box h='8vh'>

                    </Box>
                    <Box color='white'>
                        <Text fontSize='60px' fontWeight={'extrabold'}>
                            Your Gate Towards Academia.
                        </Text>
                    </Box>
                    <Box
                        width='45vw'
                    >
                        <Input
                            size='lg'
                            backgroundColor='white'
                            width='100%'
                            placeholder="输入您想搜索的论文，学者等，敲下回车搜索..."
                            />
                    </Box>
                </VStack>
            </Box>
            <Box
                height='50vh'
                position='relative'
                top='-5vh'
            >
                <Center>
                    <HStack
                        spacing='8vw'
                    >
                        <RecommendVenuesCard subject={"Artificial Intelligence"} />
                        <RecommendVenuesCard />
                        <RecommendVenuesCard />
                    </HStack>
                </Center>
            </Box>
        </div>


    )
}

export default Landing;
