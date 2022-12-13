/**
 * @author AboveParadise 2022/11/13
 */
import * as React from 'react';
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import PropTypes from 'prop-types';
import {
    Box,
    HStack,
    Text,
    Link,
    VStack,
    Icon,
    Input,
    Button,
    Textarea,
    Spinner,
    Alert,
    AlertIcon
} from "@chakra-ui/react";
import {useEffect, useReducer, useState} from "react";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import axios from "axios";
import { Row } from 'antd';

function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
function Heart(prop){
    const [isClick, setIsClick] = useState(prop.state)
    const handleMouseDown = () => {
        // 点赞/取消点赞
        const formData = new FormData()
        formData.append('CID', prop.CID)
        // console.log(formData)
        let UID = window.localStorage.getItem('userToken')
        if(prop.state === false){
            axios.post("/comment/like",formData,{
                headers:{
                    'token':UID
                }
            })
                .then(function (res){
                    if(res.status !== 200){
                        return (
                            <Alert status='error'>
                                <AlertIcon />
                                操作失败！
                            </Alert>)
                    }
                    else{
                        if(isClick) {
                            setIsClick(false)
                        }
                        else {
                            setIsClick(true)
                        }
                        formData.append('PID', prop.pid)
                        // console.log(formData)

                        axios.post("/paper/viewComment",formData,{
                            headers:{
                                'token':UID
                            }
                        })
                            .then(function (res){
                                console.log(res.data)
                                prop.setcom(res.data.data)
                                // setLoading(false)
                            })
                    }
                })
        }
        else{
            axios.post("/comment/unlike",formData,{
                headers:{
                    'token':UID
                }
            })
                .then(function (res){
                    if(res.status !== 200){
                        return (
                            <Alert status='error'>
                                <AlertIcon />
                                操作失败！
                            </Alert>)
                    }
                    else{
                        if(isClick) {
                            setIsClick(false)
                        }
                        else {
                            setIsClick(true)
                        }
                        formData.append('PID', prop.pid)
                        // console.log(formData)

                        axios.post("/paper/viewComment",formData,{
                            headers:{
                                'token':UID
                            }
                        })
                            .then(function (res){
                                console.log(res.data)
                                prop.setcom(res.data.data)
                                // setLoading(false)
                            })
                    }
                })
        }


    }

    const Style = {
        onMouseDown: 'handleMouseDown',
        cursor: 'pointer',
        // align:'end',
        // marginTop: '15px',
        marginRight:23,
        // float:'right',
        width:'25px',
        height:'25px'}

    return(
        <Box>
            {isClick && <Icon as={FaHeart} color={'red'} onMouseDown={handleMouseDown} style={Style}/>}
            {!isClick && <Icon as={FaRegHeart} onMouseDown={handleMouseDown} style={Style}/>}
        </Box>
    )
}
function Comment(prop) {

    const s = {
        align: 'end',
        float: 'right',
    }
    const [comments,setComs] = React.useState()
    const [isLoading, setLoading] = React.useState(true)
    const [vis, setVis] = useState(false)

    let [value, setValue] = React.useState('')
    React.useEffect( () => {
        const formData = new FormData()
        formData.append('PID', prop.pid)
        // console.log(formData)
        let UID = window.localStorage.getItem('userToken')
        axios.post("/paper/viewComment",formData,{
            headers:{
                'token':UID
            }
        })
            .then(function (res){
                console.log(res.data)
                setComs(res.data.data)
                setLoading(false)
            })
    },[])

    if(isLoading) {
        return (
            <></>
        )
    }
    let handleInputChange = (e) => {
        let inputValue = e.target.value
        setValue(inputValue)
    }
    // 新增评论
    const NewComment = () => {

        console.log(value)
        if(value.length === 0){
            setVis(true)
            // 设置延时消失
            const test = window.setTimeout(() => {
                setVis(false);
            }, 1500);
            return () => {
                clearInterval(test);
            };
        }
        else{
            const formData = new FormData()
            formData.append('PID', prop.pid)
            formData.append('Ccontent', value)

            let UID = window.localStorage.getItem('userToken')
            axios.post("/comment/add",formData,{
                headers:{
                    'token':UID
                }
            })
                .then(function (res){
                    if(res.status !== 200){
                        return (
                            <Alert status='error'>
                                <AlertIcon />
                                评论失败！
                            </Alert>)
                    }
                    else{
                        formData.append('UID', window.localStorage.getItem('userToken'))
                        // console.log(formData)
                        axios.post("/paper/viewComment",formData)
                            .then(function (res){
                                console.log(res.data)
                                setComs(res.data.data)
                                setLoading(false)
                            })
                        setValue('')
                    }
                })
        }

    }
    const handleClick = (UID) => {
        window.open('/scholarPortal?UID=' + UID)
    }
    return(
        <>
        <VStack >{

            comments.map((value, key) => {
                return (
                    <Box
                        key={key}
                        width={'100%'}
                        borderWidth={'5'}
                        borderRadius={'20'}
                        borderStyle={'solid'}
                        color={'#E2E8F0'}
                        boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
                    >
                        <HStack mt={5} key={key} justifyContent={'space-between'} >
                            <Box>
                                <HStack>
                                <Text  ml={4} mr={4} style={{textDecoration:'none'}} color={'frog.500'} fontSize={22} fontWeight="extrabold">
                                    {value.name}</Text>

                                    {/*<Text>*/}
                                    {/*    {property.comments[key].re_num}回复*/}
                                    {/*</Text>*/}
                                <Text color={'#0b1075'}  align={'right'}>
                                        {value.time}
                                </Text>
                                </HStack>
                            </Box>
                            <Box style={s} float={'right'}>
                                <Row>
                                <Text color={'#4A5568'} mr={3} fontWeight='bold'>
                                    {separator(value.likes)}
                                </Text>
                                <Heart state={value.like} CID={value.cid} setcom={setComs} pid={prop.pid}/>
                                </Row>
                            </Box>

                        </HStack>
                        <Text ml={5} mt={4} mb={5} color={'gray'}>
                            {value.content}
                        </Text>
                    </Box>

                );
            })}
        </VStack>
            <Alert status='error' visibility={vis?"visible":"hidden"} mb={2} mt={2} width={'90%'} ml={9}>
                <AlertIcon />
                请填写评论内容</Alert>
        <Box  width={'100%'} size='lg'>
            <Textarea placeholder='请发表你的见解' value={value} 
                      onChange={handleInputChange}/>
            <Button  onClick={NewComment} ml={'90.5%'} color={"white"}
                    colorScheme='frog' mt={5}>
                发布
            </Button>
        </Box>
        </>
    )
}
export default Comment