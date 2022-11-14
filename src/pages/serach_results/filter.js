//
// Created by zyc on 2022/11/12.
//

import {Box, Stack, Input, Text, Checkbox, Button} from '@chakra-ui/react';
import {useState} from "react";
import {AiOutlineFilter} from "react-icons/ai";

function TimeRangeFilterWithFilter() {
    const [start_time,setStartTime] = useState('1900')
    const [end_time,setEndTime] = useState('2022')

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value)
    }

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value)
    }

    return(
        <Box ml={'20px'} mt={'30px'}>
            <Box>
                <Button
                    ml={'55%'}
                    rightIcon={<AiOutlineFilter/>}
                    colorScheme='blue'
                    variant='outline'
                    onClick={() => {
                        alert('clicked');
                    }}
                >
                    {'筛选'}
                </Button>
            </Box>
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

function PublicationTypesFilter({props}) {
    let len = props.length

    const [checkedItems, setCheckedItems] = useState(new Array(len - 1).fill(true))

    let allChecked = checkedItems.every(Boolean)
    let isIndeterminate = checkedItems.some(Boolean) && !allChecked

    let type_array = props.slice(1)

    return(
        <Box ml={'20px'} mt={'30px'}>
            <Text>{'出版类型'}</Text>
            <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => setCheckedItems(new Array(len).fill(e.target.checked))}
            >
                {'全部 (' + props[0].number + ')'}
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                {
                    type_array.map((value, key) => {
                        return (
                            <Checkbox
                                isChecked={checkedItems[key]}
                                onChange={(e) => {
                                    setCheckedItems(checkedItems.slice(0,key).concat([e.target.checked]).concat(checkedItems.slice(key + 1)))
                                    allChecked = checkedItems.every(true)
                                    isIndeterminate = checkedItems.some(true) && !allChecked
                                }}
                            >
                                {value.type + ' ('+ props[key].number + ')'}
                            </Checkbox>
                        )
                    })
                }
            </Stack>
        </Box>
    )
}

function AuthorsFilter({props}) {
    let len = props.length

    const [checkedItems, setCheckedItems] = useState(new Array(len-1).fill(true))

    let allChecked = checkedItems.every(Boolean)
    let isIndeterminate = checkedItems.some(Boolean) && !allChecked

    let type_array = props.slice(1)
    console.log(type_array)

    return(
        <Box ml={'20px'} mt={'30px'}>
            <Text>{'作者'}</Text>
            <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => setCheckedItems(new Array(len).fill(e.target.checked))}
            >
                {'全部 (' + props[0].number + ')'}
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                {
                    type_array.map((value, key) => {
                        return (
                            <Checkbox
                                isChecked={checkedItems[key]}
                                onChange={(e) => {
                                    setCheckedItems(checkedItems.slice(0,key).concat([e.target.checked]).concat(checkedItems.slice(key + 1)))
                                    allChecked = checkedItems.every(true)
                                    isIndeterminate = checkedItems.some(true) && !allChecked
                                }}
                            >
                                {value.name + ' ('+ props[key].number + ')'}
                            </Checkbox>
                        )
                    })
                }
            </Stack>
        </Box>
    )
}

function Filter() {
    let publication_types = [
        {
            'type':'全部',
            'number':1111
        },
        {
            'type':'Journal',
            'number':543
        },
        {
            'type':'Conference',
            'number':262
        },
        {
            'type':'Book',
            'number':252
        },
        {
            'type':'Other',
            'number':54
        }
    ]

    let authors = [
        {
            'name':'全部',
            'number':1111
        },
        {
            'name':'maple',
            'number':23
        },
        {
            'name':'AboveParadise',
            'number':16
        },
        {
            'name':'Chants',
            'number':3
        }
    ]

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
            <TimeRangeFilterWithFilter/>
            <PublicationTypesFilter props={publication_types}/>
            <AuthorsFilter props={authors}/>
        </Box>
    )
}

export default Filter
