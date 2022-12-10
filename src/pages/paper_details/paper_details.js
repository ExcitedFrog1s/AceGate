/**
* @author AboveParadise 2022/11/11
*/
import Abstract from "./paper_abstract";
import Data from "./paper_data";
import Op from "./paper_op"
import Reference from "./paper_reference";
import moment, {parse} from "moment";
import {Box, HStack, Link, Spinner, Tag, TagLabel, TagLeftIcon, Text} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import * as React from "react";
import axios from "axios";
import {None} from "framer-motion";
import {Spin} from "antd";
import "./test.css"
import {useLocation, useNavigate} from "react-router-dom";

function PaperDetails() {
    const property = {
        title: "独白与对话:马克思主义中国化的方法论思考",
        author: ["Maple826"],
        keywords: [],
        abstract: "MG 是面向团队的专业 UI/UX 设计工具。多人同时编辑、随时在线评审、设计一键交付，让想法更快实现",
        isstarred:true,
    }
    let location = useLocation()
    let params = new URLSearchParams(location.search)
    let navigate = useNavigate()
    const [infos,setInfos] = React.useState()
    const [isLoading, setLoading] = React.useState(true)
    let UID = window.localStorage.getItem('userToken')
    // console.log(getPID())
    let PID
    if(params.has('PID')) {
        PID = params.get('PID')
    }
    else {
        PID = 0
    }


    params.set('PID',PID)
    // navigate('/paperDetails?' + params.toString())

    React.useEffect( () => {
        let body = {
            PID:PID
        }
        console.log(body)
        const formData = new FormData()
        formData.append('PID', PID)
        // console.log(formData)
        axios.post("https://mock.apifox.cn/m1/1955876-0-default/paperDetails?apifoxApiId=53123156", formData)
            .then(function (res){
                setInfos(res.data)
                setLoading(false)
            })
    },[])
    // console.log(infos["Pname"])
    if(isLoading) {
        return (
            <Spinner
                ml={'45%'}
                mt={'25%'}
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        )
    }
    // console.log(infos)
    return(
        <Box>
            <Info infos={infos}/>
            <Abstract ab={infos.Pabstract} kw={infos.Pconcepts}/>
            <Data pid={PID}/>
            <Op  pid={PID}/>
            <Reference refs={infos.Preferences} rels={infos.Prelated} />
        </Box>
    )
}
function Authors(prop){
    const property = {
        authors: ["Maple826","AboveParadise","euphoria"],
    }
    console.log(prop)
    return (
        prop.Pauthor.map((value, key) => {
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
                    {prop.infos.P_Vname}
                </Text>
            </HStack>

            <Authors Pauthor={prop.infos.Pauthor}/>

        </Box>
    )
}


export default PaperDetails;
