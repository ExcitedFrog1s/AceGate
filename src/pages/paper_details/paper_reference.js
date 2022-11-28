/**
 * @author AboveParadise 2022/11/13
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import './test.css'
import {Box,HStack,Text,Divider,Tabs,TabList,TabPanels,Tab,TabPanel,List,ListItem, Link} from "@chakra-ui/react";
import Comment from "./paper_comment";
function Reference() {
    const property = {
        refs:[{title:"马克思主义中国化的道路",authors:["马克思","恩格斯"]},
            {title:"马克思主义苏联化的道路",authors:["列宁","例丁"]}
            ],
        related:[{
            title:'test title',
            'authors':['maple','AboveParadise','frog'],

        },],
    }
    const st = {

    }
    return(
        <Box
            width={'55%'}
            borderWidth={'5'}
            borderRadius={'12'}
            borderStyle={'solid'}
            marginLeft={'3%'}
            boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
            position={'absolute'}
        >
            <Tabs align={'end'} colorScheme={'purple'}>
                <TabList >
                    <Tab >参考文献</Tab>
                    <Tab>相关文献</Tab>
                    <Tab>文章评论</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel ml={8}>
                        <Text textDecoration={'none'}
                              color={'gray'}
                              fontSize={'15'}

                        >
                            共 {property.refs.length} 篇参考文献
                        </Text>
                        <Text color={'gray'} fontSize={'15'} mt={4}>
                            受版权限制，部分论文可能无法展示
                        </Text>
                        <List mt={4} fontSize={'15'}>
                            {property.refs.map((value, key) => {
                                return (<ListItem key={key} mb={4} className={'t'}>
                                        <Link href={'/'} style={{ textDecoration:'none'}}>
                                        [{key+1}]&nbsp;&nbsp;
                                        {value.title}

                                        </Link>
                                        <HStack>
                                    {
                                        value.authors.map((aut,key1) => {
                                            return (<Text key={key1} color={'gray'} fontSize={'14'} ml={6}>
                                                    {aut}</Text>
                                        )
                                    })
                                    }

                                    </HStack>
                                </ListItem>)

                            })}

                        </List>

                    </TabPanel>
                    <TabPanel ml={8}>
                        <Text textDecoration={'none'}
                              color={'gray'}
                              fontSize={'15'}

                        >
                            共 {property.refs.length} 篇相关文献
                        </Text>
                        <Text color={'gray'} fontSize={'15'} mt={4}>
                            受版权限制，部分论文可能无法展示
                        </Text>
                        <List mt={4} fontSize={'15'}>
                            {property.refs.map((value, key) => {
                                return (<ListItem key={key} mb={4} className={'t'}>
                                    <Link href={'/'} style={{ textDecoration:'none'}}>
                                        [{key+1}]&nbsp;&nbsp;
                                        {value.title}

                                    </Link>
                                    <HStack>
                                        {
                                            value.authors.map((aut,key1) => {
                                                return (<Text key={key1} color={'gray'} fontSize={'14'} ml={6}>
                                                        {aut}</Text>
                                                )
                                            })
                                        }

                                    </HStack>
                                </ListItem>)

                            })}

                        </List>

                    </TabPanel>
                    <TabPanel>
                        <Comment/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>

    )
}
export default Reference