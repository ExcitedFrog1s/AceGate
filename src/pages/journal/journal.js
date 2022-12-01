import * as React from 'react'

import {ProjectOutlined, BarsOutlined} from '@ant-design/icons';
import { DatePicker} from 'antd';
import { Col, Row } from 'antd';
import { Box } from '@chakra-ui/react'
import {Input} from '@chakra-ui/react'
import { Select, Text } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import {Button, ButtonGroup} from '@chakra-ui/react'
import {Heading, Stack, StackDivider} from '@chakra-ui/react'
import { Search2Icon, RepeatIcon, AddIcon, MinusIcon} from '@chakra-ui/icons'

import './journal.css';

//antd组件汉化
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


function Title({}) {
    return(
        <Box boxShadow='xs' rounded='md'
            borderRadius='25px' border='2px' borderColor='gray.200'
            className='title'>
            <Row>
            <ProjectOutlined style={{ fontSize: '42px', color: '#08c'}}></ProjectOutlined>
            <Heading as='h2' size='xl' style={{marginLeft:'30px', width:'650px'}}>
                IEEE Transactions on Information Forensics and Security 
            </Heading>
            </Row>
            <Row className='index'>
                <Col span={8}>
                    <Heading as='h3' size='lg'>3,369</Heading>
                    <Text fontSize='xl'>Papers</Text>
                </Col>
                <Col span={8}>
                    <Heading as='h3' size='lg'>3,369</Heading>
                    <Text fontSize='xl'>Papers</Text>
                </Col>
                <Col span={8}>
                    <Heading as='h3' size='lg'>3,369</Heading>
                    <Text fontSize='xl'>Papers</Text>
                </Col>
            </Row>
        </Box>
    )
}

function Keywords({}) {
    return(
        <Box boxShadow='xs' rounded='md'
        borderRadius='25px' border='2px' borderColor='gray.200'
        className='keywords'>
            <Row>
                <BarsOutlined style={{ fontSize: '30px', color: '#08c'}}></BarsOutlined>
                <Heading  size='lg' style={{marginLeft:'20px', marginBottom:'10px'}}>Keywords </Heading>
            </Row>
            <Text fontSize='xl' className='keywordItem'>Computer network</Text>
            <Text fontSize='xl' className='keywordItem'>Theoretical computer science</Text>
            <Text fontSize='xl' className='keywordItem'>Pattern recognition</Text>
            <Text fontSize='xl' className='keywordItem'>Computer security</Text>
        </Box>
    )
}

function Chart({}) {
    return(
        <Box boxShadow='xs' rounded='md'
        borderRadius='25px' border='2px' borderColor='gray.200'
        className='chart'>
            
        </Box>
    )
}    

function List({}) {
    return(
        <Box boxShadow='xs' rounded='md'
        borderRadius='25px' border='2px' borderColor='gray.200'
        className='description'>
            
        </Box>
    )
}    

function Journal({}) {
    return(
        <html >
            <Row>
                <Col span={14} offset={1}>
                    <Title ></Title>
                </Col>
                <Col span={7} offset={1}>
                    <Keywords></Keywords>
                </Col>
            </Row>
            <Row>
                <Col span={7} offset={1}>
                    <Chart></Chart>
                </Col>
                <Col span={7} style={{marginLeft:'40px'}}>
                    <Chart></Chart>
                </Col>
                <Col span={7} style={{marginLeft:'40px'}}>
                    <Chart></Chart>
                </Col>
                
            </Row>
            <List></List>
        </html>
    )
}

export default Journal;