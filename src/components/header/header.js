
import {Box, Button, Input, Link, Text, InputGroup, InputLeftElement} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import './header.css'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
  } from '@chakra-ui/react'
  import {
    Drawer,
  } from 'antd'

import {Link as RouterLink} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import {Row,Col} from 'antd'
import * as React from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import Translate from '../../pages/discover/translate'

const usefulLinks = [
    {
        name: "中文查重-PaperFree",
        link: "https://www.paperfree.cn/"
    },
    {
        name: "英文查重-Turnitin",
        link: "https://www.turnitin.com/zh-hans"
    },
    {
        name: "Google Scholar",
        link: "https://scholar.google.com"
    },
    {
        name: "arXiv",
        link: "https://arxiv.org/"
    },
    {
        name: "权威期刊分区-SJR",
        link: "https://www.scimagojr.com/journalrank.php"
    },
    {
        name: "权威会议分区-ConferenceRanks",
        link: "http://www.conferenceranks.com/"
    },
    {
        name: "中科院分区-LetPub",
        link: "https://www.letpub.com.cn/index.php?page=journalapp"
    },
    {
        name: "计算机科学排名-csrankings",
        link: "http://csrankings.org/"
    },
    {
        name: "上交自研排名引擎-AceRankings",
        link: "https://www.acemap.info/ranking"
    },
    {
        name: "上交自研学术平台-AceMap",
        link: "https://www.acemap.info"
    },
]


const NavLink = ({ children }) => (
    <Link
        as={RouterLink}
        to={'/toolbox'}
        px={2}
        py={1}
        rounded={'sm'}
        fontSize={'16px'}
        _hover={{
            textDecoration: 'none',
            // bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);




function Header({textColor, isLanding=false}){
    const navigate = useNavigate();
    const [user, SetUser]=React.useState({uname:''});
    const [open, setOpen] = React.useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    React.useEffect(() => {
        var config = {
        method: 'post',
        url: '/personInfo',
        headers: { 
            token: localStorage.getItem("userToken")
        }
        };
        axios(config)
            .then(res => {
                SetUser(res.data.data)
            console.log(res.data.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [])

    const [input,setInput] = React.useState()

    const sections = ['工具箱']

    let isLoggedIn = 0;
    let loggedInUsername = "";

    if (localStorage.getItem("userToken") !== null) {
        // 已经登录
        isLoggedIn = 1;
        loggedInUsername = localStorage.getItem("username");
        // console.log(localStorage.getItem("userToken"));
        // console.log(localStorage.getItem("username"));
    }


    // 只有white和black两种选项
    // if (textColor.localeCompare("white") !== 0){
    //     textColor = "black"
    // }

    return (
        <Box
            w='100%'
            h='9.5vh'
            bg='#0a2a43'
        >
            <Row>
                <Col span='2' offset={1}>
                    <Avatar src={require("../../assets/acegate_icon.png")} width='75px' height='75px'></Avatar>
                </Col>
                <Col span='10' offset={1}>
                    {isLanding ?
                            <Box />
                            :
                            <InputGroup>
                                <InputLeftElement
                                size='xl'
                                mt='15px'
                                children={<SearchIcon color='gray.300' />}
                                />
                                <Input
                                size='md'
                                backgroundColor='white'
                                focusBorderColor = "white"
                                mt='14px'
                                placeholder="快捷搜索……"
                                onChange={(e) => {
                                    setInput(e.target.value)
                                }}
                                onKeyPress={(value) => {
                                        if(value.key === "Enter") {
                                            window.open("/defaultSearch?q=" + input)
                                        }
                                }}
                            />
                            </InputGroup>
                    }
                </Col>
                <Col span={2} style={{margin:'auto'}}>
                    {isLoggedIn ?
                        <Link href={"/advancedSearch"} color='white' fontSize={'15px'}>
                            高级检索
                        </Link>
                    :
                    <p></p>
                    }
                </Col>
                <Col span='2' style={{margin:'auto'}}>
                {isLoggedIn ?
                    <Popover>
                        <PopoverTrigger>
                            <Link                         
                            color='white'
                            fontSize={'15px'}
                            _hover={{
                                textDecoration: 'none',
                            }}>⚒️工具箱</Link>
                            {/* <Text color='white' size='2xl' >⚒️工具箱</Text> */}
                        </PopoverTrigger>
                        <PopoverContent w='240px' border='blue'>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>
                                    <Text fontSize='md' fontWeight='550' mr='20px'> </Text>
                            </PopoverHeader>
                            <PopoverBody>
                                <Button onClick={()=>{
                                    showDrawer()
                                }}> 翻译</Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    :
                    <p></p>
                }
                </Col>
                <Col style={{margin:'auto'}}>
                    {isLoggedIn ?
                        <Popover>
                        <PopoverTrigger>
                            <Row>
                                <Col>
                                    <Text mt='6px' color='white' size='2xl' fontWeight='550'>👏Hey , {user.uname}</Text>
                                </Col>
                                <Col> 
                                    <Avatar width='35px' ml='8px' height='35px' name={user.uname}></Avatar>
                                </Col>
                            </Row >
                        </PopoverTrigger>
                        <PopoverContent w='240px' border='blue'>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>
                                    <Text fontSize='md' fontWeight='550' mr='20px'>Email  </Text>
                                    <Text ml='20px' mt='10px'>{user.uemail}</Text>
                            </PopoverHeader>
                            <PopoverBody>
                                <Row>
                                <Button w='220px' onClick={()=>{
                                    navigate('/personInfo')
                                }}>
                                    账户设置</Button>
                                </Row>
                                <Row>
                                    {
                                        user.utype == "default"?(
                                            <Button w='220px' mt='8px' onClick={()=>{
                                                navigate('/applyPortal')
                                            }}
                                            >申请入驻</Button>
                                        ):(
                                            <Button w='220px' mt='8px' onClick={()=>{
                                                navigate('/scholarPortal?UID=' + user.uid)
                                            }}>我的门户</Button>
                                        )
                                    }
                                </Row>
                                <Row>
                                <Button w='220px' mt='8px'>登出</Button>
                                </Row>
                            </PopoverBody>
                        </PopoverContent>
                        </Popover>

                    :
                    <Link href={"/loginAndRegister"} color='white'>
                    <Text fontWeight={'bold'} fontSize="20px">登录 / 注册</Text>
                    </Link>
                    }
                </Col>
            </Row>

            <Drawer title="翻译" placement="right" onClose={onClose} open={open} width={640}>
                <Translate></Translate>
            </Drawer>
        </Box>

    )
}

export default Header;
