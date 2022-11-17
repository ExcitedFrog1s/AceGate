
import { Center, Grid, GridItem, Text} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons";


function Header(){
    return (
        <div>
                <Grid
                    w='100%'
                    h='8vh'
                    templateColumns='repeat(8, 1fr)'
                    color='white'
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
                        <Center height="100%">
                            <FontAwesomeIcon icon={faUser} size='sm'/>
                            <Text fontSize='18px' ml="8px">登录</Text>
                        </Center>
                    </GridItem>
                </Grid>

        </div>
    )
}

export default Header;
