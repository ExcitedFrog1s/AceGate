import {Box, HStack, Link, Text, VStack} from "@chakra-ui/react";
import * as React from 'react';
import "./search.css"

function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
function Author(props) {
    const [isHover1, setIsHover1] = React.useState(false)

    const handleMouseEnter1 = () => {
        setIsHover1(true)
    }

    const handleMouseLeave1 = () => {
        setIsHover1(false);
    }

    const handleClick1 = () => {
        window.open('/scholarPortal?RID=' + props.info.rID)
    }

    const linkStyle1 = {
        fontSize: '20px',
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
        console.log(props.info)
        window.open("/institute?IID=" + props.info.r_IID)
    }

    const linkStyle2 = {
        color: 'grey',
        fontSize: '14px',
        cursor: 'pointer',
        textDecoration: isHover2 ? 'underline' : 'none',
        marginTop: '5px',
        noOfLines: 1
    }

    return(
        <Box mt={'25px'}>
            <Link
                style={linkStyle1}
                onMouseEnter={handleMouseEnter1}
                onMouseLeave={handleMouseLeave1}
                onClick={handleClick1}
            >
                <Text>
                    {props.info.rname}
                </Text>
            </Link>
            <Link
                style={linkStyle2}
                onMouseEnter={handleMouseEnter2}
                onMouseLeave={handleMouseLeave2}
                onClick={handleClick2}
            >
                <Text>
                    {props.info.rinstitute}
                </Text>
            </Link>
            <HStack mt={'10px'} spacing={'30%'}>
                <VStack>
                    <Text color={'frog.500'} fontSize={'16px'}>{separator(props.info.rcitescount)}</Text>
                    <Text fontSize={'16px'}>{'总引用量'}</Text>
                </VStack>
                <VStack>
                    <Text color={'frog.500'} fontSize={'16px'}>{separator(props.info.rworkscount)}</Text>
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
        window.open("/institute?IID=" + props.info.iID)
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
                {
                    props.info.ichinesename === undefined &&
                    <Text>
                        {props.info.iname}
                    </Text>
                }
                {
                    props.info.ichinesename !== undefined &&
                    <Text>
                        {props.info.iname + "（" + props.info.ichinesename + "）"}
                    </Text>
                }
            </Link>
            <HStack mt={'10px'} spacing={'30%'}>
                <VStack>
                    <Text color={'frog.500'} fontSize={'16px'}>{separator(props.info.icitednum)}</Text>
                    <Text fontSize={'16px'}>{'总引用量'}</Text>
                </VStack>
                <VStack>
                    <Text color={'frog.500'} fontSize={'16px'}>{separator(props.info.iworksum)}</Text>
                    <Text fontSize={'16px'}>{'总论文数'}</Text>
                </VStack>
            </HStack>
        </Box>
    )
}

function Recommendation(props) {
    const authorStyle = {
        fontSize: '21px',
        marginLeft: '10px',
        textShadow: 'rgb(0 0 0 / 20%) 4px 4px 6px',
        color: 'rgba(0,0,0,.85)',
        fontWeight: '600'
    }
    const instituteStyle = {
        fontSize: '21px',
        marginLeft: '10px',
        marginTop: '15px',
        textShadow: 'rgb(0 0 0 / 20%) 4px 4px 6px',
        color: 'rgba(0,0,0,.85)',
        fontWeight: '600'
    }

    return(
        <Box
            className="left"
            width={'100%'}
            borderRadius={'20'}
            borderColor={'#E2E8F0'}
            boxShadow={'4px 4px 15px 0 rgba(0,0,0,0.1)'}
            backgroundColor={'#ffffff'}
            mr={2}
            css={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#cccccc',
                  borderRadius: '24px',
                },
              }}
        >
            <Text fontSize={'25px'} color={'#4A5568'} fontWeight='bold'>{'Recommendation'}</Text>
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
            <Box ml={'15px'} mt={'50px'} borderTopColor={'#ddd'} borderTopWidth={'1px'} borderTopStyle={'solid'}>

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
