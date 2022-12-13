/**
 * @author AboveParadise 2022/11/12
 */
import {
    Box,
    Text,
    Icon,
    Button,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    Modal,
    Checkbox,
    CheckboxGroup,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    VStack,
    ListItem,
    Link,
    HStack,
    InputGroup, Input, InputRightElement, Divider, InputLeftElement, Alert, AlertIcon, Tooltip, Spinner
} from "@chakra-ui/react";
import React from "react";
import { MdFileDownload } from 'react-icons/md'
import {RiDoubleQuotesR} from 'react-icons/ri'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import {BsLink45Deg} from 'react-icons/bs'
import {useEffect, useState} from "react";
import {AddIcon} from "@chakra-ui/icons";
import {None} from "framer-motion";
import axios from "axios";
 function Cite(prop) {
    const Style = {
        cursor: 'pointer',
    }
    const [isLoading, setLoading] = React.useState(true)
    const { isOpen, onOpen,  onToggle, onClose } = useDisclosure()
    const [cite,setCite] = React.useState()

    const formData = new FormData()
    formData.append('PID', prop.pid)

    React.useEffect(()=>{
         axios.post("/citations", formData
         )
             .then(function (res){
                 setCite(res.data)

                 setLoading(false)
                 console.log('cite',res.data)
             })
     },[])




    if(isLoading) {
        return (
            <></>
        )
    }
    else{
        console.log('cite',cite.data.APA)
        return (
            <>
                <Tooltip hasArrow label={'引用'} placement='bottom' mr={4} bg={'frog.500'}>
                    <span><Icon as={RiDoubleQuotesR} onClick={onOpen} mr={15} style={Style}/></span>
                </Tooltip>

                <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered>
                    <ModalOverlay />
                    <ModalContent >
                        <ModalHeader textAlign={'center'}>引用</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <HStack>
                                <Text mr={5} fontWeight="bold">APA</Text>
                                <Text>
                                    {cite.data.APA}
                                </Text>

                            </HStack>
                            <HStack mt={5}>
                            <Text mr={5} fontWeight="bold">MLA</Text>
                            <Text>
                                {cite.data.MLA}
                            </Text>
                            </HStack>
                            <HStack mt={5}>
                                <Text mr={5} fontWeight="bold">IEEE</Text>
                            <Text>
                                {cite.data.IEEE}
                            </Text>
                            </HStack>
                        </ModalBody>

                        <ModalFooter>


                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

}
function Newfav(prop) {

    const handleClick = () => {
        console.log('all',prop.all)
        console.log('value',value)
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
        else if(prop.all.indexOf(value) !== -1){
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
            formData.append('CTname', value)
            let UID = window.localStorage.getItem('userToken')
            axios.post("/user/AddCollect",formData,{
                headers:{
                    'token':UID
                }
            })
                .then(function (res){
                    if(res.status !== 200){
                        return (
                            <Alert status='error'>
                                <AlertIcon />
                                新建失败！
                            </Alert>)
                    }
                    axios.post("/user/viewCollect",formData,{
                        headers:{
                            'token':UID
                        }
                    })
                        .then(function (res){
                            prop.setall(res.data)

                        })
                    console.log(value);
                })
        }
        setValue('')

    }
    const [vis, setVis] = useState(false)
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    return (
        <>
            <Alert status='error' visibility={vis?"visible":"hidden"}>
                <AlertIcon />
                收藏夹名称不能重复或为空</Alert>
        <InputGroup size='md'>
            <InputLeftElement
                pointerEvents='none'
                children={<AddIcon color='gray.300' />}
            />
            <Input
                colorScheme="frog"
                onChange={handleChange}
                placeholder='新建收藏夹'
            />
            <InputRightElement width='4rem'>
                <Button  onClick={handleClick} colorScheme='frog'>
                    新建
                </Button>
            </InputRightElement>
        </InputGroup>
        </>
    )
}
function Starred(prop){
     const { isOpen, onOpen, onToggle, } = useDisclosure()
    const [changed, setChanged] = useState(false)
    const [infos,setInfos] = React.useState()
    const [isLoading, setLoading] = React.useState(true)
    const Style = {
        cursor: 'pointer',
    }
    const s = {
        width:'100%',
        marginLeft:'10%',
    }
    let isstarred = false
    const [All,setAll] = React.useState()
    const [Pc,setPc] = React.useState()

     const [defcollect,setDefCollect] = React.useState([])
    const [confirmCollect,setConfirmCollect] = React.useState([])
    let allcollect = [];
    React.useEffect( () => {
        let mark = 0
        const formData = new FormData()
        formData.append('PID', prop.pid)
        formData.append('UID', window.localStorage.getItem('userToken'))
        // console.log(formData)
        let UID = window.localStorage.getItem('userToken')
        axios.post("/user/viewCollect", formData,{
            headers:{
                'token':UID
            }
        })
            .then(function (res){
                setAll(res.data)
                // setPc(res.data)
                console.log("666",All)


                mark += 1
                if(mark === 2){
                    setLoading(false)
                }
            })
        axios.post("/user/viewPaperCollect", formData,{
            headers:{
                'token':UID
            }
        })
            .then(function (res){
                // setAll(res.data)
                setPc(res.data)
                if(res.data.data !== null){
                    let temp = [...defcollect]
                    res.data.data.forEach(e => {
                        temp.push(e.ctname)
                    })
                    setDefCollect(temp)
                    setConfirmCollect(temp)
                }
                console.log("666",res.data)


                mark += 1
                if(mark === 2){
                    setLoading(false)
                }
                if(Pc.length !== 0){
                    isstarred = true
                }
                else{
                    isstarred = false
                    // onClose()
                }
            })
    },[])


    const Change = (value) => {
        console.log('value',value)
        // 数组元素先按字符升序排序再转成字符串比较是否和初始状态相同
        let a = value.sort((p, q) =>
            p > q ? 1 : -1,).toString()
        let b = defcollect.sort((p, q) =>
            p > q ? 1 : -1,).toString()
        if(a !== b){
            setChanged(true)
            setDefCollect(value)
            console.log(defcollect)
        }
        else{
            // 没有变化时无法点击确定按钮
            setChanged(false)
        }

    }
    const onClose = () => {
        setChanged(false)
        onToggle()
    }
    // 按下确定按钮后的函数
    const confirm = () => {
        setConfirmCollect(defcollect)
        console.log("here")
        console.log(defcollect)
        // 重新设置defaultfav
        let UID = window.localStorage.getItem('userToken')
        let CTID = []

        defcollect.forEach(e => {
            All.data.forEach(f => {
                if(f.ctname === e){
                    CTID.push(f.ctid)
                }

            })
        })
        console.log("ctid",CTID)
        const formData = new FormData()
        formData.append('PID', prop.pid)
        formData.append('CTID', CTID)
        console.log('ctid',CTID)
        axios.post("/user/CollectPaper", formData,{
            headers:{
                'token':UID
            }
        })
            .then(function (res){
                // setAll(res.data)
                console.log(res.data)
                console.log(defcollect)
                const formData = new FormData()
                formData.append('PID', prop.pid)
                axios.post("/user/viewPaperCollect", formData,{
                    headers:{
                        'token':UID
                    }
                })
                    .then(function (res){
                        // setAll(res.data)
                        setPc(res.data)
                        console.log("666",res.data)
                        if(Pc.length !== 0){
                            isstarred = true
                        }
                        else{
                            isstarred = false
                            // onClose()
                        }
                    })
            })

        onToggle()
        setChanged(false)
    }

    if(isLoading){
        return <></>
    }
    else{
        console.log('pc',Pc)
        console.log('All',All)

        All.data.forEach(e => {
            allcollect.push(e.ctname)
        })
        console.log('-------')
        return (
            <>
                {confirmCollect.length === 0  && <Tooltip hasArrow label={'收藏'} placement='bottom' mr={4} bg={'frog.500'}>
                    <span><Icon as={AiOutlineStar} mr={15} onClick={onOpen} style={Style}/></span>

                </Tooltip>}
                {confirmCollect.length !== 0  && <Tooltip hasArrow label={'取消收藏'} placement='bottom' mr={4} bg={'frog.500'}>
                    <span><Icon as={AiFillStar} mr={15} onClick={onOpen} style={Style}/></span>

                </Tooltip>}
                <>
                    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered >
                        <ModalOverlay />
                        <ModalContent minH={400}>
                            <ModalHeader textAlign={'center'}>添加到收藏夹</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody alignContent={'space-between'}>
                                <CheckboxGroup  defaultValue={confirmCollect} onChange={(value) => Change(value)}>
                                    <VStack spacing={5} width={'100%'}>
                                        {All.data.length !== 0 && All.data.map((value, key) => {
                                            console.log(value)
                                            return (
                                                <Checkbox value={value.ctname} key={key} style={s} width={'100%'}
                                                          colorScheme={'messenger'}>
                                                    <HStack width={'100%'} >
                                                        <Text>{value.ctname}</Text>
                                                        {/*<Text>{value.nums}</Text>*/}
                                                    </HStack>

                                                </Checkbox>
                                            )

                                        })}

                                    </VStack>
                                </CheckboxGroup>

                            </ModalBody>

                            <ModalFooter>
                                <VStack align={'center'} width={'100%'}>
                                    <Newfav setall={setAll} setPc={setPc} all={allcollect}/>
                                    <Divider mt={0}/>
                                    <Button colorScheme='frog' mr={3} onClick={confirm} isDisabled={!changed}>
                                        确定
                                    </Button>
                                    {/*<Button variant='ghost'>Secondary Action</Button>*/}
                                </VStack>

                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            </>
        )
    }

}
function Op(prop) {
    const property = {
        abs:'摘要',
        kw:'关键词：',
        keywords: ["马克思","中国化","方法论"],
        abstract: "MG 是面向团队的专业 UI/UX 设计工具。多人同时编辑、随时在线评审、设计一键交付，让想法更快实现，谁到了副科级司法局萨克冷冻机房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键"
        ,
        favorite:[{name:"默认收藏夹",nums:71},{name:"test",nums: 12},{name:"myfav",nums: 12}],
        defaultfav:["默认收藏夹"],
        newfav:[],

    }
    const Style = {
        cursor: 'pointer',
        }

    const [isLoading, setLoading] = React.useState(true)
    const download = () => {
        // dispatchEvent(push("https://www.pap.es/files/1116-877-pdf/990.pdf"))
    }
    const handleClick = () => {
        console.log(prop.url)
        window.open(prop.url)
    }
    let isstarred = false
    React.useEffect( () => {
        let mark = 0
        const formData = new FormData()
        formData.append('PID', prop.pid)
        formData.append('UID', window.localStorage.getItem('userToken'))
        // console.log(formData)
        let UID = window.localStorage.getItem('userToken')
        // axios.post("http://localhost:8081/user/viewCollect", formData,{
        //     headers:{
        //         'token':UID
        //     }
        // })
        //     .then(function (res){
        //         setAll(res.data)
        //         // setPc(res.data)
        //         console.log("666",res.data)
        //         mark += 1
        //         if(mark === 2){
        //             setLoading(false)
        //         }
        //     })
        // axios.post("http://localhost:8081/user/viewPaperCollect", formData,{
        //     headers:{
        //         'token':UID
        //     }
        // })
        //     .then(function (res){
        //         // setAll(res.data)
        //         setPc(res.data)
        //         console.log("666",res.data)
        //         mark += 1
        //         if(mark === 2){
        //             setLoading(false)
        //         }
        //     })

    },[])
    // if(!isLoading){
    //     // if(Pc.length !== 0){
    //     //     isstarred = true
    //     // }
    //     // else{
    //     //     isstarred = false
    //     // }
    // }
    console.log("url",prop.url)
    //     return (
    //         <Spinner
    //             ml={'45%'}
    //             mt={'25%'}
    //             thickness='4px'
    //             speed='0.65s'
    //             emptyColor='gray.200'
    //             color='blue.500'
    //             size='xl'
    //         />)
    // }
    return(

        <Box borderWidth={'5'} fontSize={25} >

            {prop.url.slice(-3,3) === "pdf" && <Tooltip hasArrow label={'下载'} placement='bottom' mr={4} bg={'#7551FF'} fontFamily={'宋体'}>
                <span>
                    <Icon as={MdFileDownload} mr={15} style={Style}/>
                </span>
            </Tooltip>}

            {prop.url.slice(-3,3) !== "pdf" && <Cite pid={prop.pid}/>}
            <Starred pid={prop.pid}/>

            {prop.url !== undefined && <Tooltip hasArrow label={'原文链接'} placement='bottom'  bg={'frog.500'}>
                <span onClick={handleClick} >
                    <Icon as={BsLink45Deg} style={Style} onClick={handleClick}/>
                </span>
            </Tooltip>}
        </Box>

    )
}


export default Op;

