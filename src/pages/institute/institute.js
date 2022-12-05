import "./institute.css"
import { FaQuoteLeft } from "react-icons/fa";
import { IoSchoolSharp, IoNewspaperSharp } from "react-icons/io5"
import List from './ScholarList'
import { BankOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import * as echarts from 'echarts'
import { Card, Layout, Row, Col, Avatar, Button, Space, Table, Input } from 'antd';

const { Header, Content } = Layout;

var insdata = {
    Iname: "Georgia Institute of Technology",
    Icountry: "None",
    Itype: "institute",
    Iimage: "https://www.acemap.info/api/v2/img/affiliation/2102344316.jpg",
    Iacronyms: "GIN",
    Iworksnum: 123,
    Icitednum: 1346,
    Ichinesename: "佐治亚理工学院",
    Ialternames: "佐治亚",
    IassociateIns: [],
    Iresearchers: [],
    Ischolars: 48,
    Ihomepage: "https://www.gatech.edu/"

}



function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

function info(){
    var str = insdata.Iname + (insdata.Iacronyms ? (" (" + insdata.Iacronyms + ")") : "")
    if(insdata.Ichinesename)
        str += ("，中文名为" + insdata.Ichinesename)
    if(insdata.Ialternames)
        str += ("，别名" + insdata.Ialternames )
    if(insdata.Icountry)
        str += ("，机构所属国家为" + insdata.Icountry)
    str += ". "
    if(insdata.Ischolars)
        str += ("机构共有学者 " + insdata.Ischolars + " 位")
    if(insdata.Iworksnum)
        str += ("机构下学者已发表论文 " + insdata.Iworksnum + " 篇，")
    if(insdata.Icitednum)
        str += ("目前机构下论文已被引 " + insdata.Icitednum + " 次。")
    return str
}

function Icard(){
    return (
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
    )
}

function ItemScard(props){
    return (
        <div className="scardInfo">
            {props.icon}
            <div className="title1">{props.title}</div>
            <div className="num1">{separator(props.num)}</div>
        </div>
    )
}
function Scard(){
    return (
        <div className="scard">
            <Card>
                <ItemScard icon={<IoSchoolSharp className="icon1"/>} title="学者总数" num={insdata.Ischolars}></ItemScard>
                <ItemScard icon={<IoNewspaperSharp className="icon1"/>} title="论文总数" num={insdata.Iworksnum}></ItemScard>
                <ItemScard icon={<FaQuoteLeft className="icon1"/>} title="被引次数" num={insdata.Icitednum}></ItemScard>
            </Card>
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
                    <Row gutter={20}>
                        <Col span={17}>
                            <Icard></Icard>
                        </Col>
                        <Col span={7}>
                            <Scard></Scard>
                        </Col>
                    </Row>
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