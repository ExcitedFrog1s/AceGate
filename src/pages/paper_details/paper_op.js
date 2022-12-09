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
    InputGroup, Input, InputRightElement, Divider, InputLeftElement, Alert, AlertIcon, Tooltip
} from "@chakra-ui/react";
import React from "react";
import { MdFileDownload } from 'react-icons/md'
import {RiDoubleQuotesR} from 'react-icons/ri'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import {BsLink45Deg} from 'react-icons/bs'
import {useEffect, useState} from "react";
import {AddIcon} from "@chakra-ui/icons";
import {None} from "framer-motion";
function Cite() {
    const property = {

    }
    const Style = {
        cursor: 'pointer',
    }
    const { isOpen, onOpen,  onToggle, onClose } = useDisclosure()

    return (
        <>
            <Tooltip hasArrow label={'引用'} placement='bottom' mr={4} bg={'#7551FF'} fontFamily={'宋体'}>
                <span><Icon as={RiDoubleQuotesR} onClick={onOpen} mr={15} style={Style}/></span>

            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered >
                <ModalOverlay />
                <ModalContent minH={400}>
                    <ModalHeader textAlign={'center'}>引用</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>

                    <ModalFooter>


                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
function Newfav() {

    const handleClick = () => {
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
        console.log(value);
    }
    const [vis, setVis] = useState(false)
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    return (
        <>
            <Alert status='error' visibility={vis?"visible":"hidden"}>
                <AlertIcon />
                请填写收藏夹名称</Alert>
        <InputGroup size='md'>
            <InputLeftElement
                pointerEvents='none'
                children={<AddIcon color='gray.300' />}
            />
            <Input
                onChange={handleChange}
                placeholder='新建收藏夹'
            />
            <InputRightElement width='4rem'>
                <Button  onClick={handleClick} colorScheme='messenger'>
                    新建
                </Button>
            </InputRightElement>
        </InputGroup>
        </>
    )
}
function Starred({property}){
    const { isOpen, onOpen,  onToggle} = useDisclosure()
    const [changed, setChanged] = useState(false)
    const Style = {
        cursor: 'pointer',
    }
    const s = {
        width:'100%',
        marginLeft:'10%',
    }
    const Change = (value) => {
        // 数组元素先按字符升序排序再转成字符串比较是否和初始状态相同
        let a = value.sort((p, q) =>
            p > q ? 1 : -1,).toString()
        let b = property.defaultfav.sort((p, q) =>
            p > q ? 1 : -1,).toString()
        if(a !== b){
            setChanged(true)
            property.newfav = value;
            console.log(property.newfav)
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
        // 重新设置defaultfav


        onToggle()
        setChanged(false)
    }
    return (
        <>
        {!isOpen && <Tooltip hasArrow label={'收藏'} placement='bottom' mr={4} bg={'#7551FF'} fontFamily={'宋体'}>
            <span><Icon as={AiOutlineStar} mr={15} onClick={onOpen} style={Style}/></span>

        </Tooltip>}
        {isOpen && <Tooltip hasArrow label={'取消收藏'} placement='bottom' mr={4} bg={'#7551FF'} fontFamily={'宋体'}>
            <span><Icon as={AiFillStar} mr={15} onClick={onOpen} style={Style}/></span>

        </Tooltip>}
            <>
                <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered >
                    <ModalOverlay />
                    <ModalContent minH={400}>
                        <ModalHeader textAlign={'center'}>添加到收藏夹</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody alignContent={'space-between'}>
                            <CheckboxGroup  defaultValue={property.defaultfav} onChange={(value) => Change(value)}>
                                <VStack spacing={5} width={'100%'}>
                                    {property.favorite.map((value, key) => {
                                        return (
                                            <Checkbox value={value.name} key={key} style={s} width={'100%'}
                                                      colorScheme={'messenger'}>
                                                <HStack width={'100%'} >
                                                    <Text>{value.name}</Text>
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
                                <Newfav/>
                                <Divider mt={0}/>
                                <Button colorScheme='messenger' mr={3} onClick={() => confirm()} isDisabled={!changed}>
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
function Op({isstarred}) {
    const property = {
        abs:'摘要',
        kw:'关键词：',
        keywords: ["马克思","中国化","方法论"],
        abstract: "MG 是面向团队的专业 UI/UX 设计工具。多人同时编辑、随时在线评审、设计一键交付，让想法更快实现，谁到了副科级司法局萨克冷冻机房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键"
        ,
        favorite:[{name:"默认收藏夹",nums:71},{name:"test",nums: 12},{name:"myfav",nums: 12}],
        defaultfav:["默认收藏夹"],
        newfav:[],
        isstarred:isstarred,
    }
    const Style = {
        cursor: 'pointer',
        }

    const download = () => {
        // dispatchEvent(push("https://www.pap.es/files/1116-877-pdf/990.pdf"))
    }

    return(

        <Box borderWidth={'5'} marginLeft={'4.5%'} mt={320} fontSize={25} position={'relative'}>

            <Tooltip hasArrow label={'下载'} placement='bottom' mr={4} bg={'#7551FF'} fontFamily={'宋体'}>
                <span>
                    <Icon as={MdFileDownload} mr={15} style={Style}/>
                </span>
            </Tooltip>

            <Cite/>
            <Starred property={property}/>

            <Tooltip hasArrow label={'原文链接'} placement='bottom'  bg={'#7551FF'} fontFamily={'宋体'}>
                <span>
                    <Icon as={BsLink45Deg} style={Style}/>
                </span>
            </Tooltip>
        </Box>

    )
}


export default Op;

