import {Box, Flex, Text, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import Header from "../../components/header/header";
import axios from "axios";


async function handleSiteStatus() {
    let ret = null;
    await axios.post('/manage/info')
        .then(res => {
            console.log(res.data);
            ret = res.data;
        })
    return ret;
}

async function handleTranslate() {

}

const plagiarismLinks = [
    {
        name: "中文查重-PaperFree",
        link: "https://www.paperfree.cn/"
    },
    {
        name: "英文查重-Turnitin",
        link: "https://www.turnitin.com/zh-hans"
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
        name: "计算机科学排名-csrankings",
        link: "http://csrankings.org/"
    },
    {
        name: "上海交大自研-AceRankings",
        link: "https://www.acemap.info/ranking"
    }
]


function Toolbox(){

    const [siteStatus, setSiteStatus] = useState({
        userSum: 0,
        iScholarSum: 0,
        scholarSum: 0,
        fieldSum: 0,
        paperSum: 0,
        insSum: 0
    });

    const getSiteStatus = async () => {
        let ret = await handleSiteStatus();
        setSiteStatus(ret);
    }

    useEffect(() => {
        window.addEventListener('load', getSiteStatus)
        return () => {
            window.removeEventListener('load', getSiteStatus)
        }
    }, [siteStatus])


    return (
        <Box>
            <Header isLanding={false} textColor={'black'} />
            <Box w={'80vw'} ml={'10vw'} mr={'10vw'} mt={'50px'}>
                <Flex
                    width={'100%'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Box
                        width={'50%'}

                    >
                        <Text fontSize={'28px'} textAlign={'center'}>
                            翻译
                        </Text>
                    </Box>
                    <Box
                        width={'50%'}
                    >
                        <Text fontSize={'28px'} textAlign={'center'}>
                            实用链接
                        </Text>

                    </Box>
                </Flex>
            </Box>

            <Box h={'75px'} />
            <VStack
                spacing={'2vh'}
                width={'60vw'} ml={'20vw'} mr={'20vw'}
            >
                <Text fontSize={'36px'}>
                    AceGate已爬取：
                </Text>
                <Flex
                    width={'60%'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Box>
                        <Text fontSize={'16px'} fontWeight={'semibold'}>论文数</Text>
                        <Text fontSize={'48px'} fontWeight={'bold'} textAlign={'left'}>{siteStatus.paperSum}</Text>
                    </Box>
                    <Box>
                        <Text fontSize={'16px'} fontWeight={'semibold'}>机构数</Text>
                        <Text fontSize={'48px'} fontWeight={'bold'} textAlign={'right'}>{siteStatus.insSum}</Text>
                    </Box>
                </Flex>
                <Flex
                    width={'60%'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Box>
                        <Text fontSize={'16px'} fontWeight={'semibold'}>学者数</Text>
                        <Text fontSize={'48px'} fontWeight={'bold'} textAlign={'left'}>{siteStatus.scholarSum}</Text>
                    </Box>
                    <Box>
                        <Text fontSize={'16px'} fontWeight={'semibold'}>（所有等级的）领域数</Text>
                        <Text fontSize={'48px'} fontWeight={'bold'} textAlign={'right'}>{siteStatus.fieldSum}</Text>
                    </Box>
                </Flex>
                <Text fontSize={'16px'} fontWeight={'semibold'}>另有{siteStatus.iScholarSum}位学者已经入驻AceGate。</Text>
            </VStack>
        </Box>
    )
}

export default Toolbox;
