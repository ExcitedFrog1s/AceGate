import "./institute.css"
import { FaQuoteLeft } from "react-icons/fa";
import { IoSchoolSharp, IoNewspaperSharp } from "react-icons/io5"
import List from './ScholarList'
import { BankOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts'
import { Card, Layout, Row, Col, Avatar, Button, Space, Table, Input } from 'antd';
import axios from "axios";
import { useLocation } from "react-router-dom";
const { Header, Content } = Layout;
// var insdata = {
//     Iname: "Georgia Institute of Technology",
//     Icountry: "None",
//     Itype: "institute",
//     Iimage: "https://www.acemap.info/api/v2/img/affiliation/2102344316.jpg",
//     Iacronyms: "GIN",
//     Iworksnum: 123,
//     Icitednum: 1346,
//     Ichinesename: "佐治亚理工学院",
//     Ialternames: "佐治亚",
//     IassociateIns: [],
//     Iresearchers: [],
//     Ischolars: 48,
//     Ihomepage: "https://www.gatech.edu/"

// }



function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}



function Icard(){
    const [insdata, setInsdata] = useState({});
    let location = useLocation()
    let params = new URLSearchParams(location.search)
    console.log(params)
    var IID;
    if(params.has('IID')){
        IID = params.get('IID')
    }
    console.log('IID:' + IID)
    const getData = ()=>{
        axios({
            method: "post",
            url:"https://mock.apifox.cn/m1/1955876-0-default/institute/info",
            data: {
                IID: IID
            }
          })
          .then(res => {
              console.log(res.data)
              setInsdata(res.data)
            }
          )
    }
    useEffect(() =>{
        getData()
      }, [])
    function info(){
        var flag = 0;
        var strs = [];
        var str = insdata.Iname + (insdata.Iacronyms ? (" (" + insdata.Iacronyms + ")") : "")
        if(insdata.Ichinesename){
            strs.push("中文名为" + insdata.Ichinesename)
            flag += 1;
        }
            
        if(insdata.Ialternames){
            strs.push("别名" + insdata.Ialternames )
            flag += 1;
        }
        if(insdata.Icountry)
            strs.push("机构所属国家为" + insdata.Icountry)
        if(insdata.Ischolars)
            strs.push("机构共有学者 " + insdata.Ischolars + " 位")
        if(insdata.Iworksnum)
            strs.push("机构下学者已发表论文 " + insdata.Iworksnum + " 篇")
        if(insdata.Icitednum)
            strs.push("目前机构下论文已被引 " + insdata.Icitednum + " 次")
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
                    {insdata.Iimage && <Avatar size={120} src={insdata.Iimage}></Avatar>}
                    {!insdata.Iimage && <Avatar size={120} icon={<BankOutlined />} style={{backgroundColor: '#3a3af1',}}></Avatar>}
                </Col>
                <Col span={20} style={{paddingTop: 20}}>
                    <div className="title">{insdata.Iname + (insdata.Iacronyms ? (" (" + insdata.Iacronyms + ")") : "")}</div>
                    {insdata.Ichinesename && <div className="title">{insdata.Ichinesename}</div>}
                    <div className="insinfo">
                        {info()}
                    </div>
                    <Button type="primary" style={{marginTop:20}}>机构主页</Button>
                </Col>
            </Row>
        </Card>
        </div>
        </Col>
        <Col span={7}>
        <div className="scard">
            <Card>
                <ItemScard icon={<IoSchoolSharp className="icon1"/>} title="学者总数" num={insdata.IschNum}></ItemScard>
                <ItemScard icon={<IoNewspaperSharp className="icon1"/>} title="论文总数" num={insdata.Iworksnum}></ItemScard>
                <ItemScard icon={<FaQuoteLeft className="icon1"/>} title="被引次数" num={insdata.Icitednum}></ItemScard>
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

var option = {
    title: {
        text: '平台访问热度'
    },
    tooltip: {},
    xAxis: {
      data: ['A', 'B', 'C', 'D', 'E']
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 23, 19],
        type: 'line',
        smooth: true
      }
    ]
  };

var myChart1, myChart2, myChart3;
function Institute(){
    
    useEffect(() => {
        var chartDom1 = document.getElementById('chart1');
        myChart1 = echarts.getInstanceByDom(chartDom1);
        if(myChart1){
            myChart1.dispose();
        }
        myChart1 = echarts.init(document.getElementById('chart1'));
    // 绘制图表
        myChart1.setOption(option);

        var chartDom2 = document.getElementById('chart2');
        myChart2 = echarts.getInstanceByDom(chartDom2);
        if(myChart2){
            myChart2.dispose();
        }
        myChart2 = echarts.init(document.getElementById('chart2'));
    // 绘制图表
        myChart2.setOption(option);

        var chartDom3 = document.getElementById('chart3');
        myChart3 = echarts.getInstanceByDom(chartDom3);
        if(myChart3){
            myChart3.dispose();
        }
        myChart3 = echarts.init(document.getElementById('chart3'));
    // 绘制图表
        myChart3.setOption(option);
   });

    return (
        <Layout>
            <Header style={{height:60}}></Header>
            <Content>
                <div className="institute">
                    <Icard></Icard>
                    <Row gutter={24} style={{marginTop:30}}>
                        <Col span={8}>
                            <Card> 
                                <div id="chart1" style={{height:300, width:350}}></div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card> 
                                <div id="chart2" style={{height:300, width:350}}></div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card> 
                                <div id="chart3" style={{height:300, width:350}}></div>
                            </Card>
                        </Col>
                    </Row>
                    <List></List>
                </div>
            </Content>
        </Layout>
    )
}



export default Institute;