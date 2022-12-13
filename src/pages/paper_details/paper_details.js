/**
* @author AboveParadise 2022/11/11
*/
import Abstract from "./paper_abstract";
import Data from "./paper_data";
import Op from "./paper_op"
import Reference from "./paper_reference";
import moment from "moment";
import {Box, HStack, Link, Spinner, Tag, TagLabel, TagLeftIcon, Text} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import * as React from "react";
import axios from "axios";
import {None} from "framer-motion";
import {Spin} from "antd";
import "./test.css"
import {useLocation, useNavigate} from "react-router-dom";

function PaperDetails() {
    axios.defaults.headers["Content-Type"] = 'application/json';
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

        const formData = new FormData()
        formData.append('PID', PID)
        // console.log(formData)

        axios.post("/paper/view", formData)

            .then(function (res){
                setInfos(res.data.data)
                setLoading(false)
                console.log(res.data.data)
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

    return(
        <Box>
            <Info infos={infos}/>
            <Abstract ab={infos.pabstract} kw={infos.Pconcepts}/>
            <Data pid={PID} fields={infos.pconcepts}/>
            <Op  pid={PID} url={infos.p_Vurl}/>
            <Reference refs={infos.Preferences} rels={infos.Prelateds} pid={PID}
                       reflink={infos.preferences} rellink={infos.prelated}/>
        </Box>
    )
}
function Authors(prop){
    const property = {
        authors: ["Maple826","AboveParadise","euphoria"],
    }

    const handleClick = (key) => {
        window.open('/scholarPortal?RID=' + prop.Pauthor[key].rid)
    }

    let cur_num = prop.Pauthor.length

    return (
        <>
            {
        prop.Pauthor.map((value, key) => {
            if(key < 10){
                return (
                    <Link key={key} fontSize={15}
                          textDecoration={'none'} className="ft"
                          onClick={()=>handleClick(key)}
                          color={'#3311DB'}
                          mr={7}
                    >
                        {value.rname}
                    </Link>
                );
            }

        })
        }
        {

        prop.pauthor.map((value, key) => {
                if(cur_num < 10){
                    if(key < 10 - cur_num){
                        return (
                            <Link key={key} fontSize={15}
                                  className="ft"
                                  mr={7}
                                  color={'#3311DB'}
                                  style={{textDecoration: 'none'}}
                            >
                                {value}
                            </Link>
                        );
                    }

                }

            })
        }
        </>


   )
}

function Info(prop){
    const property = {
        title: "独白与对话:马克思主义中国化的方法",
        source: "云南社会科学",
        date: moment("20070112").format('YYYY-MM-DD'),
        tags:['jdg', '马克思', 'lggggg'],
    }
    const handleClick = () => {
        window.open('/journal?VID=' + prop.infos.p_VID)
    }
    return(
        <Box ml={'3%'} mb={5} className="ft">
            <Box>
            <Text fontSize={30}>
                {prop.infos.pname}
            </Text>
            </Box>
            <HStack>
                <Text mt={3} mb={3} mr={5} fontSize={17}>
                    {moment(prop.infos.pdate).format("YYYY-MM-DD")}
                </Text>
                <Link onClick={handleClick}>
                <Text fontSize={17}>
                    {prop.infos.p_Vname}
                </Text>
                </Link>
            </HStack>

            <Authors Pauthor={prop.infos.Pauthor} pauthor={prop.infos.pauthorname}/>

        </Box>
    )
}


export default PaperDetails;
