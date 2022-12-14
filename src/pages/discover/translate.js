import {Box, Button, Flex, Select, Text, Textarea, IconButton} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Row,Col } from 'antd'
import {SwapOutlined} from '@ant-design/icons'
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


    await axios.post("/translate", formData
    )
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
        // e.preventDefault();
        let result = await handleTranslate(sourceText, originLanguage, targetLanguage);
        setTranslatedText(result);
    }


    function changeContent(){
        var $textarea = document.getElementsByClassName('content');
        var $pre = document.getElementsByClassName('pre');
        $pre[0].innerHTML = $textarea[0].value;
    }

    return (
            <Box>
                <Row>
                    <Col span='8'>
                        <Select
                            value={originLanguage}
                            onChange={e => setOriginLanguage(e.target.value)}
                        >
                            <option value='cn' selected={true}>简体中文</option>
                            <option value='en'>英语</option>
                            <option value='fr'>法语</option>
                            <option value='ja'>日语</option>
                        </Select>
                    </Col>
                    <Col span='3' >
                        <IconButton aria-label='Search database' icon={<SwapOutlined />} ml='20px'
                            onClick={()=>{
                                let i = originLanguage;
                                setOriginLanguage(targetLanguage)
                                setTargetLanguage(i)
                               }}
                        />
                    </Col>
                    <Col span='8'>
                        <Select
                            value={targetLanguage}
                            onChange={e => setTargetLanguage(e.target.value)}
                        >
                            <option value='cn'>简体中文</option>
                            <option value='en' selected={true}>英语</option>
                            <option value='fr'>法语</option>
                            <option value='ja'>日语</option>
                        </Select>
                    </Col>
                </Row>

                <Textarea  mt='30px'
                        placeholder={"输入希望翻译的文字, 敲下回车……"}
                        value={sourceText}
                        onInput={e => {setSourceText(e.target.value); }}
                        onKeyPress={(value) => {
                            if(value.key === "Enter") {
                                translateText()
                            }
                            }}
                        />
                <Button onClick={translateText} mt='20px' colorScheme='blue'>
                    翻译
                </Button>
                <Textarea placeholder={"翻译结果"} mt='30px'
                            value={translatedText}/>
            </Box>
    )
}

export default Translate;
