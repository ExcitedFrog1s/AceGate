import * as React from 'react'
import { Box } from '@chakra-ui/react'
import {Input} from '@chakra-ui/react'
import { Select, Text } from '@chakra-ui/react'
import { Col, Row } from 'antd';
import { IconButton } from '@chakra-ui/react'
import {Button, ButtonGroup} from '@chakra-ui/react'
import { Search2Icon, RepeatIcon, AddIcon, MinusIcon} from '@chakra-ui/icons'
import './advancedSearch.css';
import { DatePicker} from 'antd';

//antd组件汉化
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


const { RangePicker } = DatePicker;

function Search({}) {
    const [dataList, setDataList] = React.useState([
    {
        category: 'main',
        content: "",
        type: 1,
    },
    {
        category: 'author',
        content: "",
        type: 1,
    },
    {
        category: 'source',
        content: "",
        type: 1,
    }]);
        
    const addItem = (index) => {
        dataList.splice(index+1, 0, {
            category: '',
            content: '',
            type: '',
        });
        setDataList([...dataList]);
    };

    const deleteItem = (index) => {
        dataList.splice(index,1);
        setDataList([...dataList]);
    };

    const clean = () => {
        dataList.splice(0, dataList.length);
        dataList.push({
            category: 'main',
            content: "",
            type: 1,
        });
        dataList.push({
            category: 'author',
            content: "",
            type: 1,
        });
        dataList.push({
            category: 'source',
            content: "",
            type: 1,
        });
        setDataList([...dataList]);
    };

    return(
        <Box boxShadow='2xl' rounded='md'
            borderRadius='20px' border='1px' borderColor='gray.200'
            className='site-card-border-less-wrapper'>
            {dataList.map((item, index) => (
                <Row style={{marginTop:'20px'}} key={index}>
                    <Col span={2}>
                        {
                            index != 0?(
                                <Select value={item.type} 
                                    onChange={(e) => {
                                        dataList[index].type = e.target.value;
                                        setDataList([...dataList]);
                                    }}>
                                    <option value='1'>AND</option>
                                    <option value='2'>OR</option>
                                    <option value='3'>NOT</option>
                                </Select>
                            ):(
                                <div></div>
                            )
                        }
                    </Col>
                    <Col span={3}>
                        <Select style={{marginLeft: '5px'}} value={item.category}
                            onChange={(e) => {
                                dataList[index].category = e.target.value;
                                setDataList([...dataList]);
                            }}>
                            <option value='main'>篇关摘</option>
                            <option value='article'>全文</option>
                            <option value='title'>篇名</option>
                            <option value='abstract'>摘要</option>
                            <option value='author'>作者</option>
                            <option value='institute'>作者机构</option>
                            <option value='field'>领域</option>
                            <option value='source'>论文来源</option>
                            <option value='DOI'>DOI</option>
                        </Select>
                    </Col>
                    <Col span={14} offset={1}>
                        <Input 
                            value={item.content}
                            onChange={(e) => {
                                dataList[index].content = e.target.value;
                                setDataList([...dataList]);}}>
                        </Input>
                    </Col>
                    <Col span={3} offset={1}>
                    <IconButton
                        colorScheme='blue'
                        aria-label='Call Segun'
                        size='sm'
                        icon={<AddIcon />}
                        onClick={() => {
                            addItem(index);
                        }}/>
                        {
                            index != 0?(
                                <IconButton
                                style={{marginLeft: '5px'}}
                                variant='outline'
                                colorScheme='blue'
                                aria-label='Call Segun'
                                size='sm'
                                icon={<MinusIcon />}
                                onClick={() => {
                                    deleteItem(index);
                                }} 
                                />
                            ):(
                                <div></div>
                            )
                        }    
                    
                    </Col>
                </Row>
            ))}
            <Row style={{marginTop:'30px'}}>
                <Col span={4} offset={2}>
                    <Text fontSize='lg' fontWeight='550' style={{marginLeft:'20px'}}>请选择出版时间</Text>
                </Col>
                <Col span={18}>
                    <RangePicker locale={locale} picker="month" className='datePicker'/>
                </Col>
            </Row>
            <ButtonGroup spacing={20} style={{marginTop: '60px', marginLeft: '400px'}} >
                <Button colorScheme='blue' leftIcon={<Search2Icon />}>
                    搜索
                </Button>
                <Button variant='outline' colorScheme='blue' leftIcon={<RepeatIcon />}
                    onClick={() => {
                        clean();
                    }}>
                    重置
                </Button>
            </ButtonGroup>
        </Box>
    )
}


export default Search;