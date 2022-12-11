import {Box, HStack, Link, Text, VStack} from "@chakra-ui/react";
import * as React from 'react';


function Author(props) {
    const [isHover1, setIsHover1] = React.useState(false)

    const handleMouseEnter1 = () => {
        setIsHover1(true)
    }

    const handleMouseLeave1 = () => {
        setIsHover1(false);
    }

    const handleClick1 = () => {
        window.open('/scholarPortal?RID=' + props.info.RID)
    }

    const linkStyle1 = {
        fontSize: '22px',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: isHover1 ? 'underline' : 'none'
    }

    const [isHover2, setIsHover2] = React.useState(false)

    const handleMouseEnter2 = () => {
        setIsHover2(true)
    }

    const handleMouseLeave2 = () => {
        setIsHover2(false);
    }

    const handleClick2 = () => {
        window.open("/institute?IID=" + props.info.RIID)
    }

    const linkStyle2 = {
        color: 'grey',
        fontSize: '16px',
        cursor: 'pointer',
        textDecoration: isHover2 ? 'underline' : 'none'
    }

    return(
        <Box mt={'25px'} ml={'10px'}>
            <Link
                style={linkStyle1}
                onMouseEnter={handleMouseEnter1}
                onMouseLeave={handleMouseLeave1}
                onClick={handleClick1}
            >
                <Text>
                    {props.info.Rname}
                </Text>
            </Link>
            <Link
                style={linkStyle2}
                onMouseEnter={handleMouseEnter2}
                onMouseLeave={handleMouseLeave2}
                onClick={handleClick2}
            >
                <Text>
                    {props.info.Rinstitute}
                </Text>
            </Link>
            <HStack mt={'10px'} spacing={'30%'}>
                <VStack>
                    <Text color={'#0274b3'} fontSize={'14px'}>{props.info.Rcitescount}</Text>
                    <Text fontSize={'18px'}>{'总引用量'}</Text>
                </VStack>
                <VStack>
                    <Text color={'#0274b3'} fontSize={'16px'}>{props.info.Rworkscount}</Text>
                    <Text fontSize={'16px'}>{'总论文数'}</Text>
                </VStack>
            </HStack>
        </Box>
    )
}

function Institute(props) {
    const [isHover, setIsHover] = React.useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const handleClick = () => {
        window.open("/institute?IID=" + props.info.IID)
    }

    const linkStyle = {
        fontSize: '22px',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: isHover ? 'underline' : 'none',
    }

    return(
        <Box mt={'25px'} ml={'10px'}>
            <Link
                style={linkStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                <Text>
                    {props.info.Iname}
                </Text>
            </Link>
            <HStack mt={'10px'} spacing={'30%'}>
                <VStack>
                    <Text color={'#0274b3'} fontSize={'14px'}>{props.info.Icitedsum}</Text>
                    <Text fontSize={'18px'}>{'总引用量'}</Text>
                </VStack>
                <VStack>
                    <Text color={'#0274b3'} fontSize={'16px'}>{props.info.Iworksnum}</Text>
                    <Text fontSize={'16px'}>{'总论文数'}</Text>
                </VStack>
            </HStack>
        </Box>
    )
}

function Recommendation(props) {
    const authorStyle = {
        fontSize: '20px',
        marginBottom: '-25px',
        marginLeft: '10px',
        marginTop: '15px',
        textShadow: 'rgb(0 0 0 / 20%) 4px 4px 6px',
        color: 'rgba(0,0,0,.85)',
        fontWeight: '600'
    }
    const instituteStyle = {
        fontSize: '20px',
        marginBottom: '-25px',
        marginLeft: '10px',
        marginTop: '30px',
        textShadow: 'rgb(0 0 0 / 20%) 4px 4px 6px',
        color: 'rgba(0,0,0,.85)',
        fontWeight: '600'
    }

    return(
        <Box
            minHeight={'1000px'}
            width={'20%'}
            ml={'80%'}
            borderWidth={'5'}
            borderRadius={'12'}
            borderStyle={'solid'}
            borderColor={'#E2E8F0'}
            boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
            position={'absolute'}
        >
            <Text fontSize={'20px'} color={'#a0a0a0'} mt={'10px'} ml={'15px'}>{'Recommendation'}</Text>
            <Text style={authorStyle}>{'作者'}</Text>
            {
                (props.recommendation.author !== undefined && props.recommendation.author.length !==0) &&
                props.recommendation.author.map((value,key) => {
                    return (
                        <Author info={value} key={key}/>
                    )
                })
            }
            {
                (props.recommendation.author === undefined || props.recommendation.author.length ===0) &&
                <Text ml={'10px'} mt={'50px'} fontSize={'30px'} color={'#c4c4c4'}>{'暂无推荐'}</Text>
            }
            <Box ml={'15px'} mr={'15px'} mt={'50px'} borderTopColor={'#ddd'} borderTopWidth={'1px'} borderTopStyle={'solid'}>

            </Box>
            <Text style={instituteStyle}>{'机构'}</Text>
            {
                (props.recommendation.institute !== undefined && props.recommendation.institute.length !==0) &&
                props.recommendation.institute.map((value,key) => {
                    return (
                        <Institute info={value} key={key}/>
                    )
                })
            }
            {
                (props.recommendation.institute === undefined || props.recommendation.institute.length ===0) &&
                <Text ml={'10px'} mt={'50px'} fontSize={'30px'} color={'#c4c4c4'}>{'暂无推荐'}</Text>
            }
        </Box>
    )
}

export default Recommendation
