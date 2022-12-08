/**
* @author AboveParadise 2022/11/11
*/
import Abstract from "./paper_abstract";
import Data from "./paper_data";
import Op from "./paper_op"
import Reference from "./paper_reference";
import moment from "moment";
import {Box, HStack, Link, Tag, TagLabel, TagLeftIcon, Text} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import * as React from "react";
import axios from "axios";
import {None} from "framer-motion";
import {Spin} from "antd";

function PaperDetails() {
    const property = {
        title: "独白与对话:马克思主义中国化的方法论思考",
        author: ["Maple826"],
        keywords: [],
        abstract: "MG 是面向团队的专业 UI/UX 设计工具。多人同时编辑、随时在线评审、设计一键交付，让想法更快实现",
        isstarred:true,
    }
    const [infos,setInfos] = React.useState()
    const [isLoading, setLoading] = React.useState(true)

    React.useEffect( () => {
        const formData = new FormData()
        formData.append('PID', "1")
        console.log(formData)
        axios.post("https://mock.apifox.cn/m1/1955876-0-default/paperDetails?apifoxApiId=53123156",formData)
            .then(function (res){
                setInfos(res.data)
                setLoading(false)
            })
    },[])
    // console.log(infos["Pname"])
    if(isLoading) {
        return (
            <Spin tip={"加载中"}/>
        )
    }
    console.log(infos)
    return(
        <Box>
            <Info infos={infos}/>
            <Abstract/>
            <Data/>
            <Op isstarred={property.isstarred}/>
            <Reference/>
        </Box>
    )
}
function Authors({prop}){
    const property = {
        authors: ["Maple826","AboveParadise","euphoria"],
    }
    // console.log(prop)
    return (
        property.authors.map((value, key) => {
            return (
                <Link key={key} href={'/'} fontSize={15}
                      textDecoration={'none'}
                      color={'#3311DB'}
                      mr={7}
                >
                    {value}
                </Link>
            );
        })

   )
}

function Info(prop){
    const property = {
        title: "独白与对话:马克思主义中国化的方法",
        source: "云南社会科学",
        date: moment("20070112").format('YYYY-MM-DD'),
        tags:['jdg', '马克思', 'lggggg'],
    }
    // const [p,setP] = React.useState()
    // const [title,setTitle] = React.useState()
    // const [date,setDate] = React.useState()
    // const [source,setSource] = React.useState()
    // console.log(prop.infos)
    // setP(prop.infos)
    // // setTitle(prop.infos.Pname)
    // // setDate(prop.infos.Pdate)
    // // setSource(prop.infos.P_Vname)
    // console.log(p)
    return(
        <Box ml={'3%'} mb={5}>
            <Box>
            <Text fontSize={30} fontFamily={'宋体'}>
                {prop.infos.Pname}
            </Text>
            </Box>
            <HStack>
                <Text mt={3} mb={3} mr={5} fontSize={17}  fontFamily={"Times New Roman"}>
                    {prop.infos.Pdate}
                </Text>
                <Text fontFamily={'宋体'} fontSize={17}>
                    {property.source}
                </Text>
            </HStack>

            <Authors prop={prop}/>

        </Box>
    )
}


export default PaperDetails;
