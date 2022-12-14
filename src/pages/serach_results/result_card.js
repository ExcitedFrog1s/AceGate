//
// Created by zyc on 2022/11/11.
//

import {Box, Link, Text, Tag} from '@chakra-ui/react'
import {useState} from "react"
import { Row, Col } from 'antd';
import {AiFillStar,AiOutlineStar} from "react-icons/ai"
import * as React from 'react';
import moment from "moment";
function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
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
        <Box >
            <Link style={linkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleClick}
            >
                <Text noOfLines={1} fontWeight={'bold'}>
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
        color: 'frog.400',
        marginRight: '10px',
        fontSize: '15px',
        textDecoration: isHover ? 'underline' : 'none',
        fontWeight: 'bold',
        wordBreak:'break-word'
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
        color: '#4A5568',
        fontSize: '15px',
        marginRight: '10px',
        textDecoration: 'none',
        cursor: 'default',
        fontWeight: 'bold',
        wordBreak:'break-word'
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
        <Box mt={'3px'}>
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
        color: 'frog.500',
        fontSize: '12px',
        textDecoration: isHover ? 'underline' : 'none',
    }
    return(
        <Box mt={1}>
            <Text as='em' fontSize={'12px'} color={'#4A5568'}>
                {/*time stamp to year*/}
                {moment(props.time).format("YYYY-MM")}
            </Text>
            <Text color={'#4A5568'} ml={10} as='em' fontSize={'12px'}>{"被引：" + separator(props.pcite)}</Text>
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
        fontSize: '14px',
        cursor: 'pointer',
        textDecoration: isHover ? 'underline' : 'none'
    }
    return(
        <Box mt={1}>
            <Link
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <Text noOfLines={3} wordBreak={'break-word'} marginRight={'50px'} fontWeight={500}>
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
        borderRadius: '8px',
        backgroundColor: isHover ? 'rgba(131,167,207,0.9)' : 'rgba(131,167,207,0.5)',
        marginLeft: '8px',
        minHeight: '25px',
        marginBottom: '5px'
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
        <Box mt={'10px'}>
            <Row>
            <Col span={1}><Text mt={'0'} color={'#000000'} float={'left'} fontWeight={'bold'}>{'领域'}</Text></Col>
            <Col span={23}>
            {
                props.labels.map((value, key) => {
                    if(!(value[0] === 'C' && isNaN(Number(value[1],10)) === false
                        && isNaN(Number(value[2],10)) === false)) {
                        return (
                            <Label label={value} key={key}/>
                        )
                    }
                })
            }</Col>
            </Row>
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
    console.log(props.infos.pcite)
    return(
        <Box
            width={'100%'}
            borderWidth={'5'}
            borderRadius={'20'}
            borderStyle={'solid'}
            color={'#E2E8F0'}
            boxShadow={'4px 4px 15px 0 rgba(0,0,0,0.1)'}
            backgroundColor={'#ffffff'}
            pl={10} pr={10} pt={5} pb={5} mt={4}
        >
            <Title title={props.infos.pname} PID={props.infos.pID}/>
            <Authors authors1={props.infos.PAuthor} authors2={props.infos.pauthorname}/>
            <TimeOrgan time={props.infos.pdate} organ={props.infos.PAuthor} pcite={props.infos.pcite}/>
            <Content content={props.infos.pabstract} PID={props.infos.pID}/>

            {
                props.infos.VName !== '' &&
                <Link
                    color={'#777'}
                    position={'absolute'}
                    ml={'3%'}
                    mt={'10px'}
                    onClick={() => {
                        window.open("/journal?VID=" + props.infos.p_VID)
                    }}
                >
                    {props.infos.VName}
                </Link>
            }
            <Labels labels={props.infos.pconcepts}/>
            {/*<Operations props={props.infos.isStar}/>*/}
        </Box>
    )
}


export default ResultCard;
