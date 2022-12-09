//
// Created by zyc on 2022/12/09.
//

import Header from '../../../components/header/header'
import * as React from 'react';
import {Box, Input} from "@chakra-ui/react";
import ResultCard from "../result_card";
import DefaultFilter from "../default_search/default_search_filter";
import {Pagination, Select, Spin} from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";



function Sort(props) {
    let location = useLocation()
    let params = new URLSearchParams(location.search)
    let navigate = useNavigate()

    const [sort_order, setSortOrder] = React.useState('默认');
    const handleChange = (value) => {
        setSortOrder(value)
        let formData = new FormData
        formData.append("normalSearch",params.get("q"))
        formData.append("sort",sort_order)
        axios.post("https://mock.apifox.cn/m1/1955876-0-default/DefaultSearchResults",formData)
            .then(res => {
                props.setInfos(res.data.results)
                props.setFilterInfos(res.data.filterItems)
                props.setCurrentPageIndex(1)
            })
    };

    return(
        <Box float={'right'} mr={'20%'} mt={'-50'}>
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


function DefaultSearchResults(props) {
    const [infos,setInfos] = React.useState()
    const [filterInfos,setFilterInfos] = React.useState()
    const [isLoading, setLoading] = React.useState(true)
    const [current_page_index,setCurrentPageIndex] = React.useState(1)
    const navigate = useNavigate()

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
    }
    React.useEffect(() => {
        const formData = new FormData()
        if(params.has('q')) {
            formData.append('normalSearch', params.get('q'))
        }
        axios.post("https://mock.apifox.cn/m1/1955876-0-default/DefaultSearchResults",formData)
            .then(res => {
                setInfos(res.data.results)
                setFilterInfos(res.data.filterItems)
                setLoading(false)
            })
    },[])

    if(isLoading) {
        return (
            <Spin tip={"加载中"}/>
        )
    }
    else {
        page_num = Math.ceil(infos.length / paper_show_num_per_page)
        page_num_array = Array.apply(null, {length: page_num}).map((item, index) => {
            return index
        })
        delete page_num_array[0]
        // set show_card index range
        // attention: the card index count from 0
        card_index_min = paper_show_num_per_page * (current_page_index - 1)
        card_index_max = paper_show_num_per_page * (current_page_index) - 1
    }

    return(
        <Box>
            {/*<Header textColor={'black'} />*/}
            {/*右侧界面*/}
            <DefaultFilter
                setInfos={setInfos}
                setFilterInfos={setFilterInfos}
                setLoading={setLoading}
                setCurrentPageIndex={setCurrentPageIndex}
                filterInfos={filterInfos}
            />
            <Box>
                <Input
                    size='lg'
                    backgroundColor='white'
                    placeholder="输入您想搜索的论文，学者等，敲下回车"
                    maxWidth={'35%'}
                    ml={'30%'}
                    mt={'-80px'}
                    position={'absolute'}
                />
                {/*排序*/}
                <Sort
                    setInfos={setInfos}
                    setFilterInfos={setFilterInfos}
                    setCurrentPageIndex={setCurrentPageIndex}
                />
                {/*论文卡片*/}
                <Box mt={'200'}>
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
                    <Pagination
                        onChange={handleChange}
                        total={infos.length}
                        showSizeChanger={false}
                        defaultCurrent={current_page_index}/>
                </Box>
            </Box>
        </Box>
    )
}

export default DefaultSearchResults;
