
import {Box, Button, Input, Link, Text, InputGroup, InputLeftElement,Image, space} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
// import './header.css'
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
    Drawer
  } from 'antd'
  import { message, Popconfirm ,Tooltip} from 'antd';

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




function MyHeader({textColor, isLanding=false}){
    const navigate = useNavigate();
    const [user, SetUser]=React.useState({uname:''});
    const [open, setOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn]=React.useState(0);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    React.useEffect(() => {
        console.log(localStorage.getItem("userToken"))
        if (localStorage.getItem("userToken") != null) {
            // 已经登录
            setIsLoggedIn(1)

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
        }

    }, [])

    const [input,setInput] = React.useState()

    const sections = ['工具箱']

    const confirm = (e) => {
        setIsLoggedIn(0);
        localStorage.removeItem("userToken")
        localStorage.removeItem("userType")
        localStorage.removeItem("username")
        // localStorage.setItem("userToken", null);
        // localStorage.setItem("userType", null);
        // localStorage.setItem("username", null);
        message.success('退出成功');
        setTimeout(function () {
            navigate("/");
        }, 1000);
      };


    let userButton;
    if(isLoggedIn && user.utype == "default"){
        userButton = (<Button w='220px' mt='8px' onClick={()=>{
            navigate('/applyPortal')
        }}
        >申请入驻</Button>)
    }
    else if(isLoggedIn && user.utype == "admin"){
        userButton = (<Button w='220px' mt='8px' onClick={()=>{
            navigate('/manage/info')
        }}
        >后台管理</Button>)
    }
    else{
        userButton = (<Button w='220px' mt='8px' onClick={()=>{
            navigate('/scholarPortal?RID=' + user.u_rid)
        }}>我的门户</Button>)
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
                    <Avatar
                        src={require("../../assets/acegate_icon_header.png")}
                        width='95px'
                        height='60px'
                        marginTop='9px'
                        cursor={'pointer'}
                        onClick={() => {
                            navigate("/")
                        }}
                    />
                </Col>
                <Col span='9' offset={1}>
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
                        <Link target = "_blank"  href={"/advancedSearch"} color='white' fontSize={'15px'}>
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
                            ml='30px'
                            color='white'
                            fontSize={'15px'}
                            _hover={{
                                textDecoration: 'none',
                            }}>⚒️工具箱</Link>
                            {/* <Text color='white' size='2xl' >⚒️工具箱</Text> */}
                        </PopoverTrigger>
                        <PopoverContent w='450px' border='blue'>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>
                                    <Text fontSize='md' fontWeight='550' mr='20px'> </Text>
                            </PopoverHeader>
                            <PopoverBody>
                                <Row>
                                <Col span={6}>
                                    <Image src={require('../../assets/chinese.png')} height='55px'w='55px' ml='15px' />
                                        <Button onClick={()=>{
                                            window.open("https://www.paperfree.cn")
                                            }}
                                            size='md'>
                                        中文查重
                                        </Button>
                                    </Col>
                                    <Col span={6}>
                                    <Image src={require('../../assets/english.png')} height='55px'w='55px' ml='15px' />
                                        <Button onClick={()=>{
                                            window.open("https://www.turnitin.com/zh-hans")
                                            }}
                                            size='md'>
                                        英文查重
                                        </Button>
                                    </Col>
                                    <Col span={6}>
                                        <Image src={require('../../assets/translate.png')} height='55px'w='55px' ml='15px' />
                                        <Button onClick={()=>{
                                            showDrawer()
                                            }}
                                            size='md'>
                                        论文翻译
                                        </Button>
                                    </Col>

                                    <Col span={6}>
                                    <Image src={require('../../assets/analyse.png')} height='55px'w='55px' ml='15px' />
                                        <Button onClick={()=>{
                                             window.open("https://www.letpub.com.cn/index.php?page=journalapp")

                                            }}
                                            size='md'>
                                        投稿分析
                                        </Button>
                                    </Col>
                                </Row>

                                <Row style={{marginTop:"20px"}}>
                                    <Col span={6}>
                                        <Image src={require('../../assets/rank.png')} height='55px'w='55px' ml='15px' />
                                        <Button onClick={()=>{
                                            window.open("https://www.acemap.info/ranking")
                                            }}
                                            size='md'>
                                        排名引擎
                                        </Button>
                                    </Col>
                                    <Col span={6}>
                                    <Image src={require('../../assets/journal-header.png')} height='55px'w='55px' ml='15px' />
                                        <Button onClick={()=>{
                                            window.open("https://www.scimagojr.com/journalrank.php")
                                            }}
                                            size='md'>
                                        期刊频道
                                        </Button>
                                    </Col>
                                    <Col span={6}>
                                    <Image src={require('../../assets/conference.png')} height='55px'w='55px' ml='15px' />
                                        <Button onClick={()=>{
                                           window.open("http://www.conferenceranks.com/")
                                            }}
                                            size='md'>
                                        会议频道
                                        </Button>
                                    </Col>
                                    <Col span={6}>
                                    <Image src={require('../../assets/website.png')} height='55px'w='55px'  ml='15px'/>
                                    <Popover placement='bottom-start'>
                                    <PopoverTrigger>
                                        <Button size='md'>
                                        学术平台
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent  w='130px'>
                                        <PopoverBody>
                                        <Button onClick={()=>{
                                           window.open("https://scholar.google.com")
                                            }}
                                            size='sm'
                                            w='100px'>
                                            Google Scholar
                                        </Button>
                                        <Button onClick={()=>{
                                           window.open("https://arxiv.org/")
                                            }}
                                            size='sm'
                                            w='100px'>
                                            arXiv
                                        </Button>
                                        <Button onClick={()=>{
                                           window.open("https://www.acemap.info")
                                            }}
                                            size='sm'
                                            w='100px'>
                                            AceMap
                                        </Button>
                                        </PopoverBody>
                                    </PopoverContent>
                                    </Popover>

                                    </Col>
                                </Row>




                                {/* <Button onClick={()=>{
                                    showDrawer()
                                }}> 翻译</Button> */}
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    :
                    <p></p>
                }
                </Col>
                <Col span='5' style={{margin:'auto'}} >
                    {isLoggedIn ?
                        <Popover >
                        <PopoverTrigger>
                            <Row style={{marginLeft:'60px'}}>
                                <Col>
                                    <Text mt='6px' color='white' size='2xl' fontWeight='550'>👏Hey , {user.uname}</Text>
                                </Col>
                                <Col>
                                    <Avatar width='35px' ml='8px' height='35px' name={user.uname}></Avatar>
                                </Col>
                            </Row >
                        </PopoverTrigger>
                        <PopoverContent w='240px' border='blue' >
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>
                                    <Text fontSize='md' fontWeight='550' mr='20px' >Email  </Text>
                                    <Text ml='20px' mt='10px'>{user.uemail}</Text>
                            </PopoverHeader>
                            <PopoverBody>
                                <Row>
                                <Button w='220px' onClick={()=>{
                                    navigate('/favorite')
                                }}>
                                    我的收藏</Button>
                                </Row>
                                <Row>
                                <Button w='220px' mt='8px' onClick={()=>{
                                    navigate('/personInfo')
                                }}>
                                    账户设置</Button>
                                </Row>
                                <Row>
                                    {userButton}
                                </Row>
                                <Row>

                                    <Popconfirm
                                        placement="bottom"
                                        title="确认退出登录？"
                                        onConfirm={confirm}
                                        okText="确认"
                                        cancelText="取消"
                                    >
                                        <Button w='220px' mt='8px'>退出登录</Button>
                                    </Popconfirm>

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

            <Drawer title="翻译" placement="right" onClose={onClose} open={open} width={600}>
                <Translate></Translate>
            </Drawer>
        </Box>
    )
}

export default MyHeader;
