/**
 * @author AboveParadise 2022/11/13
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import {Box, HStack, Text, Divider, Tabs, TabList, TabPanels, Tab, TabPanel} from "@chakra-ui/react";
import Comment from "./paper_comment";
function Reference() {
    const property = {

    }

    return(
        <Box
            // height={'1348'}
            width={'55%'}
            borderWidth={'5'}
            borderRadius={'12'}
            borderStyle={'solid'}
            marginLeft={'3%'}
            color={'#E2E8F0'}
            boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
            position={'absolute'}
        >
            <Tabs align={'end'}>
                <TabList >
                    <Tab>参考文献</Tab>
                    <Tab>相关文献</Tab>
                    <Tab>文章评论</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Text textDecoration={'none'}
                              color={'#161616'}
                              fontSize={'25'}
                              m={8}
                        >
                            {property.abs}
                        </Text>

                        <Text ml={8} color={'#161616'}
                              fontSize={'15'} noOfLines={5}
                              maxW={850} mr={8}>{property.abstract}</Text>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
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