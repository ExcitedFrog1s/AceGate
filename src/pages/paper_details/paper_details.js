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
import { Row, Col, Layout} from "antd";
import "./test.css"
import {useLocation, useNavigate} from "react-router-dom";
import MyHeader from "../../components/header/header";


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
        <Layout>
            <MyHeader></MyHeader>
            <div className="paperdetail">
                <Info infos={infos} PID={PID}/>
                <Row gutter={30}>
                    <Col span={15}>
                        <Row>
                        <Abstract ab={infos.pabstract} kw={infos.Pconcepts}/>
                        </Row>
                        <Row style={{marginTop:40}}>
                            <Reference refs={infos.Preferences} rels={infos.Prelateds} pid={PID}
                            reflink={infos.preferences} rellink={infos.prelated}/>
                        </Row>
                    </Col>
                    <Col span={9}>
                        <Data pid={PID} fields={infos.pconcepts}/>
                    </Col>
                </Row>
                
                
                
                
                
            </div>
        </Layout>
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
                    <Link key={key} fontSize={15} fontWeight={550}
                          textDecoration={'none'} className="ft"
                          onClick={()=>handleClick(key)}
                          color={'frog.500'}
                          mr={7}
                    >
                        {value.rname}
                    </Link>
                );
            }

        })
        }
        {
        prop.pauthor !== undefined &&
        prop.pauthor.map((value, key) => {
                if(cur_num < 10){
                    if(key < 10 - cur_num){
                        return (
                            <Text key={key} fontSize={15} fontWeight={550}
                                  mr={7}
                                  color={'#4A5568'}
                                  style={{display:'inline'}}
                            >
                                {value}
                            </Text>
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
        <Box width={'100%'} borderWidth={'5'} borderRadius={20} borderStyle={'solid'}
                boxShadow={'4px 4px 15px 0 rgba(0,0,0,0.1)'}
                bg={'linear-gradient(360deg,rgba(255,255,255,1.0), rgba(255,255,255,0.2))'}
                paddingTop={10}  paddingLeft={10} paddingRight={10} mb={10}>
                    
            <Box>
            <Text fontSize={30} fontWeight="bold" >
                {prop.infos.pname}
            </Text>
            </Box>
            <Row>
            <Col span={20}>
            <HStack>
                <Text mt={3} mb={3} mr={5} fontSize={17} color="#8e9aaf">
                    {moment(prop.infos.pdate).format("YYYY-MM-DD")}
                </Text>
                <Link onClick={handleClick}>
                <Text fontSize={17} as="em" fontWeight="bold" color="frog.500">
                    {prop.infos.p_Vname}
                </Text>
                </Link>
            </HStack>
            <Authors Pauthor={prop.infos.Pauthor} pauthor={prop.infos.pauthorname}/>
            <Row>
                <Op  pid={prop.PID} url={prop.infos.p_Vurl}/>
            </Row>
            </Col>
            <Col span={4}>
                <img src={require("../../assets/paper.png")}></img>
            </Col>
            </Row>
            
        </Box>
    )
}


export default PaperDetails;
