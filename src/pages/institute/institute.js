import Chart from 'react-apexcharts'
import "./institute.css"
import {Box, Link, Spinner} from '@chakra-ui/react'
import { FaQuoteLeft } from "react-icons/fa";
import { IoSchoolSharp, IoNewspaperSharp } from "react-icons/io5"
import List from './ScholarList'
import { BankOutlined, BankFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Heading, Text, Button } from '@chakra-ui/react'
import { Card, Layout, Row, Col, Avatar, Space, Table, Input } from 'antd';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import MyHeader from '../../components/header/header';
const { Header, Content } = Layout;

function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

function Icard(props){
    const [insdata, setInsdata] = useState({});
    
    const handleHomepage = (url)=>{
        window.open(url)
    }

    useEffect(() =>{
        setInsdata(props.insdata)
        // getData()
      }, [props])
    function info(){
        var flag = 0;
        var strs = [];
        var str = insdata.iname + (insdata.iacronyms ? (" (" + insdata.iacronyms[0] + ")") : "")
        if(insdata.ichinesename){
            strs.push("中文名为" + insdata.ichinesename)
            flag += 1;
        }
            
        if(insdata.ialtername){
            let j = insdata.ialtername.length;
            if(j > 0){
                let altername = "别名" + insdata.ialtername[0]
                let t = j > 5 ? 5 : j
                for(let k = 1; k < t; k++){
                    altername += ", " +  insdata.ialtername[k];
                }
                strs.push(altername);
                flag += 1;
            }
        }
        if(insdata.itype)
            strs.push("机构类型为" + insdata.itype)
        if(insdata.icountry)
            strs.push("机构所属国家为" + insdata.icountry)
        if(insdata.Ischolars)
            strs.push("机构共有学者 " + insdata.IschNum + " 位")
        if(insdata.iworksum)
            strs.push("机构下学者已发表论文 " + insdata.iworksum + " 篇")
        if(insdata.icitednum)
            strs.push("目前机构下论文已被引 " + insdata.icitednum + " 次")
        if(insdata.iconcept){
            let j = insdata.iconcept.length;
            if(j > 0){
                let concept = "机构论文高频关键词有" + insdata.iconcept[0];
                for(let k = 1; k < j; k++){
                    concept += ", " + insdata.iconcept[k];
                }
                concept += "等"
                strs.push(concept)
            }
        }
        for(var i in strs){
            if(i == flag){
                str += ".  "
            }
            else str += ', ';
            str += strs[i];
        }
        str += '. '
        return str
    }
    return (
        <Row gutter={20}>
        <Col span={17}>
        <div className="icard">
        <Card >
            <Row gutter={16}>
                <Col span={4}>
                    {insdata.iimage && <Avatar size={115} src={insdata.iimage} style={{marginTop:20}}></Avatar>}
                    {!insdata.iimage && <Avatar size={115} icon={<BankOutlined />} style={{backgroundColor: '#3a3af1',marginTop:20}}></Avatar>}
                </Col>
                <Col span={20}>
                    <Text className="title">{insdata.iname + (insdata.iacronyms ? (" (" + insdata.iacronyms[0] + ")") : "")}</Text>
                    {insdata.ichinesename && <Text className="title" >{insdata.ichinesename}</Text>}
                    <div className="insinfo">
                        {info()}
                    </div>
                    
                </Col>
            </Row>
        </Card>
        </div>
        </Col>
        <Col span={7}>
        <div className="scard">
            <Card>
                <ItemScard icon={<IoSchoolSharp className="icon1"/>} title="学者总数" num={insdata.IschNum}></ItemScard>
                <ItemScard icon={<IoNewspaperSharp className="icon1"/>} title="论文总数" num={insdata.iworksum}></ItemScard>
                <ItemScard icon={<FaQuoteLeft className="icon1"/>} title="被引次数" num={insdata.icitednum}></ItemScard>
                <Button colorScheme="frog" style={{marginTop:15,marginLeft:100}}
                    onClick={()=>handleHomepage(insdata.ihomepage)}>机构主页</Button>
            </Card>
        </div>
        </Col>
    </Row>
        
    )
}

function ItemScard(props){
    return (
        <div className="scardInfo">
            {props.icon}
            <div className="title1">{props.title}</div>
            <div className="num1">{props.num && separator(props.num)}</div>
        </div>
    )
}

