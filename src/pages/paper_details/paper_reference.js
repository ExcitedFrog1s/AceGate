/**
 * @author AboveParadise 2022/11/13
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Reference() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '56%',height:349, marginLeft:'3%',boxShadow:2,borderRadius:2,borderColor:'#E2E8F0'}}>
            <Box sx={{textAlign: 'right', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="参考文献" {...a11yProps(0)} />
                    <Tab label="相关文献" {...a11yProps(1)} />
                    <Tab label="文章评论" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                参考文献
            </TabPanel>
            <TabPanel value={value} index={1}>
                相关文献
            </TabPanel>
            <TabPanel value={value} index={2}>
                文章评论
            </TabPanel>
        </Box>
    );
}

// import {Box, HStack, Text, Divider, Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider} from "@chakra-ui/react";
// function Reference1() {
//     const property = {
//         abs:'摘要',
//         kw:'关键词：',
//         keywords: ["马克思","中国化","方法论"],
//         abstract: "MG 是面向团队的专业 UI/UX 设计工具。多人同时编辑、随时在线评审、设计一键交付，让想法更快实现，谁到了副科级司法局萨克冷冻机房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键房萨克就够啦实践观亮剑嗷谁到了看过就搜啊解耦is打几份雷克萨解放了老师就大功我感觉老款车型女了红军关键时刻辣豆腐就仨空间IE图嘎忘记了快捷键"
//         ,
//
//     }
//
//     return(
//         <Box
//             height={'348'}
//             width={'55%'}
//             borderWidth={'5'}
//             borderRadius={'12'}
//             borderStyle={'solid'}
//             marginLeft={'3%'}
//             color={'#E2E8F0'}
//             boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
//             position={'absolute'}
//         >
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//             <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//                 <Tab label="Item One" {...a11yProps(0)} />
//                 <Tab label="Item Two" {...a11yProps(1)} />
//                 <Tab label="Item Three" {...a11yProps(2)} />
//             </Tabs>
//         </Box>
//     <TabPanel value={value} index={0}>
//         Item One
//     </TabPanel>
//     <TabPanel value={value} index={1}>
//         Item Two
//     </TabPanel>
//     <TabPanel value={value} index={2}>
//         Item Three
//     </TabPanel>
//
//
//             <Text textDecoration={'none'}
//                   color={'#161616'}
//                   fontSize={'25'}
//                   m={8}
//             >
//                 {property.abs}
//             </Text>
//
//             <Text ml={8} color={'#161616'}
//                   fontSize={'15'} noOfLines={5}
//                   maxW={850} mr={8}>{property.abstract}</Text>
//
//
//
//         </Box>
//
//     )
// }
export default Reference