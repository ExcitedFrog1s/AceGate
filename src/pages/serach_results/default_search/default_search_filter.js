//
// Created by zyc on 2022/12/09.
//

import {Box, Stack, Input, Text, Checkbox, Button, RadioGroup, Radio} from '@chakra-ui/react';
import {useState} from "react";
import {AiOutlineFilter} from "react-icons/ai";
import * as React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {wait} from "@testing-library/user-event/dist/utils";
import locale from "antd/lib/date-picker/locale/zh_CN";
import {Col, DatePicker} from "antd";

const { RangePicker } = DatePicker;


function DefaultSearchTimeRangeFilter(props) {
    const [start_time,setStartTime] = useState()
    const [end_time,setEndTime] = useState()
    const [timeValue, setTimeValue] = useState();

    const changeTime = (date, dateString) => {
        setStartTime(dateString[0]);
        setEndTime(dateString[1]);
        props.setStartTime(dateString[0])
        props.setEndTime(dateString[1])
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

function DefaultSearchPublicationTypesFilter(props) {
    return(
        <Box ml={'20px'} mt={'30px'}>
            <Text>{'出版类型'}</Text>
            <RadioGroup onChange={props.setPublicationTypes} defaultValue={props.publicationTypes}>
                <Stack direction='column'>
                    <Radio value='全部'>{'全部（' + props.totalNumber + "）"}</Radio>
                    {
                        props.content.map((value, key) => {
                            if(value.num !== 0) {
                                return (
                                    <Radio value={value.type} key={key}>
                                        {value.type + "（" + value.num + "）"}
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

function DefaultSearchAuthorsFilter(props) {
    return(
        <Box ml={'20px'} mt={'30px'}>
            <Text>{'作者'}</Text>
            <RadioGroup onChange={props.setAuthors} defaultValue={props.authors}>
                <Stack direction='column'>
                    <Radio value='全部'>{'全部（' + props.totalNumber + "）"}</Radio>
                    {
                        props.content.map((value, key) => {
                            if(value.num !== 0) {
                                return (
                                    <Radio value={value.uid} key={key}>
                                        {value.name + "（" + value.num + "）"}
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

function DefaultSearchFilter(props) {
    const [publicationTypes,setPublicationTypes] = useState('全部')
    const [authors,setAuthors] = useState('全部')
    const [startTime,setStartTime] = useState("1900-01")
    const [endTime,setEndTime] = useState("2030-12")

    let location = useLocation()
    let params = new URLSearchParams(location.search)

    const filter = () => {
        let data = {}
        data.normalSearch = params.get('q')
        data.filterAuthors = authors === '全部' ? null : authors
        data.filterPublicationTypes = publicationTypes === '全部' ? null : publicationTypes
        data.startTime = startTime + "-01"
        data.endTime = endTime + "-01"
        data.sort = 'default'
        data.page = 1
        props.setStartTime(data.startTime)
        props.setEndTime(data.endTime)
        props.setFilterAuthor(data.filterAuthors)
        props.setFilterPublictionType(data.filterPublicationTypes)
        props.setSortOrder('default')
        console.log(data)
        let config = {
            method: 'post',
            url: '/DefaultSearchResults',
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
                props.setTotalPage(res.data.data.totalPage)
                props.setCurrentPageIndex(1)
                props.setLoading(false)
            })
    }
    return(
        <Box
            minHeight={'1000px'}
            width={'25%'}
            ml={'20px'}
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
            <DefaultSearchTimeRangeFilter
                setStartTime={setStartTime}
                setEndTime={setEndTime}
            />
            <DefaultSearchPublicationTypesFilter
                content={props.filterInfos.publicationTypes}
                totalNumber={props.filterInfos.totalNumber}
                setPublicationTypes={setPublicationTypes}
                publicationTypes={publicationTypes}
            />
            <DefaultSearchAuthorsFilter
                content={props.filterInfos.authors}
                totalNumber={props.filterInfos.totalNumber}
                setAuthors={setAuthors}
                authors={authors}
            />
        </Box>
    )
}

export default DefaultSearchFilter