function CoInstitute(props){
    const [coins, setCoins] = useState([]);

    const columns = [
        {
            title: '机构名称',
            key: 'action',
            render: (_, record)=>(
                <Link href={"/institute?IID=" + record.IID} isExternal fontWeight="bold" color="#4A5568">
                    {record.name}
                </Link>
            )
        },
        {
            title: '关系',
            key: 'relation',
            width: 80,
            render: (_, record)=>(
                <Text fontWeight="bold" color="#4A5568">
                    {record.relation}
                </Text>
            )
        }
    ]
    useEffect(()=>{
        let arr = []
        let j = props.coins ? props.coins.length : 0;
        for(let k = 0; k < j; k++){
            let a = {}
            a.IID = props.coins[k]
            a.relation = props.core[k]
            a.name = props.name[k]
            arr.push(a)
        }
        setCoins(arr)
    },[props])
    return (
        <Box boxShadow="4px 4px 15px 0 rgba(0,0,0,0.1)" rounded='md' backgroundColor="#ffffff"
        borderRadius='20px' 
        className='chart'>
            <Row>
                <BankFilled className='chart-icon'  />
                <Heading className='chart-head'>关联机构</Heading>
            </Row>
            <Table columns={columns} dataSource={coins} rowKey="IID" pagination={false}
            size="middle" showHeader={true} bordered={true} style={{marginTop:20}}
            scroll={{
                y: 200,
              }}>
            </Table>
        </Box>
    )
}

function AmoutChart(props) {
    React.useEffect(() => {
        setSeries([{data:props.count}])
    },[props])
    const [options, setOptions] = React.useState(
        {
            chart: {
                type: 'bar',
            },
            xaxis: {
                categories: [2018,2019,2020,2021,2022]
            },
            plotOptions: {
                bar: {
                  columnWidth: '40%',
                  borderRadius: 6
                },
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
                gradient: {
                    type: 'vertical', 
                    gradientToColors: ['#1b3bbb'], 
                    opacityFrom: 0.96, 
                    opacityTo: 0.2,
                    stops:[0,100]
                }
            },        
        }
    )
    const [series, setSeries] = React.useState(
        [{
        }]
    );
    return(
        <Box boxShadow="4px 4px 15px 0 rgba(0,0,0,0.1)" rounded='md' backgroundColor="#ffffff"
        borderRadius='20px' 
        className='chart'>
            <Row>
                {props.icon}
                
                <Heading className='chart-head'>{props.title}</Heading>
            </Row>
            <Chart options={options} series={series} type="bar" style={{marginTop:'30px'}}/>
        </Box>
    )
}    

function Concept(props){
    const [cons, setCons] = useState([]);

    const columns = [
        {
            title: '关键领域',
            key: 'concept',
            dataIndex: 'concept',
            render: (_, record)=>(
                <Text fontWeight="bold" color="#4A5568">
                    {record.concept}
                </Text>
            )
        },
    ]
    useEffect(()=>{
        let arr = []
        let j = props.concept ? props.concept.length : 0;
        for(let k = 0; k < j; k++){
            let a = {}
            a.id = k
            a.concept = props.concept[k]
            arr.push(a)
        }
        setCons(arr)
    },[props])
    return (
        <Box rounded='md' backgroundColor="#ffffff"
        borderRadius='20px' boxShadow="4px 4px 15px 0 rgba(0,0,0,0.1)"
        className='concept'>
            <Row>
                <BankFilled className='chart-icon'  />
                <Heading className='chart-head'>关键领域</Heading>
            </Row>
            <Table columns={columns} dataSource={cons} rowKey="id" pagination={false}
            size="middle" showHeader={false} bordered={true} style={{marginTop:30}}
            scroll={{
                y: 450,
              }}>
            </Table>
        </Box>
    )
}

function Institute(){
    const [insdata, setInsdata] = useState({})
    const [isLoading, setLoading] = React.useState(true)
    let location = useLocation()
    let params = new URLSearchParams(location.search)
    var IID;
    if(params.has('IID')){
        IID = params.get('IID')
    }
    console.log('IID:' + IID)
    const getData = ()=>{
        axios({
            method: "post",
            url:"/institute/info",
            data: {
                IID: IID
            },
            headers: {
                "Content-Type": "application/json",
            }
          })
          .then(res => {
              setInsdata(res.data.data)
              setLoading(false)
              console.log(res.data.data)
            }
          )
    }
    useEffect(() =>{
        getData()
      },[])
    if(isLoading) {
        return (
            <Spinner
                ml={'47%'}
                mt={'25%'}
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        )
    }


    return (
        <Layout>
            <MyHeader></MyHeader>
            <Content>
                <div className="institute">
                    <Icard insdata={insdata}></Icard>
                    <Row gutter={24} style={{marginTop:30}}>
                        <Col span={8}>
                            <AmoutChart count={insdata.icount} title="论文数量" icon={<IoNewspaperSharp className='chart-icon'  />}></AmoutChart>
                        </Col>
                        <Col span={8}>
                            <AmoutChart count={insdata.icited} title="被引数量" icon={<FaQuoteLeft className='chart-icon'  />}></AmoutChart>
                        </Col>
                        <Col span={8}>
                            <CoInstitute coins={insdata.iassociations} core={insdata.irelation} name={insdata.IassoNames}></CoInstitute>
                        </Col>
                    </Row>
                    <Row style={{marginTop:30}} gutter={20}>
                        <Col span={17}>
                            <List></List>
                        </Col>
                        <Col span={7}>
                            <Concept concept={insdata.iconcept}></Concept>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )
}



export default Institute;