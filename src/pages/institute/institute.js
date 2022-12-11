import "./institute.css"
import { FaQuoteLeft } from "react-icons/fa";
import { IoSchoolSharp, IoNewspaperSharp } from "react-icons/io5"
import List from './ScholarList'
import { BankOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts'
import { Card, Layout, Row, Col, Avatar, Button, Space, Table, Input } from 'antd';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const { Header, Content } = Layout;


function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}



function Icard(){
    const navigate = useNavigate();
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
              console.log(res.data.data)
            }
          )
    }
    const handleHomepage = (url)=>{
        window.location.href=url
    }

    useEffect(() =>{
        getData()
      }, [])
    function info(){
        if(insdata.type != undefined){
            var flag = 0;
            var strs = [];
            var str = insdata.iname + (insdata.Iacronyms[0] ? (" (" + insdata.Iacronyms[0] + ")") : "")
            let j = insdata.ialtername.length
            if(j > 0){
                var altername = "别名" + insdata.ialtername[0];
                for(let k = 1; k <= j; k++){
                    altername += ", " + insdata.altername[k];
                    j++;
                }
                strs.push(altername)
                flag += 1;
            }

            if(insdata.ichinesename){
                strs.push("中文名为" + insdata.ichinesename)
                flag += 1;
            }
                
            
            if(insdata.icountry)
                strs.push("机构所属国家为" + insdata.icountry)
            if(insdata.Ischolars)
                strs.push("机构共有学者 " + insdata.Ischolars + " 位")
            if(insdata.iworksum)
                strs.push("机构下学者已发表论文 " + insdata.iworksum + " 篇")
            if(insdata.icitednum)
                strs.push("目前机构下论文已被引 " + insdata.icitednum + " 次")
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
        return ''
    }
    return (
        <Row gutter={20}>
        <Col span={17}>
        <div className="icard">
        <Card >
            <Row gutter={16}>
                <Col span={4}>
                    {insdata.iimage && <Avatar size={115} src={insdata.iimage} style={{marginTop:30}}></Avatar>}
                    {!insdata.iimage && <Avatar size={115} icon={<BankOutlined />} style={{backgroundColor: '#3a3af1',marginTop:30}}></Avatar>}
                </Col>
                <Col span={20} style={{paddingTop: 20}}>
                    <div className="title">{insdata.iname + (insdata.Iacronyms ? (" (" + insdata.Iacronyms + ")") : "")}</div>
                    {insdata.ichinesename && <div className="title">{insdata.ichinesename}</div>}
                    <div className="insinfo">
                        {info()}
                    </div>
                    <Button type="primary" style={{marginTop:20}}
                    onClick={()=>handleHomepage(insdata.ihomepage)}>机构主页</Button>
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