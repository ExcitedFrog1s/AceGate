/**
 * @author AboveParadise 2022/11/13
 */
import * as React from 'react';
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import PropTypes from 'prop-types';
import {Box,HStack,Text,Link,VStack,Icon} from "@chakra-ui/react";
import {useEffect, useReducer, useState} from "react";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {useForceUpdate} from "framer-motion";
function Heart({state}){
    const [isClick, setIsClick] = useState(state)
    console.log(state)
    console.log("isclick")
    console.log(isClick)

    const handleMouseDown = () => {
        if(isClick) {
            setIsClick(false)
        }
        else {
            setIsClick(true)
        }
    }

    const Style = {
        onMouseDown: 'handleMouseDown',
        cursor: 'pointer',
        align:'end',
        marginTop: '15px',
        marginRight:20,
        width:'30px',
        height:'30px'}

    return(
        <Box>
            {isClick && <Icon as={FaHeart} color={'red'} onMouseDown={handleMouseDown} style={Style}/>}
            {!isClick && <Icon as={FaRegHeart} onMouseDown={handleMouseDown} style={Style}/>}
        </Box>
    )
    // {initialState[key] && <Icon as={FaHeart} color={'red'} onMouseDown={()=>HandleMouseDown(key)} />}
    // {!initialState[key] && <Icon as={FaRegHeart}  onMouseDown={()=>HandleMouseDown(key)} />}
}
function Comment() {
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
    }
    let initialState = {};
    property.comments.map((value, key1) => {
        initialState[key1] = value.liked;

    })

    return(
        <VStack >{

            property.comments.map((value, key) => {
                return (
                    <Box
                        key={key}
                        height={'120'}
                        width={'90%'}
                        borderWidth={'5'}
                        borderRadius={'12'}
                        borderStyle={'solid'}
                        color={'#E2E8F0'}
                        boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
                    >
                        <HStack mt={5} key={key}>
                        <Link href={'/'} ml={4}  color={'#105dc2'} fontSize={20}>{value.author}</Link>

                        <Text color={'#000000'}>
                            {value.like_num}点赞
                        </Text>
                            {/*<Text>*/}
                            {/*    {property.comments[key].re_num}回复*/}
                            {/*</Text>*/}
                            <Text color={'#000000'}  align={'right'}>
                                {value.date}
                            </Text>
                            <Box style={s}>
                                <Heart state={value.liked}/>
                            </Box>

                        </HStack>
                        <Text ml={5}>
                            {value.comment}
                        </Text>
                    </Box>

                );
            })}
        }
        </VStack>

    )
}
export default Comment