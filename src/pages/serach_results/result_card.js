//
// Created by zyc on 2022/11/11.
//

import {Box, Link, Text,Tag} from '@chakra-ui/react'
import {useState} from "react"
import {AiFillStar,AiOutlineStar} from "react-icons/ai"
import * as React from 'react';
import PubSub from "pubsub-js";
import {useNavigate} from "react-router-dom";

function Title(props) {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const handleClick = () => {
        window.open('/paperDetails?PID=' + props.PID)
    }

    const linkStyle = {
        color: '#161616',
        fontSize: '30px',
        textDecoration: isHover ? 'underline' : 'none'
    }


    return (
        <Box ml={'4'} mt={'20px'}>
            <Link style={linkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleClick}
            >
                <Text noOfLines={1} pt={'30px'} pl={'30px'}>
                    {props.title}
                </Text>
            </Link>
        </Box>
    )

}

function Author1(props) {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const linkStyle = {
        color: '#83a7cf',
        fontSize: '14px',
        textDecoration: isHover ? 'underline' : 'none',
        marginRight: '10px'
    }

    const handleClick = () => {
        window.open('/scholarPortal?RID=' + props.info.rid)
    }

    return(
        <Link key={props.key}
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
        >
            {props.info.rname}
        </Link>
    )
}

function Author2(props) {
    const linkStyle = {
        color: '#777',
        fontSize: '14px',
        marginRight: '10px',
        textDecoration: 'none',
        cursor: 'default'
    }

    return(
        <Link style={linkStyle}>
            {props.info}
        </Link>
    )
}

function Authors(props) {
    let cur_num = props.authors1.length
    const find_author = (value) => {
        if(cur_num >= 10) {
            return true
        }
        for(let i = 0;i < props.authors1.length;i++) {
            if(value === props.authors1[i].rname){
                return true
            }
        }
        cur_num++
        return false
    }
    return(
        <Box ml={'10'} mt={'15px'}>
        {
            props.authors1.map((value, key) => {
                return (
                    <Author1 info={value} key={key}/>
                );
            })
        }
        {
            props.authors2.map((value,key) => {
                if(!find_author(value)) {
                    return (
                        <Author2 info={value} key={key}/>
                    )
                }
            })
        }
        </Box>
    )

}

function TimeOrgan(props) {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const handleClick = () => {
        window.open("/institute?IID=" + props.organ[0].r_IID)
    }

    const linkStyle = {
        color: '#a0a0a0',
        fontSize: '12px',
        textDecoration: isHover ? 'underline' : 'none',
    }
    return(
        <Box ml={'10'} mt={'10px'} float={'left'}>
            <p style={{marginTop:'-10px'}}/>
            <i style={{fontSize:'12px',color:'#a0a0a0'}} >
                {/*time stamp to year*/}
                {new Date(props.time).getFullYear() + ' 年 ' +
                    new Date(props.time).getMonth() + ' 月'}
            </i>
            {
                props.organ.length !== 0 &&
                <Link style={linkStyle}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      ml={'30px'}
                      onClick={handleClick}
                >
                    {props.organ[0].rinstitute}
                </Link>
            }
        </Box>
    )
}

function Content(props) {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const handleClick = () => {
        window.open('/paperDetails?PID=' + props.PID)
    }

    const linkStyle = {
        color: '#a0a0a0',
        fontSize: '16px',
        cursor: 'pointer',
        textDecoration: isHover ? 'underline' : 'none'
    }
    return(
        <Box ml={'10'} mt={'30px'}>
            <Link
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <Text noOfLines={3} wordBreak={'break-all'} marginRight={'50px'}>
                    {props.content}
                </Text>
            </Link>
        </Box>
    )
}

function Label(props) {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const handleClick = () => {
        window.open('/advancedSearch?label=' + props.label)
    }

    const labelBoxStyle = {
        borderRadius: '10px',
        backgroundColor: isHover ? 'rgba(131,167,207,0.9)' : 'rgba(131,167,207,0.5)',
        float: 'left',
        marginLeft: '8px',
        minHeight: '30px',
    }

    return(
        <Link fontSize={'17px'} textDecoration={'none'} textColor={'blue'}>
            <Tag
                style={labelBoxStyle}
                key={props.key}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {props.label}
            </Tag>
        </Link>
    )
}

function Labels(props) {
    return(
        <Box ml={'10'} mb={'5%'} mt={'20px'}>
            <Text mt={'0'} color={'#000000'} float={'left'} fontWeight={'bold'} mt={'5px'}>{'标签'}</Text>
            {
                props.labels.map((value, key) => {
                    return (
                        <Label label={value} key={key}/>
                    )
                })
            }
        </Box>
    )
}

function Star({props}) {
    const [isClick, setIsClick] = useState(props)

    const handleMouseDown = () => {
        if(isClick) {
            setIsClick(false)
        }
        else {
            setIsClick(true)
        }
    }

    const starStyle = {
        onMouseDown: 'handleMouseDown',
        cursor: 'pointer',
        color: '#3662ec',
        marginTop: '15px',
        width:'30px',
        height:'30px'
    }

    return(
        <Box>
            {isClick && <AiFillStar onMouseDown={handleMouseDown} style={starStyle}/>}
            {!isClick && <AiOutlineStar onMouseDown={handleMouseDown} style={starStyle}/>}
        </Box>
    )
}

function Operations({props}) {
    const operationsBoxStyle = {
        borderTop: '1px solid #ddd',
        marginTop: '60px',
        marginLeft: '50px',
        marginRight: '50px'
    }
    return(
        <Box style={operationsBoxStyle}>
            <Star props={props}/>
        </Box>
    )
}

function ResultCard(props) {
    return(
        <Box
            minHeight={'330'}
            width={'50%'}
            borderWidth={'5'}
            borderRadius={'12'}
            borderStyle={'solid'}
            ml={'30%'}
            mr={'20%'}
            mb={'0px'}
            color={'#E2E8F0'}
            boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
        >
            <Title title={props.infos.pname} PID={props.infos.pID}/>
            <Authors authors1={props.infos.PAuthor} authors2={props.infos.pauthorname}/>
            <TimeOrgan time={props.infos.pdate} organ={props.infos.PAuthor}/>
            <Content content={props.infos.pabstract} PID={props.infos.pID}/>
            <Labels labels={props.infos.psystemTags}/>
            {/*<Operations props={props.infos.isStar}/>*/}
        </Box>
    )
}


export default ResultCard;
