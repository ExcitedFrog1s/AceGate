import {Box, Button, Flex, Select, Text, Textarea, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import Header from "../../components/header/header";
import axios from "axios";


// async function handleSiteStatus() {
//     let ret = null;
//     await axios.post('/manage/info')
//         .then(res => {
//             console.log(res.data);
//             ret = res.data;
//         })
//     return ret;
// }

async function handleTranslate(sourceText, originLanguage, targetLanguage) {
    let ret = "";

    const formData = new FormData();
    formData.append("sourceText", sourceText);
    formData.append("originLanguage", originLanguage);
    formData.append("targetLanguage", targetLanguage);


    await axios.get("/translate", {
        params: {
            sourceText: sourceText,
            originLanguage: originLanguage,
            targetLanguage: targetLanguage
        }
    })
        .then(res => {
            console.log(res.data);
            ret = res.data.data;
        })

    return ret;
}



function Translate(){

    // const [siteStatus, setSiteStatus] = useState({
    //     userSum: 0,
    //     iScholarSum: 0,
    //     scholarSum: 0,
    //     fieldSum: 0,
    //     paperSum: 0,
    //     insSum: 0
    // });
    //
    // const getSiteStatus = async () => {
    //     let ret = await handleSiteStatus();
    //     setSiteStatus(ret);
    // }
    //
    // useEffect(() => {
    //     window.addEventListener('load', getSiteStatus)
    //     return () => {
    //         window.removeEventListener('load', getSiteStatus)
    //     }
    // }, [siteStatus])

    const [originLanguage, setOriginLanguage] = useState("cn");
    const [targetLanguage, setTargetLanguage] = useState("en");
    const [sourceText, setSourceText] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    const translateText = async e => {
        e.preventDefault();
        let result = await handleTranslate(sourceText, originLanguage, targetLanguage);
        setTranslatedText(result);
    }





    return (
        // <Box>
        //     <Header isLanding={false} textColor={'black'} />
        //     <Box w={'80vw'} ml={'10vw'} mr={'10vw'} mt={'50px'}>
        //         <Text fontSize={'28px'} textAlign={'center'}>
        //             翻译
        //         </Text>

        //         <Flex
        //             w={'80vw'}
        //             ml={'10vw'}
        //             mr={'10vw'}
        //             alignItems={'center'}
        //             justifyContent={'space-between'}
        //         >
                    <Box>
                        <Select
                            placeholder='请选择源语言'
                            value={originLanguage}
                            onChange={e => setOriginLanguage(e.target.value)}
                        >
                            <option value='cn' selected={true}>简体中文</option>
                            <option value='en'>英语</option>
                            <option value='fr'>法语</option>
                            <option value='ja'>日语</option>
                        </Select>
                        <Select
                            placeholder='请选择源语言'
                            value={targetLanguage}
                            onChange={e => setTargetLanguage(e.target.value)}
                        >
                            <option value='cn'>简体中文</option>
                            <option value='en' selected={true}>英语</option>
                            <option value='fr'>法语</option>
                            <option value='ja'>日语</option>
                        </Select>
                        <Textarea placeholder={"输入希望翻译的文字……"}
                                  value={sourceText} onChange={e => setSourceText(e.target.value)}/>
                        <Button onClick={translateText}>
                            测试
                        </Button>
                        <Textarea placeholder={"翻译结果"}
                                  value={translatedText}/>
                    </Box>
        //             <Box>

        //             </Box>
        //         </Flex>
        //     </Box>
        // </Box>
    )
}

export default Translate;
