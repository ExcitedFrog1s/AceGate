import {Box, Stack, Input, Text, Checkbox} from '@chakra-ui/react';
import {useState} from "react";
import {Button} from "@mui/material";
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
        <Box zIndex={'100'} ml={'10'}>
            <Box float={'right'} mr={'10'}>
                <Button
                    variant={'contained'}
                    endIcon={<AiOutlineFilter/>}
                    onClick={() => {
                        alert('clicked');
                    }}
                />
            </Box>
            <Text>{'发表年份'}</Text>
            <Input
                value={start_time}
                onChange={handleStartTimeChange}
                placeholder='开始时间'
                htmlSize={4}
                width='auto'
                variant='filled'
            />
            <span>{' ~ '}</span>
            <Input
                value={end_time}
                onChange={handleEndTimeChange}
                placeholder='结束时间'
                htmlSize={4}
                width='auto'
                variant='filled'
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
        <Box ml={'20'}>
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
        <Box ml={'20'}>
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
            <Box ml={'10'} mt={'10'}>
                <text style={{fontWeight:'bold',fontSize:'26px'}}>{'筛 选'}</text>
            </Box>
            <TimeRangeFilterWithFilter/>
            <PublicationTypesFilter props={publication_types}/>
            <AuthorsFilter props={authors}/>
        </Box>
    )
}

export default Filter
