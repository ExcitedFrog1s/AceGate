//
// Created by zyc on 2022/12/09.
//

import Header from '../../../components/header/header'
import * as React from 'react';
import {Box, HStack, Input, Skeleton, Stack, Text} from "@chakra-ui/react";
import ResultCard from "../result_card";
import DefaultFilter from "../default_search/default_search_filter";
import {Col, Pagination, Row, Select, Spin} from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import DefaultSearchFilter from "../default_search/default_search_filter";
import Recommendation from "./recommendation";

function Sort(props) {
    let location = useLocation()
    let params = new URLSearchParams(location.search)

    const handleChange = (value) => {
        props.setSortOrder(value)
        let data = {}
        data.normalSearch = params.get('q')
        data.filterAuthors = props.filterAuthor
        data.filterPublicationTypes = props.filterPublicationType
        data.startTime = props.startTime
        data.endTime = props.endTime
        data.sort = value
        data.page = 1
        console.log(data)
        let config = {
            method: 'post',
            url: '/DefaultSearchResults',
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


function DefaultSearchResults(props) {
    const [resIsEmpty,setResIsEmpty] = React.useState(false)
    const [infos,setInfos] = React.useState()
    const [filterInfos,setFilterInfos] = React.useState()
    const [recommendationInfos,setRecommendationInfos] = React.useState()
    const [isLoading, setLoading] = React.useState(true)
    const [current_page_index,setCurrentPageIndex] = React.useState(1)
    const [sort_order, setSortOrder] = React.useState('default')
    const [totalNum,setTotalNum] = React.useState()
    const [startTime,setStartTime] = React.useState('1900-01-01')
    const [endTime,setEndTime] = React.useState('2030-01-01')
    const [filterAuthor,setFilterAuthor] = React.useState(null)
    const [filterPublicationType,setFilterPublocationType] = React.useState(null)
    // showed cards per page
    let paper_show_num_per_page = 10
    let page_num
    let page_num_array
    // count from 1
    let card_index_min
    let card_index_max

    let location = useLocation()
    let params = new URLSearchParams(location.search)

    const handleChange = (page,pageSize) => {
        setCurrentPageIndex(page)
        let data = {}
        data.normalSearch = params.get('q')
        data.filterAuthors = filterPublicationType
        data.filterPublicationTypes = filterAuthor
        data.startTime = startTime
        data.endTime = endTime
        data.sort = sort_order
        data.page = page
        console.log(data)
        let config = {
            method: 'post',
            url: 'DefaultSearchResults',
            data : data
        };
        setLoading(true)
        axios(config)
            .then(res => {
                console.log(res)
                setInfos(res.data.data.list)
                setFilterInfos({
                    publicationTypes: res.data.data.venue,
                    authors: res.data.data.author,
                    totalNumber: res.data.data.num
                })
                setRecommendationInfos(res.data.data.recommendation)
                setLoading(false)
                setTotalNum(res.data.data.num)
                if(res.data.data.list.length === 0) {
                    setResIsEmpty(true)
                }
                else {
                    setResIsEmpty(false)
                }
                console.log(res.data)
            })
    }

    React.useEffect(() => {
        let data = {}
        data.normalSearch = params.get('q')
        data.filterAuthors = null
        data.filterPublicationTypes = null
        data.startTime = "1900-01-01"
        data.endTime = "2030-01-01"
        data.sort = sort_order
        data.page = current_page_index
        console.log(data)
        let config = {
            method: 'post',
            url: 'DefaultSearchResults',
            data : data
        };
        setLoading(true)
        axios(config)
            .then(res => {
                setInfos(res.data.data.list)
                setFilterInfos({
                    publicationTypes: res.data.data.venue,
                    authors: res.data.data.author,
                    totalNumber: res.data.data.num
                })
                setRecommendationInfos(res.data.data.recommendation)
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
    },[])

    if(isLoading) {
        return (
            <Box>
                <Header textColor={'black'}/>
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
            </Box>
        )
    }

    return(
        <Box>
        <Header textColor={'black'} />
        <Box>
            {/*左侧界面*/}
            <DefaultSearchFilter
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
            />
            <Recommendation recommendation={recommendationInfos}/>
            <Box>
                {/*排序*/}
                {
                    !resIsEmpty &&
                    <Sort
                        sort_order={sort_order}
                        infos={infos}
                        setInfos={setInfos}
                        setFilterInfos={setFilterInfos}
                        setLoading={setLoading}
                        setSortOrder={setSortOrder}
                        startTime={startTime}
                        endTime={endTime}
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
                <Box mt={'200'} ml={'-60px'}>
                    {
                        infos.map((value,key) => {
                            return (
                                <ResultCard infos={value} />
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
                            defaultCurrent={current_page_index}/>
                    </Box>
                }
            </Box>
        </Box>
            </Box>
    )
}

export default DefaultSearchResults;
