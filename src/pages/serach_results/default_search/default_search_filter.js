//
// Created by zyc on 2022/12/09.
//
import "./search.css"
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
        props.setStartTime(dateString[0] + "-01")
        props.setEndTime(dateString[1] + "-01")
    };

    return(
        <Box mt={'50px'}>
            <Text mb={2} fontWeight='bold' color='#4A5568' fontSize={16}>{'发表年份'}</Text>
            <RangePicker locale={locale} picker="month" className='datePicker'
                             onChange={changeTime} key={timeValue}/>
        </Box>
    )
}

function DefaultSearchPublicationTypesFilter(props) {
    return(
        <Box mt={'30px'}>
            <Text fontWeight='bold' color='#4A5568' mb={2} fontSize={16}>{'出版类型'}</Text>
            <RadioGroup onChange={props.setPublicationTypes} defaultValue={props.publicationTypes} colorScheme={'frog'}>
                <Stack direction='column'>
                    <Radio value='全部'>{'全部'}</Radio>
                    {/* {
                        props.content.map((value, key) => {
                            return (
                                <Radio value={value.type} key={key}>
                                    {value.type[0].toUpperCase() + value.type.substring(1)}
                                </Radio>
                            )
                        })
                    } */}
                </Stack>
            </RadioGroup>
        </Box>
    )
}

function DefaultSearchAuthorsFilter(props) {
    return(
        <Box mt={'30px'}>
            <Text fontWeight='bold' color='#4A5568' fontSize={16} mb={2}>{'作者'}</Text>
            <RadioGroup onChange={props.setAuthors} defaultValue={props.authors} colorScheme={'frog'}>
                <Stack direction='column'>
                    <Radio value='全部'>{'全部'}</Radio>
                    {/* {
                        props.content.map((value, key) => {
                            return (
                                <Radio value={value.uid} key={key}>
                                    {value.name}
                                </Radio>
                            )
                        })
                    } */}
                </Stack>
            </RadioGroup>
        </Box>
    )
}

function DefaultSearchConceptsFilter(props) {
    return(
        <Box mt={'30px'}>
            <Text fontWeight='bold' color='#4A5568' fontSize={16} mb={2}>{'领域'}</Text>
            <RadioGroup onChange={props.setConcepts} defaultValue={props.concepts} colorScheme={'frog'}>
                <Stack direction='column'>
                    <Radio value='全部'>{'全部'}</Radio>
                    {/* {
                        props.content.map((value, key) => {
                            return (
                                <Radio value={value} key={key}>
                                    {value}
                                </Radio>
                            )
                        })
                    } */}
                </Stack>
            </RadioGroup>
        </Box>
    )
}

function DefaultSearchFilter(props) {
    const [publicationTypes,setPublicationTypes] = useState('全部')
    const [authors,setAuthors] = useState('全部')
    const [concepts,setConcepts] = useState('全部')
    const [startTime,setStartTime] = useState("1900-01")
    const [endTime,setEndTime] = useState("2030-01-01")

    let location = useLocation()
    let params = new URLSearchParams(location.search)

    const filter = () => {
        let data = {}
        data.normalSearch = params.get('q')
        if(data.normalSearch === undefined) {
            data.normalSearch = ''
        }
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
                    concepts: res.data.data.concepts,
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
            className='left'
            width={'100%'}
            borderWidth={'5'}
            borderRadius={'20'}
            borderStyle={'solid'}
            borderColor={'#E2E8F0'}
            boxShadow={'4px 4px 15px 0 rgba(0,0,0,0.1)'}
            backgroundColor={'#ffffff'}
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
            <Box className="filterbutton">
                <Button
                    float={"right"}
                    rightIcon={<AiOutlineFilter/>}
                    colorScheme={'frog'}
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
            <DefaultSearchConceptsFilter
                content={props.filterInfos.concepts}
                concepts={concepts}
                setConcepts={setConcepts}
            />
        </Box>
    )
}

export default DefaultSearchFilter
