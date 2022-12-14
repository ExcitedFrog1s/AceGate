/**
 * @author AboveParadise 2022/11/13
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import './test.css'
import {Box,HStack,Text,Divider,Tabs,TabList,TabPanels,Tab,TabPanel,List,ListItem, Link} from "@chakra-ui/react";
import Comment from "./paper_comment";
import axios from "axios";
function Reference(prop) {

    const handleClick = (PID) => {
        window.open('/paperDetails?PID=' + PID)
    }
    const jump = (value) => {
        window.open(value)
    }

    const [isreflink, setReflink] = React.useState(false)
    const [isrellink, setRellink] = React.useState(false)
    React.useEffect( () => {

        if(prop.refs.length === 0){
            setReflink(true)

        }
        if(prop.rels.length === 0){
            setRellink(true)
        }

    },[])
    console.log(isreflink)
    console.log(isrellink)
    return(
        <Box
            width={'100%'}
            borderWidth={'5'}
            borderRadius={'20'}
            borderStyle={'solid'}
            boxShadow={'4px 4px 15px 0 rgba(0,0,0,0.1)'}
            backgroundColor={'#ffffff'}
            padding="20px"
        >
            <Tabs colorScheme={'frog'}>
                <TabList >
                    <Tab fontWeight='bold'>参考文献</Tab>
                    <Tab fontWeight='bold'>相关文献</Tab>
                    <Tab fontWeight='bold'>文章评论</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel ml={8}>
                        <Text textDecoration={'none'}
                              color={'gray'}
                              fontSize={'15'}

                        >
                            共 {!isreflink && prop.refs.length}{isreflink && prop.reflink.length} 篇参考文献
                        </Text>
                         <Text color={'gray'} fontSize={'15'} mt={4}>
                            受版权限制，部分论文可能无法展示
                            </Text>
                        {!isreflink &&
                            <List mt={4} fontSize={'15'}>
                        {prop.refs.map((value, key) => {
                            // console.log(value)
                            return (<ListItem key={key} mb={4} className={'t'}>
                            <Link onClick={()=>handleClick(value.pid)} fontWeight='bold' color={'#4A5568'}>
                            [{key+1}]&nbsp;&nbsp;
                        {value.pname.replace(/<[^>]*>/g, '')}
                            </Link>
                            <HStack>
                        {(value.Pauthor !== undefined) &&
                            value.Pauthor.map((aut,key1) => {
                            return (<Text key={key1} color={'gray'} fontSize={'14'} ml={6} fontWeight='bold'>
                        {aut}</Text>
                            )
                        })
                        }

                            </HStack>
                            </ListItem>)

                        })}

                            </List>}

                        {isreflink && <List mt={4} fontSize={'15'} fontWeight='bold' color={'#4A5568'}>
                            {prop.reflink.map((value, key) => {
                                if(key < 5){
                                    return (<ListItem key={key} mb={4} className={'t'}>
                                        <Link style={{textDecoration:'none'}} onClick={()=>jump(value)} >
                                            [{key+1}]&nbsp;&nbsp;
                                            {value}
                                        </Link>
                                    </ListItem>)
                                }
                                // console.log(value)


                            })}

                        </List>}
                    </TabPanel>

                    <TabPanel ml={8}>
                        <Text textDecoration={'none'}
                              color={'gray'}
                              fontSize={'15'}

                        >
                            共 {!isrellink && prop.rels.length}{isrellink && prop.rellink.length} 篇相关文献

                        </Text>
                        <Text color={'gray'} fontSize={'15'} mt={4}>
                            受版权限制，部分论文可能无法展示
                        </Text>
                        {!isrellink && <List mt={4} fontSize={'15'}>
                            {prop.rels.map((value, key) => {
                                console.log(value)
                                return (<ListItem key={key} mb={4} className={'t'}>
                                    <Link onClick={() => handleClick(value.pid)} fontWeight='bold' color={'#4A5568'}>
                                        [{key + 1}]&nbsp;&nbsp;
                                        {value.pname.replace(/<[^>]*>/g, '')}

                                    </Link>
                                    <HStack>
                                        {(value.Pauthor !== undefined) &&
                                            value.Pauthor.map((aut, key1) => {
                                                return (<Text key={key1} color={'gray'} fontSize={'14'} ml={6} fontWeight='bold'>
                                                        {aut}</Text>
                                                )
                                            })
                                        }

                                    </HStack>
                                </ListItem>)

                            })}

                        </List>}
                        {isrellink && <List mt={4} fontSize={'15'}>
                            {prop.rellink.map((value, key) => {
                                // console.log(value)
                                if(key < 5){
                                    return (<ListItem key={key} mb={4} className={'t'}>
                                        <Link onClick={()=>jump(value)} fontWeight='bold' color={'#4A5568'}>
                                            [{key+1}]&nbsp;&nbsp;
                                            {value}

                                        </Link>

                                    </ListItem>)
                                }


                            })}

                        </List>}

                    </TabPanel>
                    <TabPanel ml={8}>
                        <Comment pid={prop.pid}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>

    )
}
export default Reference
