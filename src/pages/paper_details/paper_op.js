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
    AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter
} from "@chakra-ui/react";
import React from "react";
import { MdFileDownload } from 'react-icons/md'
import {RiDoubleQuotesR} from 'react-icons/ri'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import {BsLink45Deg} from 'react-icons/bs'
import {useEffect, useState} from "react";
function Starred() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    return (
        <>
            <Button onClick={onOpen}>Discard</Button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to discard all of your notes? 44 words will be
                        deleted.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='red' ml={3}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
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
        favorite:{"默认收藏夹":true,"test":false}

    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [isClick, setIsClick] = useState(isstarred)
    const Style = {
        cursor: 'pointer',
        }
    const handleMouseDown = () => {
        if (isClick) {

            setIsClick(false)
        } else {
            setIsClick(true)
        }

    }
    return(
        <>
        <Box
            borderWidth={'5'}
            marginLeft={'4.5%'}
            mt={320}

            fontSize={25}
            position={'relative'}
        >

            <Icon as={MdFileDownload} mr={15} style={Style}/>
            <Icon as={RiDoubleQuotesR} mr={15} style={Style}/>
            {!isOpen && <Icon as={AiOutlineStar} mr={15} onClick={onOpen} style={Style}/>}
            {isOpen && <Icon as={AiFillStar} mr={15}  onClick={onOpen} style={Style}/>}

            <Icon as={BsLink45Deg} style={Style}/>

        </Box>
        <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader>添加到收藏夹</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    Are you sure you want to discard all of your notes? 44 words will be
                    deleted.
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        No
                    </Button>
                    <Button colorScheme='red' ml={3}>
                        Yes
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    )
}


export default Op;

