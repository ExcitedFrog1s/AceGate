//
// Created by zyc on 2022/11/11.
//

import {Box, Link, Text,Tag} from '@chakra-ui/react'
import {useState} from "react"
import {AiFillStar,AiOutlineStar} from "react-icons/ai"

function Title({title}) {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const linkStyle = {
        color: '#161616',
        fontSize: '30px',
        textDecoration: isHover ? 'underline' : 'none',
    }

    return (
        <Box ml={'10'} mt={'20px'}>
            <Link href={'/'}
                  style={linkStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
            >
                {title}
            </Link>
        </Box>
    )

}

function Author({author,key}) {
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

    return(
        <Link key={key} href={'/'}
              style={linkStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
        >
            {author}
        </Link>
    )
}

function Authors({authors}) {
    return(
    <Box ml={'10'} mt={'-5px'}>
        {
            authors.map((value, key) => {
                return (
                    <Author author={value} key={key}/>
                );
            })
        }
        </Box>
    )

}

function TimeOrgan({props}) {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false);
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
                {props.time + ' '}
            </i>
            <Link href={'/'}
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
                {props.organ}
            </Link>
        </Box>
    )
}

function Content({content}) {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const linkStyle = {
        color: '#a0a0a0',
        fontSize: '16px',
        cursor: 'pointer',
        textDecoration: isHover ? 'underline' : 'none',
    }
    return(
        <Box ml={'10'} mt={'30px'}>
            <Link href={'/'} style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {content.slice(0,200) + '......'}
            </Link>
        </Box>
    )
}

function Label({label,key}) {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const labelBoxStyle = {
        borderRadius: '10px',
        backgroundColor: isHover ? 'rgba(131,167,207,0.9)' : 'rgba(131,167,207,0.5)',
        float: 'left',
        marginLeft: '8px',
        minHeight: '30px',
    }

    return(
        <Link href={'/'} fontSize={'17px'} textDecoration={'none'} textColor={'blue'}>
            <Tag style={labelBoxStyle} key={key} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {label}
            </Tag>
        </Link>
    )
}

function Labels({labels}) {
    return(
        <Box ml={'10'} mb={'5%'} mt={'20px'}>
            <Text mt={'0'} color={'#000000'} float={'left'} fontWeight={'bold'}>{'标签'}</Text>
            {
                labels.map((value, key) => {
                    return (
                        <Label label={value} key={key}/>
                    )
                })
            }
        </Box>
    )
}

function Star() {
    const [isClick, setIsClick] = useState(false)

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
        height:'30px'}

    return(
        <Box>
            {isClick && <AiFillStar onMouseDown={handleMouseDown} style={starStyle}/>}
            {!isClick && <AiOutlineStar onMouseDown={handleMouseDown} style={starStyle}/>}
        </Box>
    )
}

function Operations() {
    const operationsBoxStyle = {
        borderTop: '1px solid #ddd',
        marginTop: '60px',
        marginLeft: '50px',
        marginRight: '50px'
    }
    return(
        <Box style={operationsBoxStyle}>
            <Star/>
        </Box>
    )
}

function ResultCard({props}) {
    return(
        <Box
            height={'300'}
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
            <Title title={props.title}/>
            <Authors authors={props.authors}/>
            <TimeOrgan props={{'time':props.time,'organ':props.organ}}/>
            <Content content={props.content}/>
            <Labels labels={props.labels}/>
            <Operations/>
        </Box>
    )
}


export default ResultCard;
