//
// Created by zyc on 2022/12/09.
//
import PubSub from 'pubsub-js';
import * as React from 'react';
import {Box, HStack, Text} from "@chakra-ui/react";
import { Skeleton, Stack } from '@chakra-ui/react'
import ResultCard from "../result_card";
import {Pagination, Row, Select, Col} from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import AdvancedSearchFilter from "./advanced_search_filter";



function Sort(props) {
    const handleChange = (value) => {
        props.setSortOrder(value)
        let data = {}
        data.advancedSearch = props.advancedSearch
        data.advStartTime = props.advStartTime
        data.advEndTime = props.advEndTime
        data.filterAuthors = props.filterAuthor
        data.filterPublicationTypes = props.filterPublicationType
        data.startTime = props.startTime
        data.endTime = props.endTime
        data.sort = value
        data.page = props.page
        console.log(data)
        let config = {
            method: 'post',
            url: '/AdvancedSearchResults',
            data : data
        }
        props.setLoading(true)
        axios(config)
            .then(res => {
                props.setInfos(res.data.data.list)
                props.setFilterInfos({
                    publicationTypes: res.data.data.venue,
                    authors: res.data.data.author,
                    totalNumber: res.data.data.num
                })
                // props.setRecommendationInfos(res.data.data.recommendation)
                props.setLoading(false)
                console.log(res.data)
            })
    };

    return(
        <Box float={'right'} mr={'21%'} mt={'-50'}>
            <Select
                onChange={handleChange}
                style={{width:120}}
                defaultValue={props.sort_order}
                options={[
                    {
                        value: 'default',
                        label: '默认'
                    },
                    {
                        value: 'mostRecent',
                        label: '最新'
                    },
                    {
                        value: 'mostCited',
                        label: '最多被引'
                    },
                ]}
            />
        </Box>
    )
}


