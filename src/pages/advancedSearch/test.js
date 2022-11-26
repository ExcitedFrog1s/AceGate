import * as React from 'react'
import { Box } from '@chakra-ui/react'
import {FormControl, FormLabel, FormErrorMessage, Input, FormHelperText,} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import {Button, ButtonGroup} from '@chakra-ui/react'
import { Search2Icon, RepeatIcon} from '@chakra-ui/icons'
import 'antd/dist/antd.min.css';
import './advancedSearch.css';
import { DatePicker} from 'antd';
const { RangePicker } = DatePicker;

function Search({}) {
    return(
        <Box boxShadow='2xl' rounded='md'
            borderRadius='20px' border='1px' borderColor='gray.200'
            className='site-card-border-less-wrapper'>
            <FormControl className='item'>
                <FormLabel >包含全部检索词</FormLabel>
                <Input placeholder='多个检索词用逗号分开'/>
            </FormControl>
            <FormControl className='item'>
                <FormLabel >包含精确检索词</FormLabel>
                <Input placeholder='多个检索词用逗号分开'/>
            </FormControl>
            <FormControl className='item'>
                <FormLabel >包含至少一个检索词</FormLabel>
                <Input placeholder='多个检索词用逗号分开'/>
            </FormControl>
            <FormControl className='item'>
                <FormLabel >不包含检索词</FormLabel>
                <Input placeholder='多个检索词用逗号分开'/>
            </FormControl>
            <FormControl className='item'>
                <FormLabel>出现检索词的位置</FormLabel>
                <Select>
                    <option>不限</option>
                    <option>文章任何位置</option>
                    <option>标题</option>
                </Select>
            </FormControl>
            <FormControl className='item'>
                <FormLabel>作者</FormLabel>
                <Input placeholder='请输入作者名称'/>
            </FormControl>
            <FormControl className='item'>
                <FormLabel>机构</FormLabel>
                <Input placeholder='请输入机构名称'/>
            </FormControl>
            <FormControl className='item'>
                <FormLabel>出版物</FormLabel>
                <Input placeholder='请输入期刊或会议名称'/>
            </FormControl>
            <FormControl className='item'>
                <FormLabel>请选择出版时间</FormLabel>
                <RangePicker picker="month" className='datePicker'/>
            </FormControl>
            <ButtonGroup spacing={12} style={{marginTop: '30px', marginLeft: '200px'}} >
                <Button colorScheme='blue' leftIcon={<Search2Icon />}>
                    搜索
                </Button>
                <Button variant='outline' colorScheme='blue' leftIcon={<RepeatIcon />}>
                    重置
                </Button>
            </ButtonGroup>
        </Box>
    )
}


export default Search;