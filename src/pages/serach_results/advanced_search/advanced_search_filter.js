//
// Created by zyc on 2022/12/09.
//
import PubSub from 'pubsub-js';
import {Box, Stack, Input, Text, Checkbox, Button, RadioGroup,Radio} from '@chakra-ui/react';
import {useState} from "react";
import {AiOutlineFilter} from "react-icons/ai";
import * as React from 'react';
import axios from "axios";
import {Col, DatePicker} from "antd";
import locale from "antd/lib/date-picker/locale/zh_CN";

const { RangePicker } = DatePicker;

function AdvancedSearchTimeRangeFilter(props) {
    const [start_time,setStartTime] = useState()
    const [end_time,setEndTime] = useState()
    const [timeValue, setTimeValue] = useState();

    const changeTime = (date, dateString) => {
        setStartTime(dateString[0]);
        setEndTime(dateString[1]);
        props.setStartTime(dateString[0] + "-01")
        props.setEndTime(dateString[1] + "-01")
    };

    return(
        <Box ml={'20px'} mt={'30px'}>
            <Text mb={'10px'}>{'发表年份'}</Text>
            <Col span={17}>
                <RangePicker locale={locale} picker="month" className='datePicker'
                             onChange={changeTime} key={timeValue}/>
            </Col>
        </Box>
    )
}

function AdvancedSearchPublicationTypesFilter(props) {
    return(
        <Box ml={'20px'} mt={'30px'}>
            <Text>{'出版类型'}</Text>
            <RadioGroup onChange={props.setPublicationTypes} defaultValue={props.publicationTypes}>
                <Stack direction='column'>
                    <Radio value='全部'>{'全部'}</Radio>
                    {
                        props.content.map((value, key) => {
                            if(value.num !== 0) {
                                return (
                                    <Radio value={value.type} key={key}>
                                        {value.type[0].toUpperCase() + value.type.substring(1)}
                                    </Radio>
                                )
                            }
                        })
                    }
                </Stack>
            </RadioGroup>
        </Box>
    )
}

function AdvancedSearchAuthorsFilter(props) {
    return(
        <Box ml={'20px'} mt={'30px'}>
            <Text>{'作者'}</Text>
            <RadioGroup onChange={props.setAuthors} defaultValue={props.authors}>
                <Stack direction='column'>
                    <Radio value='全部'>{'全部'}</Radio>
                    {
                        props.content.map((value, key) => {
                            if(value.num !== 0) {
                                return (
                                    <Radio value={value.uid} key={key}>
                                        {value.name}
                                    </Radio>
                                )
                            }
                        })
                    }
                </Stack>
            </RadioGroup>
        </Box>
    )
}

function AdvancedSearchConceptsFilter(props) {
    return(
        <Box mt={'30px'}>
            <Text fontWeight='bold' color='#4A5568' fontSize={16} mb={2}>{'领域'}</Text>
            <RadioGroup onChange={props.setConcepts} defaultValue={props.concepts} colorScheme={'frog'}>
                <Stack direction='column'>
                    <Radio value='全部'>{'全部'}</Radio>
                    {
                        props.content.map((value, key) => {
                            return (
                                <Radio value={value} key={key}>
                                    {value}
                                </Radio>
                            )
                        })
                    }
                </Stack>
            </RadioGroup>
        </Box>
    )
}

function AdvancedSearchFilter(props) {
    const [publicationTypes,setPublicationTypes] = useState('全部')
    const [authors,setAuthors] = useState('全部')
    const [concepts,setConcepts] = useState('全部')
    const [startTime,setStartTime] = useState("1900-01-01")
    const [endTime,setEndTime] = useState("2030-01-01")

    const filter = () => {
        let data = {}
        data.advancedSearch = props.advancedSearch === undefined ? null : props.advancedSearch
        data.advStartTime = props.advStartTime === undefined ? "1900-01-01" : props.advStartTime
        data.advEndTime = props.advEndTime === undefined ? "2020-01-01" : props.advEndTime
        data.filterAuthors = authors === '全部' ? null : authors
        data.filterPublicationTypes = publicationTypes === '全部' ? null : publicationTypes
        data.startTime = startTime === undefined ? "1900-01-01" : startTime
        data.endTime = endTime === undefined ? "2020-01-01" : endTime
        data.page = 1
        data.sort = 'default'
        console.log(data)
        let config = {
            method: 'post',
            url: '/AdvancedSearchResults',
            data : data
        };
        props.setLoading(true)
        axios(config)
            .then(res => {
                console.log(res.data.data)
                props.setInfos(res.data.data.list)
                props.setFilterInfos({
                    publicationTypes: res.data.data.venue,
                    authors: res.data.data.author,
                    totalNumber: res.data.data.num
                })
                // props.setRecommendationInfos(res.data.data.recommendation)
                props.setTotalNum(res.data.data.num)
                props.setCurrentPageIndex(1)
                if(res.data.data.list.length === 0) {
                    props.setResIsEmpty(true)
                }
                else {
                    props.setResIsEmpty(false)
                }
                props.setLoading(false)
            })
    }

    return(
        <Box
            minHeight={'1000px'}
            width={'25%'}
            ml={'100px'}
            borderWidth={'5'}
            borderRadius={'12'}
            borderStyle={'solid'}
            borderColor={'#E2E8F0'}
            boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
            position={'absolute'}
        >
            <Box>
                <Button
                    ml={'55%'}
                    mt={'20px'}
                    rightIcon={<AiOutlineFilter/>}
                    colorScheme='blue'
                    variant='outline'
                    onClick={filter}
                >
                    {'筛选'}
                </Button>
            </Box>
            <AdvancedSearchTimeRangeFilter
                setStartTime={setStartTime}
                setEndTime={setEndTime}
            />
            <AdvancedSearchPublicationTypesFilter
                content={props.filterInfos.publicationTypes}
                totalNumber={props.filterInfos.totalNumber}
                setPublicationTypes={setPublicationTypes}
                publicationTypes={publicationTypes}
            />
            <AdvancedSearchAuthorsFilter
                content={props.filterInfos.authors}
                totalNumber={props.filterInfos.totalNumber}
                setAuthors={setAuthors}
                authors={authors}
            />
            <AdvancedSearchConceptsFilter
                content={props.filterInfos.concepts}
                concepts={concepts}
                setConcepts={setConcepts}
            />
        </Box>
    )
}

export default AdvancedSearchFilter