function AdvancedSearchResults(props) {
    const [resIsEmpty,setResIsEmpty] = React.useState(false)
    const [isInit,setIsInit] = React.useState(false)
    const [infos,setInfos] = React.useState()
    const [filterInfos,setFilterInfos] = React.useState()
    const [isLoading, setLoading] = React.useState(true)
    const [current_page_index,setCurrentPageIndex] = React.useState(1)
    const [advancedSearch,setAdvancedSearch] = React.useState()
    const [advStartTime,setAdvStartTime] = React.useState()
    const [advEndTime,setAdvEndTime] = React.useState()
    const [sort_order, setSortOrder] = React.useState('default')
    const [totalNum,setTotalNum] = React.useState()
    const [startTime,setStartTime] = React.useState("1900-01-01")
    const [endTime,setEndTime] = React.useState("2030-01-01")
    const [filterAuthor,setFilterAuthor] = React.useState(null)
    const [filterPublicationType,setFilterPublocationType] = React.useState(null)

    // showed cards per page
    let page_show_num = 10
    let page_num
    let page_num_array
    // count from 1
    let card_index_min
    let card_index_max

    const handleChange = (page,pageSize) => {
        setCurrentPageIndex(page)
        let data = {}
        data.advancedSearch = advancedSearch
        data.advStartTime = advStartTime
        data.advEndTime = advEndTime
        data.filterAuthors = filterAuthor
        data.filterPublicationTypes = filterPublicationType
        data.startTime = startTime
        data.endTime = endTime
        data.page = page
        data.sort = sort_order
        console.log(data)
        let config = {
            method: 'post',
            url: '/AdvancedSearchResults',
            data : data
        }
        setLoading(true)
        axios(config)
            .then(res => {
                setInfos(res.data.data.list)
                setFilterInfos({
                    publicationTypes: res.data.data.venue,
                    authors: res.data.data.author,
                    totalNumber: res.data.data.num
                })
                setLoading(false)
                console.log(res.data)
            })
    }

    PubSub.unsubscribe('PubParams');
    PubSub.subscribe('PubParams', (msg, params) => {
        console.log('--------')
        let data = {}
        data.advancedSearch = params.dataList === undefined ? null : params.dataList
        data.advStartTime = params.startTime === undefined ? "1900-01-01" : params.startTime + "-01"
        data.advEndTime = params.endTime === undefined ? "2030-01-01" : params.endTime + "-01"
        data.filterAuthors = null
        data.filterPublicationTypes = null
        data.startTime = "1900-01-01"
        data.endTime = "2030-01-01"
        data.page = 1
        data.sort = sort_order
        setAdvancedSearch(data.advancedSearch)
        setAdvStartTime(data.startTime)
        setAdvEndTime(data.endTime)
        console.log(data)
        let config = {
            method: 'post',
            url: '/AdvancedSearchResults',
            data : data
        };
        setLoading(true)
        axios(config)
            .then(res => {
                setIsInit(false)
                setInfos(res.data.data.list)
                setFilterInfos({
                    publicationTypes: res.data.data.venue,
                    authors: res.data.data.author,
                    totalNumber: res.data.data.num
                })
                setCurrentPageIndex(1)
                setTotalNum(res.data.data.num)
                if(res.data.data.list.length === 0) {
                    setResIsEmpty(true)
                }
                else {
                    setResIsEmpty(false)
                }
                setLoading(false)
                console.log(res.data.data)
                console.log(infos)
            })
    })

    let location = useLocation()
    let params = new URLSearchParams(location.search)
    React.useEffect(() => {
        if(!params.has('label') && !params.has('source')) {
            let data = {}
            data.advancedSearch = null
            data.advStartTime = "1900-01-01"
            data.advEndTime = "2030-01-01"
            data.filterAuthors = null
            data.filterPublicationTypes = null
            data.startTime = "1900-01-01"
            data.endTime = "2030-01-01"
            data.page = 1
            data.sort = sort_order
            console.log(data)
            let config = {
                method: 'post',
                url: '/AdvancedSearchResults',
                data: data
            };
            axios(config)
                .then(res => {
                    if(res.data.data === null) {
                        setLoading(false)
                        setIsInit(true)
                        return
                    }
                    setIsInit(false)
                    setInfos(res.data.data.list)
                    setFilterInfos({
                        publicationTypes: res.data.data.venue,
                        authors: res.data.data.author,
                        totalNumber: res.data.data.num
                    })
                    setCurrentPageIndex(1)
                    setTotalNum(res.data.data.num)
                    if(res.data.data.list.length === 0) {
                        setResIsEmpty(true)
                    }
                    else {
                        setResIsEmpty(false)
                    }
                    setLoading(false)
                    console.log(res.data)
                })
        }
    }, [])

    if(isLoading) {
        return (
            <Stack ml={'150px'} mt={'100px'}>
                <Row>
                    <Col span={6}>
                        <Skeleton height='30px' width='100px' mt='100px'/>

                        <Skeleton height='20px' width='250px' mt='40px'/>
                        <Skeleton height='15px' width='200px' mt='10px' ml='50px' />
                        <Skeleton height='15px' width='200px' mt='10px' ml='50px' />

                        <Skeleton height='20px' width='250px' mt='40px'/>
                        <Skeleton height='15px' width='200px' mt='10px' ml='50px' />
                        <Skeleton height='15px' width='200px' mt='10px' ml='50px' />
                    </Col>
                    <Col span={17} offset={1}>
                        <Skeleton height='50px' width='700px' />
                        <Skeleton height='20px' width='400px' mt='10px' />
                        <Skeleton height='20px' width='200px' mt='10px' />
                        <Skeleton height='20px' width='800px' mt='20px' />
                        <Skeleton height='20px' width='800px' mt='10px' />
                        <Skeleton height='20px' width='800px' mt='10px' />

                        <Skeleton height='50px' width='700px' mt='100px' />
                        <Skeleton height='20px' width='400px' mt='10px' />
                        <Skeleton height='20px' width='200px' mt='10px' />
                        <Skeleton height='20px' width='800px' mt='20px' />
                        <Skeleton height='20px' width='800px' mt='10px' />
                        <Skeleton height='20px' width='800px' mt='10px' />

                        <Skeleton height='50px' width='700px' mt='100px'/>
                        <Skeleton height='20px' width='400px' mt='10px' />
                        <Skeleton height='20px' width='200px' mt='10px' />
                        <Skeleton height='20px' width='800px' mt='20px' />
                        <Skeleton height='20px' width='800px' mt='10px' />
                        <Skeleton height='20px' width='800px' mt='10px' />
                    </Col>
                </Row>

            </Stack>
        )
    }

    if(isInit) {
        return (
            <Box/>
        )
    }

    return(
        <Box>
            {/*右侧界面*/}
            <AdvancedSearchFilter
                setInfos={setInfos}
                setFilterInfos={setFilterInfos}
                setLoading={setLoading}
                setCurrentPageIndex={setCurrentPageIndex}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                setFilterAuthor={setFilterAuthor}
                setFilterPublictionType={setFilterPublocationType}
                setTotalNum={setTotalNum}
                setSortOrder={setSortOrder}
                setResIsEmpty={setResIsEmpty}
                filterInfos={filterInfos}
                advancedSearch={advancedSearch}
                advStartTime={advStartTime}
                advEndTime={advEndTime}
            />
            <Box>
                {/*排序*/}
                {
                    !resIsEmpty &&
                    <Sort
                        page={current_page_index}
                        sort_order={sort_order}
                        infos={infos}
                        setInfos={setInfos}
                        setFilterInfos={setFilterInfos}
                        setLoading={setLoading}
                        setSortOrder={setSortOrder}
                        startTime={startTime}
                        endTime={endTime}
                        advancedSearch={advancedSearch}
                        advStartTime={advStartTime}
                        advEndTime={advEndTime}
                        filterAuthor={filterAuthor}
                        filterPublicationType={filterPublicationType}
                    />
                }
                <HStack float={'left'} ml={'30%'} mt={'-50'}>
                    <Text color={'#777'} fontSize={'24px'}>{'共'}</Text>
                    <Text color={'#161616'} fontSize={'24px'}>{totalNum}</Text>
                    <Text color={'#777'} fontSize={'24px'}>{'条结果'}</Text>
                </HStack>
                {/*论文卡片*/}
                <Box mt={'120'} ml={'80px'}>
                    {
                        infos.map((value,key) => {
                            return (
                                <ResultCard infos={value}/>
                            )
                        })
                    }
                </Box>
                {/*分页*/}
                {
                    !resIsEmpty &&
                    <Box width={'50%'} ml={'40%'} mt={'50px'}>
                        <Pagination
                            onChange={handleChange}
                            total={totalNum}
                            showSizeChanger={false}
                            defaultCurrent={current_page_index}
                        />
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default AdvancedSearchResults;
