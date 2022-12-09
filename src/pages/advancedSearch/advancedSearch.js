import * as React from 'react'
import PubSub from 'pubsub-js';
import {useNavigate} from "react-router-dom";
import AdvancedSearchResults from "../serach_results/advanced_search/advanced_search_results";

import { DatePicker} from 'antd';
import { Col, Row } from 'antd';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
  } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import {Input} from '@chakra-ui/react'
import { Select, Text } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import {Button, ButtonGroup} from '@chakra-ui/react'
import {Heading, Stack, StackDivider} from '@chakra-ui/react'
import { Search2Icon, RepeatIcon, AddIcon, MinusIcon} from '@chakra-ui/icons'

import './advancedSearch.css';

//antd组件汉化
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


const { RangePicker } = DatePicker;

function Search({}) {
    const [dataList, setDataList] = React.useState([
    {
        category: 'main',
        content: "",
        type: 1,
    },
    {
        category: 'author',
        content: "",
        type: 1,
    },
    {
        category: 'source',
        content: "",
        type: 1,
    }]);

    const [startTime, setStartTime] = React.useState();
    const [endTime, setEndTime] = React.useState();
    const [timeValue, setTimeValue] = React.useState();

    const changeTime = (date, dateString) => {
        setStartTime(dateString[0]);
        setEndTime(dateString[1]);
    };

    const addItem = (index) => {
        dataList.splice(index+1, 0, {
            category: '',
            content: '',
            type: '',
        });
        setDataList([...dataList]);
    };

    const deleteItem = (index) => {
        dataList.splice(index,1);
        setDataList([...dataList]);
    };

    const clean = () => {
        dataList.splice(0, dataList.length);
        dataList.push({
            category: 'main',
            content: "",
            type: 1,
        });
        dataList.push({
            category: 'author',
            content: "",
            type: 1,
        });
        dataList.push({
            category: 'source',
            content: "",
            type: 1,
        });
        setDataList([...dataList]);
        setStartTime(undefined);
        setEndTime(undefined);
        setTimeValue(new Date)
    };

    const search = () => {
        const params = {
            dataList: dataList,
            startTime: startTime,
            endTime: endTime
        };
        PubSub.publish('PubParams', params);
    }

    return(
        <Box boxShadow='2xl' rounded='md'
            borderRadius='20px' border='1px' borderColor='gray.200'
            className='site-card-border-less-wrapper'
            css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#cccccc',
                  borderRadius: '24px',
                },
              }}>

            <Breadcrumb fontSize='15px' color='#4A5568'>
                <BreadcrumbItem >
                    <BreadcrumbLink href='/searchResults'>检索</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#'>高级检索</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            {dataList.map((item, index) => (
                <Row style={{marginTop:'20px'}} key={index}>
                    <Col span={3}>
                        {
                            index !== 0?(
                                <Select
                                    fontWeight='550'
                                    border='1.5px #A0AEC0 solid'
                                    focusBorderColor='navy.500'
                                    value={item.type}
                                    onChange={(e) => {
                                        dataList[index].type = e.target.value;
                                        setDataList([...dataList]);
                                    }}>
                                    <option value='1'>AND</option>
                                    <option value='2'>OR</option>
                                    <option value='3'>NOT</option>
                                </Select>
                            ):(
                                <div></div>
                            )
                        }
                    </Col>
                    <Col span={3}>
                        <Select
                            fontWeight='550'
                            border='1.5px #A0AEC0 solid'
                            focusBorderColor='navy.500'
                            style={{marginLeft: '5px'}} value={item.category}
                            onChange={(e) => {
                                dataList[index].category = e.target.value;
                                setDataList([...dataList]);
                            }}>
                            <option value='main'>篇关摘</option>
                            <option value='title'>篇名</option>
                            <option value='abstract'>摘要</option>
                            <option value='keyword'>关键词</option>
                            <option value='author'>作者</option>
                            <option value='institute'>作者机构</option>
                            <option value='field'>领域</option>
                            <option value='source'>论文来源</option>
                            <option value='DOI'>DOI</option>
                        </Select>
                    </Col>
                    <Col span={14} offset={1}>
                        <Input
                            border='1.5px #A0AEC0 solid'
                            focusBorderColor='navy.500'
                            value={item.content}
                            onChange={(e) => {
                                dataList[index].content = e.target.value;
                                setDataList([...dataList]);}}>
                        </Input>
                    </Col>
                    <Col span={2} offset={1}>
                    <IconButton
                        colorScheme='purple'
                        aria-label='Call Segun'
                        size='sm'
                        icon={<AddIcon />}
                        onClick={() => {
                            addItem(index);
                        }}/>
                        {
                            index !== 0?(
                                <IconButton
                                style={{marginLeft: '5px'}}
                                variant='outline'
                                colorScheme='blue'
                                aria-label='Call Segun'
                                size='sm'
                                icon={<MinusIcon />}
                                onClick={() => {
                                    deleteItem(index);
                                }}
                                />
                            ):(
                                <div></div>
                            )
                        }

                    </Col>
                </Row>
            ))}
            <Row style={{marginTop:'30px'}}>
                <Col span={5} offset={2}>
                    <Text className="time">请选择出版时间</Text>
                </Col>
                <Col span={17}>
                    <RangePicker locale={locale} picker="month" className='datePicker'
                        onChange={changeTime} key={timeValue}/>
                </Col>
            </Row>
            <ButtonGroup spacing={20} style={{marginTop: '60px', marginLeft: '400px'}} >
                <Button colorScheme='purple' leftIcon={<Search2Icon />} onClick={search}>
                    搜索
                </Button>
                <Button variant='outline' colorScheme='blue' leftIcon={<RepeatIcon />}
                    onClick={() => {
                        clean();
                    }}>
                    重置
                </Button>
            </ButtonGroup>
        </Box>
    )
}

function Description({}) {
    return(
        <Box boxShadow='2xl' rounded='md'
        borderRadius='20px' border='1px' borderColor='gray.200'
        className='description'
        css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#cccccc',
              borderRadius: '24px',
            },
          }}
        >
            <Heading size='md' style={{marginBottom:'20px'}} className="d0">高级检索使用方法</Heading>
            <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                    <Heading size='xs' textTransform='uppercase' className="d1">
                    高级检索特点
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                    高级检索支持多字段逻辑组合，并可通过检索控制等方法完成较复杂的检索，得到符合需求的检索结果。
                    多字段组合检索的运算优先级，按从上到下的顺序依次进行。
                    </Text>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase' className="d2">
                    检索条件输入区
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                    默认显示篇关摘、作者、论文来源三个检索框, 可自由选择检索项、检索项间的逻辑关系。
                    点击检索框后的、按钮可添加或删除检索项, 最多支持10个检索项的组合检索。
                    </Text>
                </Box>
                <Box>
                    <Heading size='xs' textTransform='uppercase' className="d3">
                    检索项
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                    提供的检索项有: 主题、篇关摘、关键词、篇名、全文、作者、作者单位、基金、摘要、小标题、参考文献、分类号、文献来源、DOI。
                    </Text>
                </Box>
            </Stack>
        </Box>
    )
}

function AdvancedSearch({}) {
    return(
        <Box>
            <Row>
                <Heading size='md' style={{margin:'auto'}}>Header</Heading>
            </Row>
            <Row>
                <Col span={17}>
                    <Search ></Search>
                </Col>
                <Col span={6} style={{marginLeft:'40px'}}>
                    <Description></Description>
                </Col>
            </Row>
                <AdvancedSearchResults/>
        </Box>
    )
}

export default AdvancedSearch;
