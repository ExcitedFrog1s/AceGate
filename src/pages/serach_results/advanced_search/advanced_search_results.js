//
// Created by zyc on 2022/12/09.
//
import PubSub from 'pubsub-js';
import * as React from 'react';
import {Box} from "@chakra-ui/react";
import { Skeleton, Stack } from '@chakra-ui/react'
import ResultCard from "../result_card";
import {Pagination, Row, Select, Col} from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import AdvancedSearchFilter from "./advanced_search_filter";



function Sort(props) {
    let location = useLocation()
    let params = new URLSearchParams(location.search)
    let navigate = useNavigate()

    const [sort_order, setSortOrder] = React.useState('默认');
    const [advParamList, setAdvParamList] = React.useState();
    const [advEndTime, setAdvEndTime] = React.useState();
    const [advStartTime, setAdvStartTime] = React.useState();

    React.useEffect(() => {
        PubSub.subscribe('PubParams', (msg, params) => {
            setAdvParamList(params.get('dataList'))
            setAdvStartTime(params.get('startTime'))
            setAdvEndTime(params.get('endTime'))
        });
    })
    const handleChange = (value) => {
        setSortOrder(value)
        let formData = new FormData
        console.log(advParamList,advStartTime, advEndTime)
        formData.append("advanceSearch", advParamList);
        formData.append("advStartTime", advStartTime);
        formData.append("advEndTime", advEndTime);
        formData.append("sort",sort_order)
        axios.post("https://mock.apifox.cn/m1/1955876-0-default/AdvancedSearchResults",formData)
            .then(res => {
                props.setInfos(res.data.results)
                props.setFilterInfos(res.data.filterItems)
                props.setCurrentPageIndex(1)
            })
    };

    return(
        <Box float={'right'} mr={'15%'} mt={'-50'} >
            <Select
                onChange={handleChange}
                style={{width:120}}
                defaultValue={params.has('order') ? params.get('order') : "默认"}
                options={[
                    {
                        value: '默认',
                        label: '默认'
                    },
                    {
                        value: '最相关',
                        label: '最相关'
                    },
                    {
                        value: '最新',
                        label: '最新'
                    },
                    {
                        value: '引用量最多',
                        label: '引用量最多'
                    },
                ]}
            />
        </Box>
    )
}


function AdvancedSearchResults(props) {

    const [infos,setInfos] = React.useState()
    const [filterInfos,setFilterInfos] = React.useState()
    const [isLoading, setLoading] = React.useState(true)
    const [current_page_index,setCurrentPageIndex] = React.useState(1)
    const navigate = useNavigate()

    // showed cards per page
    let page_show_num = 10
    let page_num
    let page_num_array
    // count from 1
    let card_index_min
    let card_index_max

    let location = useLocation()
    let params = new URLSearchParams(location.search)

    const handleChange = (page,pageSize) => {
        setCurrentPageIndex(page)
    }
    React.useEffect(() => {
        const formData = new FormData()
        PubSub.subscribe('PubParams', (msg, params) => {
            formData.append("advanceSearch", params.get('dataList'));
            formData.append("adv_startTime", params.get('startTime'));
            formData.append("adv_endTime", params.get('endTime'));
        });
        if(params.has('startTime')) {
            formData.append('startTime', params.get('startTime'))
        }
        if(params.has('endTime')) {
            formData.append('endTime', params.get('endTime'))
        }
        if(params.has('order')) {
            formData.append('order',params.get('order'))
        }
        if(params.has('authors')) {
            formData.append('filterAuthors', params.get('authors').split(','))
        }
        if(params.has('publicationTypes')) {
            formData.append('filterPublicationTypes', params.get('publicationTypes').split(','))
        }
        axios.post("https://mock.apifox.cn/m1/1955876-0-default/AdvancedSearchResults",formData)
            .then(res => {
                setInfos(res.data.results)
                setFilterInfos(res.data.filterItems)
                setLoading(false)
            })
    },[])

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
    else {
        page_num = Math.ceil(infos.length / page_show_num)
        page_num_array = Array.apply(null, {length: page_num}).map((item, index) => {
            return index
        })
        delete page_num_array[0]
        // set show_card index range
        // attention: the card index count from 0
        card_index_min = page_show_num * (current_page_index - 1)
        card_index_max = page_show_num * (current_page_index) - 1
    }

    return(
        <Box>
            {/*<Header textColor={'black'} />*/}
            {/*右侧界面*/}
            <AdvancedSearchFilter
            marginLeft='200px'
                setInfos={setInfos}
                setFilterInfos={setFilterInfos}
                setLoading={setLoading}
                setCurrentPageIndex={setCurrentPageIndex}
                filterInfos={filterInfos}
            />
            <Box>
                {/*排序*/}
                <Sort  
                    setInfos={setInfos}
                    setFilterInfos={setFilterInfos}
                    setCurrentPageIndex={setCurrentPageIndex}
                />
                {/*论文卡片*/}
                <Box mt={'120'} ml={'80px'}>
                    {
                        infos.map((value,key) => {
                            if(key >= card_index_min && key <= card_index_max) {
                                return (
                                    <ResultCard props={value} />
                                )
                            }
                            return <></>
                        })
                    }
                </Box>
                {/*分页*/}
                <Box width={'50%'} ml={'40%'} mt={'50px'}>
                    <Pagination onChange={handleChange} total={infos.length} showSizeChanger={false} defaultCurrent={current_page_index}/>
                </Box>
            </Box>
        </Box>
    )
}

export default AdvancedSearchResults;
