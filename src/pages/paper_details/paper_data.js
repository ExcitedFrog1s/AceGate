/**
 * @author AboveParadise 2022/11/12
 */
import {Box, HStack, Text, Divider, Select, Link} from "@chakra-ui/react";
import React, {Component} from 'react';
import ReactECharts from 'echarts-for-react';

// import * as React from "react";
function Data() {
    const property = {
        para: [100,9888,1231,33333],
        kw: ['马克思','中国化','方法论']

    }
    const s = {left:200}
    const r = {left:10, color:'#161616'}
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    };

    return(
        <Box
            height={'600'}
            width={'35%'}
            borderWidth={'5'}
            borderRadius={'12'}
            borderStyle={'solid'}
            marginLeft={'60%'}
            mr={20}
            color={'#E2E8F0'}
            position={'absolute'}
            boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
        >

            <HStack  mt={3} >

                <Box width={125}>
                    <Text textDecoration={'none'}
                          color={'#c42525'}
                          fontSize={'25'}

                          whiteSpace={'normal'}
                          align={'center'}
                    >
                        引用量
                    </Text>
                    <Text color={'#161616'}
                          fontSize={'20'}
                          m={8}
                          mt={10}
                          whiteSpace={'normal'}
                          align={'center'}>{property.para[0]}</Text>
                </Box>
                <Box width={125} m={8}>
                    <Text textDecoration={'none'}
                          color={'#34ea04'}
                          fontSize={'25'}

                          whiteSpace={'normal'}
                          align={'center'}
                    >
                        被引用量
                    </Text>
                    <Text color={'#161616'}
                          fontSize={'20'}
                          m={8}
                          mt={10}
                          whiteSpace={'normal'}
                          align={'center'}>{property.para[1]}</Text>
                </Box>
                <Box width={125} m={8}>
                    <Text textDecoration={'none'}
                          color={'#175bb4'}
                          fontSize={'25'}

                          whiteSpace={'normal'}
                          align={'center'}
                    >
                        收藏量
                    </Text>
                    <Text color={'#161616'}
                          fontSize={'20'}
                          m={8}
                          mt={10}
                          whiteSpace={'normal'}
                          align={'center'}>{property.para[2]}</Text>
                </Box>
                <Box width={125} m={8}>
                    <Text textDecoration={'none'}
                          color={'#faf14b'}
                          fontSize={'25'}

                          whiteSpace={'normal'}
                          align={'center'}
                    >
                        评论量
                    </Text>
                    <Text color={'#161616'}
                          fontSize={'20'}
                          m={8}
                          mt={10}
                          whiteSpace={'normal'}
                          align={'center'}>{property.para[3]}</Text>

                </Box>
            </HStack>
            <Divider/>
            <Box sx={{ minWidth: 120, width:'100%'}}>
                <HStack mt={30}>
                <Text  textDecoration={'none'}
                      color={'#000000'}
                      fontSize={'20'}
                      ml={10}
                       mr={20}
                      whiteSpace={'normal'}
                      align={'center'}>
                    关键词分析
                </Text>
                    <Select placeholder='Keywords' width={60} color={'#000000'}>{
                        property.kw.map((value, key) => {
                            return (
                                <option key={key} value='option1'>{value}</option>
                            );
                        })
                    }
                    </Select>



                </HStack>
            </Box>
            <div>
            <ReactECharts option={option} />
            </div>

        }

        </Box>
    )
}


export default Data;