//
// Created by zyc on 2022/12/09.
//

import {Box, Stack, Input, Text, Checkbox, Button} from '@chakra-ui/react';
import {useState} from "react";
import {AiOutlineFilter} from "react-icons/ai";
import * as React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {wait} from "@testing-library/user-event/dist/utils";

function DefaultSearchTimeRangeFilter(props) {
    const [start_time,setStartTime] = useState('1900')
    const [end_time,setEndTime] = useState('2022')

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value)
        props.setStartTime(e.target.value)
    }

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value)
        props.setEndTime(e.target.value)
    }

    return(
        <Box ml={'20px'} mt={'30px'}>
            <Text mb={'10px'}>{'发表年份'}</Text>
            <Input
                value={start_time}
                onChange={handleStartTimeChange}
                placeholder='开始时间'
                htmlSize={4}
                width='auto'
                variant='filled'
                size='sm'
            />
            <span>{' ~ '}</span>
            <Input
                value={end_time}
                onChange={handleEndTimeChange}
                placeholder='结束时间'
                htmlSize={4}
                width='auto'
                variant='filled'
                size='sm'
            />
        </Box>
    )
}

function DefaultSearchPublicationTypesFilter(props) {
    let len = props.content.length

    const [checkedItems, setCheckedItems] = useState(new Array(len).fill(true))

    let allChecked = checkedItems.every(Boolean)
    let isIndeterminate = checkedItems.some(Boolean) && !allChecked


    return(
        <Box ml={'20px'} mt={'30px'}>
            <Text>{'出版类型'}</Text>
            <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => {
                    let array = new Array(len).fill(e.target.checked)
                    setCheckedItems(array)
                    props.setPublicationTypes(array)
                }}
            >
                {'全部 (' + props.totalNumber + ')'}
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                {
                    props.content.map((value, key) => {
                        return (
                            <Checkbox
                                isChecked={checkedItems[key]}
                                onChange={(e) => {
                                    let array = checkedItems.slice(0,key).concat([e.target.checked]).concat(checkedItems.slice(key + 1))
                                    setCheckedItems(array)
                                    allChecked = checkedItems.every((e) => {return e})
                                    isIndeterminate = checkedItems.some((e) => {return e}) && !allChecked
                                    props.setPublicationTypes(array)
                                }}
                            >
                                {value.publicationType + ' ('+ value.number + ')'}
                            </Checkbox>
                        )
                    })
                }
            </Stack>
        </Box>
    )
}

function DefaultSearchAuthorsFilter(props) {
    let len = props.content.length

    const [checkedItems, setCheckedItems] = useState(new Array(len).fill(true))

    let allChecked = checkedItems.every(Boolean)
    let isIndeterminate = checkedItems.some(Boolean) && !allChecked


    return(
        <Box ml={'20px'} mt={'30px'}>
            <Text>{'作者'}</Text>
            <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => {
                    let array = new Array(len).fill(e.target.checked)
                    setCheckedItems(array)
                    props.setAuthors(array)
                }}
            >
                {'全部 (' + props.totalNumber + ')'}
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                {
                    props.content.map((value, key) => {
                        return (
                            <Checkbox
                                isChecked={checkedItems[key]}
                                onChange={(e) => {
                                    let array = checkedItems.slice(0,key).concat([e.target.checked]).concat(checkedItems.slice(key + 1))
                                    setCheckedItems(array)
                                    allChecked = checkedItems.every((e) => {return e})
                                    isIndeterminate = checkedItems.some((e) => {return e}) && !allChecked
                                    props.setAuthors(array)
                                }}
                            >
                                {value.author + ' ('+ value.number + ')'}
                            </Checkbox>
                        )
                    })
                }
            </Stack>
        </Box>
    )
}

function DefaultSearchFilter(props) {
    const [publicationTypes,setPublicationTypes] = useState(new Array(props.filterInfos.publicationTypes.length).fill(true))
    const [authors,setAuthors] = useState(new Array(props.filterInfos.authors.length).fill(true))
    const [startTime,setStartTime] = useState("1900")
    const [endTime,setEndTime] = useState("2022")

    let location = useLocation()
    let params = new URLSearchParams(location.search)

    const filter = () => {
        let authorsArray = []
        let publicationTypesArray = []
        for(let i = 0;i < authors.length;i++) {
            if(authors[i]) {
                authorsArray.push(props.filterInfos.authors[i].UID)
            }
        }
        for(let i = 0;i < publicationTypes.length;i++) {
            if(publicationTypes[i]) {
                publicationTypesArray.push(props.filterInfos.publicationTypes[i].publicationType)
            }
        }
        props.setStartTime(startTime)
        props.setEndTime(endTime)
        props.setAuthorArray(authorsArray)
        props.setPublicationTypesArray(publicationTypesArray)
        let data = {}
        if(props.authorsArray !== undefined) {
            data.filterAuthors = props.authorsArray
        }
        if(props.publicationTypesArray !== undefined) {
            data.filterPublicationTypes = props.publicationTypesArray
        }
        if(props.startTime !== undefined) {
            data.startTime = props.startTime
        }
        if(props.endTime !== undefined) {
            data.endTime = props.endTime
        }
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
            />
            <DefaultSearchAuthorsFilter
                content={props.filterInfos.authors}
                totalNumber={props.filterInfos.totalNumber}
                setAuthors={setAuthors}
            />
        </Box>
    )
}

export default DefaultSearchFilter
