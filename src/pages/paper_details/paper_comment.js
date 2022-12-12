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
function Heart(prop){
    const [isClick, setIsClick] = useState(prop.state)
    const handleMouseDown = () => {
        // 点赞/取消点赞
        const formData = new FormData()
        formData.append('CID', prop.CID)
        // console.log(formData)
        if(prop.state === false){
            axios.post("http://localhost:8083/comment/like",formData)
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
                    }
                })
        }
        else{
            axios.post("http://localhost:8083/comment/unlike",formData)
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
    const property = {
        comments:[{author:"lily史密斯",
            like_num:5,
            re_num:0,
            comment:"这篇文章真的很不错1！",
            liked:true,date:"2022/07/13"},{author:"lopopopoy",
            like_num:5,
            re_num:0,
            comment:"这篇文章真的很不错1！",
            liked:false,date:"2022/07/13"}]

    }
    const s = {
        align: 'end',
        float: 'right',
    }
    let initialState = {};
    const [comments,setComs] = React.useState()
    const [isLoading, setLoading] = React.useState(true)
    property.comments.map((value, key1) => {
        initialState[key1] = value.liked;

    })
    let [value, setValue] = React.useState('')
    React.useEffect( () => {
        const formData = new FormData()
        formData.append('PID', prop.pid)
        // console.log(formData)
        axios.post("http://localhost:8083/paper/viewComment",formData)
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

        const formData = new FormData()
        formData.append('PID', prop.pid)

        axios.post("http://localhost:8083/comment/add",formData)
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
                    axios.post("http://localhost:8083/paper/viewComment",formData)
                        .then(function (res){
                            console.log(res.data)
                            setComs(res.data.data)
                            setLoading(false)
                        })
                }
            })
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
                        minH={'120'}
                        width={'90%'}
                        borderWidth={'5'}
                        borderRadius={'12'}
                        borderStyle={'solid'}
                        color={'#E2E8F0'}
                        boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
                    >
                        <HStack mt={5} key={key} justifyContent={'space-between'} >
                            <Box>
                                <HStack>
                                <Link  ml={4} onClick={()=>handleClick(value.UID)} color={'#3311DB'} fontSize={20}>
                                    {value.Uname}</Link>

                                <Text color={'#7551FF'}>
                                    {value.Clikes}点赞
                                </Text>
                                    {/*<Text>*/}
                                    {/*    {property.comments[key].re_num}回复*/}
                                    {/*</Text>*/}
                                <Text color={'#0b1075'}  align={'right'}>
                                        {value.Ctime}
                                </Text>
                                </HStack>
                            </Box>
                            <Box style={s} float={'right'}>
                                <Heart state={value.like} CID={value.CID}/>
                            </Box>

                        </HStack>
                        <Text ml={5} mt={4} mb={5} color={'gray'}>
                            {value.content}
                        </Text>
                    </Box>

                );
            })}
        }


        </VStack>
        <Box ml={9} mt={30} width={'90%'} size='lg'>
            <Textarea placeholder='请发表你的见解' value={value} fontFamily={'宋体'}
                      onChange={handleInputChange}/>
            <Button mt={5} onClick={NewComment} ml={'90.5%'} color={"white"} fontFamily={'宋体'}
                    colorScheme='purple' bgColor={'#7551FF'}>
                发布
            </Button>
        </Box>
        </>
    )
}
export default Comment