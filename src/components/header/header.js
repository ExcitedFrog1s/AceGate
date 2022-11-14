
import {Button, Center, Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react'


function Header(){
    return (
        <div>
            <Grid
                w='100%'
                h='8vh'
                templateColumns='repeat(8, 1fr)'
            >
                <GridItem colSpan={1}>
                    <Center height='100%'>
                        <Text fontSize={32}>
                            AceGate Logo
                        </Text>
                    </Center>
                </GridItem>
                <GridItem colSpan={6}>

                </GridItem>
                <GridItem colSpan={1}>
                    <Button colorScheme='blue'>Button</Button>
                </GridItem>
            </Grid>
            <Tabs>
                <TabList>
                    <Tab>One</Tab>
                    <Tab>Two</Tab>
                    <Tab>Three</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default Header;
