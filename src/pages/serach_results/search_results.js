//
// Created by zyc on 2022/11/11.
//

import * as React from 'react';

import {Box} from "@chakra-ui/react";
import ResultCard from "./result_card";
import Filter from "./filter";
import {MdArrowDropDown} from "react-icons/md";
import {Pagination, Select, Spin} from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";




function Sort() {
    let location = useLocation()
    let params = new URLSearchParams(location.search)
    let navigate = useNavigate()

    const [sort_order, setSortOrder] = React.useState('默认');
    const handleChange = (value) => {
        if(params.has('page')) {
            params.delete('page')
        }
        setSortOrder(value)
        params.set('sort',value)
        navigate('/searchResults?' + params.toString())
    };

    return(
        <Box float={'right'} mr={'20%'} mt={'-50'}>
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


function SearchResults(props) {
    const [infos,setInfos] = React.useState()

    const [filterInfos,setFilterInfos] = React.useState()

    const [isLoading, setLoading] = React.useState(true)
    const navigate = useNavigate()

    // showed cards per page
    let page_show_num = 10
    let page_num
    let page_num_array
    // count from 1
    let current_page_index
    let card_index_min
    let card_index_max

    let location = useLocation()
    let params = new URLSearchParams(location.search)
    if(params.has('page')) {
        current_page_index = params.get('page')
    }
    else {
        current_page_index = 1
    }
    const handleChange = (page,pageSize) => {
        params.set('page',page)
        navigate('/searchResults?' + params.toString())
    }

    React.useEffect(() => {
        const formData = new FormData()
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
        axios.post("https://mock.apifox.cn/m1/1955876-0-default/SearchResults",formData)
            .then(res => {
                setInfos(res.data.results)
                setFilterInfos(res.data.filterItems)

                setLoading(false)
            })
    },[])
    console.log(infos)
    if(isLoading) {
        return (
            <Spin tip={"加载中"}/>
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
            {/*右侧界面*/}
            <Filter filterInfos={filterInfos}/>
            <Box>
                {/*排序*/}
                <Sort/>
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
                    <Pagination onChange={handleChange} total={infos.length} showSizeChanger={false} defaultCurrent={current_page_index}/>
                </Box>
            </Box>
        </Box>
    )
}

export default SearchResults;