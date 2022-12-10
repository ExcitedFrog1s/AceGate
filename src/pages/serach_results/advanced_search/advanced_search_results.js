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
    const cmpMostRecent = (a,b) => {
        if(a.Pdate > b.Pdata) {
            return -1
        }
        else if(a.Pdate < b.Pdata) {
            return 1
        }
        else {
            return 0
        }
    }

    const cmpMostCited = (a,b) => {
        if(Number(a.Pcite) > Number(b.Pcite)) {
            return -1
        }
        else if(Number(a.Pcite) < Number(b.Pcite)) {
            return 1
        }
        else {
            return 0
        }
    }

    const [sort_order, setSortOrder] = React.useState('默认')
    const handleChange = (value) => {
        setSortOrder(value)
        if(value === '默认') {
            const temp = [...props.defaultSort]
            props.setInfos(temp)
        }
        else if(value === '最新') {
            const temp = [...props.infos.sort(cmpMostRecent)]
            props.setInfos(temp)
            // for (let i = 0;i < temp.length;i++) {
            //     console.log(i + ":" + temp[i].Pdate)
            // }
        }
        else if(value === '最多被引') {
            const temp = [...props.infos.sort(cmpMostCited)]
            props.setInfos(temp)
            // for (let i = 0;i < temp.length;i++) {
            //     console.log(i + ":" + props.infos[i].Pcite)
            // }
        }
    };

    return(
        <Box float={'right'} mr={'21%'} mt={'-50'}>
            <Select
                onChange={handleChange}
                style={{width:120}}
                defaultValue={sort_order}
                options={[
                    {
                        value: '默认',
                        label: '默认'
                    },
                    {
                        value: '最新',
                        label: '最新'
                    },
                    {
                        value: '最多被引',
                        label: '最多被引'
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
    const [defaultSort,setDefaultSort] = React.useState()
    const [authorsArray,setAuthorArray] = React.useState()
    const [publicationTypesArray,setPublicationTypesArray] = React.useState()
    const [startTime,setStartTime] = React.useState()
    const [endTime,setEndTime] = React.useState()

    // showed cards per page
    let page_show_num = 10
    let page_num
    let page_num_array
    // count from 1
    let card_index_min
    let card_index_max

    const handleChange = (page,pageSize) => {
        setCurrentPageIndex(page)
    }

    PubSub.unsubscribe('PubParams');
    PubSub.subscribe('PubParams', (msg, params) => {
        let data = {}
        data.advancedSearch = params.dataList === undefined ? [] : params.dataList
        data.advStartTime = params.startTime === undefined ? '' : params.startTime
        data.advEndTime = params.endTime === undefined ? '' : params.endTime
        data.filterAuthors = ''
        data.filterPublicationTypes = ''
        data.startTime = ''
        data.endTime = ''
        console.log(data)
        let config = {
            method: 'post',
            url: 'https://mock.apifox.cn/m1/1955876-0-default/AdvancedSearchResults',
            data : data
        };
        setLoading(true)
        axios(config)
            .then(res => {
                setInfos(res.data.results)
                setDefaultSort([...res.data.results])
                setFilterInfos(res.data.filterItems)
                setCurrentPageIndex(1)
                setLoading(false)
            })
    })

    let location = useLocation()
    let params = new URLSearchParams(location.search)
    React.useEffect(() => {
        if(!params.has('label')) {
            let data = {}
            data.advancedSearch = []
            data.advStartTime = ''
            data.advEndTime = ''
            data.filterAuthors = ''
            data.filterPublicationTypes = ''
            data.startTime = ''
            data.endTime = ''
            console.log(data)
            let config = {
                method: 'post',
                url: 'https://mock.apifox.cn/m1/1955876-0-default/AdvancedSearchResults',
                data: data
            };
            axios(config)
                .then(res => {
                    setInfos(res.data.results)
                    setDefaultSort([...res.data.results])
                    setFilterInfos(res.data.filterItems)
                    setCurrentPageIndex(1)
                    setLoading(false)
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
                setAuthorArray={setAuthorArray}
                setPublicationTypesArray={setPublicationTypesArray}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                filterInfos={filterInfos}
            />
            <Box>
                {/*排序*/}
                <Sort
                    defaultSort={defaultSort}
                    infos={infos}
                    setInfos={setInfos}
                    setLoading={setLoading}
                />
                {/*论文卡片*/}
                <Box mt={'120'} ml={'80px'}>
                    {
                        infos.map((value,key) => {
                            if(key >= card_index_min && key <= card_index_max) {
                                return (
                                    <ResultCard infos={value}/>
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
