import React from 'react';
import Header from "../../components/header/header";
import landing_bg from "../../assets/landing_bg.png";
import {Box, Button, Center, Grid, GridItem, HStack, Input, Text, VStack} from "@chakra-ui/react";
import RecommendVenuesCard from "./recommend-venues-card";
import RecommendPapersCard from "./recommend-papers-card";

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
                            placeholder="输入您想搜索的论文，学者等，敲下回车"
                            />
                    </Box>
                </VStack>
            </Box>
            <Box
                height='40vh'
                position='relative'
                top='-5vh'
            >
                <Center>
                    <HStack
                        spacing='4vw'
                    >
                        <RecommendVenuesCard subject={"ComputerVision"} />
                        <RecommendPapersCard subject={"ComputerVision"} />
                        <RecommendVenuesCard />
                    </HStack>
                </Center>
            </Box>
            <Box
                height={'80vh'}
                paddingBottom='15vh'
            >
                <Grid
                    width='80%'
                    height='100%'
                    marginLeft='10%'
                    marginRight='10%'

                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(8, 1fr)'
                    gap={6}
                >
                    <GridItem colSpan={4} rowSpan={2} bg='tomato' >

                    </GridItem>
                    <GridItem colSpan={4} rowSpan={1} bg='lightgrey'>

                    </GridItem>
                    <GridItem colSpan={4} rowSpan={1} bg='cyan'>

                    </GridItem>
                </Grid>
            </Box>
        </div>


    )
}

export default Landing;
