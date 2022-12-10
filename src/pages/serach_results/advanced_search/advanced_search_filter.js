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

function AdvancedSearchPublicationTypesFilter(props) {
    return(
        <Box ml={'20px'} mt={'30px'}>
            <Text>{'出版类型'}</Text>
            <RadioGroup onChange={props.setPublicationTypes} defaultValue={props.publicationTypes}>
                <Stack direction='column'>
                    <Radio value='全部'>{'全部（' + props.totalNumber + "）"}</Radio>
                    {
                        props.content.map((value, key) => {
                            return(
                                <Radio value={value.publicationType}>{value.publicationType + "（" + value.number + "）"}</Radio>
                            )
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
                    <Radio value='全部'>{'全部（' + props.totalNumber + "）"}</Radio>
                    {
                        props.content.map((value, key) => {
                            return(
                                <Radio value={value.UID}>{value.author + "（" + value.number + "）"}</Radio>
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
    const [startTime,setStartTime] = useState()
    const [endTime,setEndTime] = useState()

    const [advParamList, setAdvParamList] = React.useState();
    const [advEndTime, setAdvEndTime] = React.useState();
    const [advStartTime, setAdvStartTime] = React.useState();

    React.useEffect(() => {
        PubSub.subscribe('PubParams', (msg, params) => {
            setAdvParamList(params.dataList)
            setAdvStartTime(params.startTime)
            setAdvEndTime(params.endTime)
            setAuthors(new Array(props.filterInfos.authors.length).fill(true))
            setPublicationTypes(new Array(props.filterInfos.publicationTypes.length).fill(true))
        });
    })

    const filter = () => {
        let data = {}
        data.advancedSearch = advParamList === undefined ? [] : advParamList
        data.advStartTime = advStartTime === undefined ? '' : advStartTime
        data.advEndTime = advEndTime === undefined ? '' : advEndTime
        data.filterAuthors = authors === '全部' ? '' : authors
        data.filterPublicationTypes = publicationTypes === '全部' ? '' : publicationTypes
        data.startTime = startTime === undefined ? '' : startTime
        data.endTime = endTime === undefined ? '' : endTime
        console.log(data)
        let config = {
            method: 'post',
            url: 'https://mock.apifox.cn/m1/1955876-0-default/AdvancedSearchResults',
            data : data
        };
        props.setLoading(true)
        axios(config)
            .then(res => {
                props.setInfos(res.data.results)
                props.setFilterInfos(res.data.filterItems)
                props.setCurrentPageIndex(1)
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
        </Box>
    )
}

export default AdvancedSearchFilter
