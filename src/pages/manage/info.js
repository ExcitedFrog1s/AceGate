/**
 * 后台管理/平台概况
 */
import './info.css';
import { Avatar } from '@chakra-ui/react'
import { Card, Row, Col } from 'antd';
import * as echarts from 'echarts'
import { Component, useEffect, useState } from 'react';
import { TeamOutlined, RiseOutlined, BookOutlined, HomeOutlined, PieChartOutlined, VerifiedOutlined } from '@ant-design/icons'
import axios from 'axios';
const { Meta } = Card;

function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
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
var myChart1;
class Cards extends Component{
    render(){
        return (
            <Card style={{width: 330}} className={this.props.class}>
            <Meta 
                avatar={<Avatar size="md" bg={this.props.color} icon={this.props.icon}/>}
                title={this.props.title}
                description={this.props.num && separator(this.props.num)}
                />
            </Card>
        )
    }

}
function Info(){
    const [num, setNum] = useState({});
    
    useEffect(() => {

    const makeMyChart1 = ()=>{
        myChart1 = echarts.init(document.getElementById('chart1'));
        // 绘制图表
        myChart1.setOption(option);
    }
    makeMyChart1();

    const getNum = ()=>{
        axios({
            method: "post",
            url:"https://mock.apifox.cn/m1/1955876-0-default/manage/info"
          })
          .then(res => {
              console.log(res.data)
              setNum(res.data)
            }
          )
    }
    getNum();
   }, []);
    return(
        <div className='info'>
            <Row gutter={15} wrap={true}>
                <Col span={8}>
                    <Cards title="注册用户数量" color="#422AFB" 
                    num={num.userSum} icon={<TeamOutlined/>} class="user"/>
                </Col>
                <Col span={8}>
                    <Cards title="学者总数" color="#56C3FF" 
                    num={num.scholarSum} icon={<RiseOutlined />} class="sch"/>
                </Col>
                <Col span={8}>
                    <Cards title="文献总数" color="#01B574" 
                    num={num.paperSum} icon={<BookOutlined />} class="paper"/>
                </Col>
            </Row>
            <Row gutter={15} wrap={true}>
                <Col span={8}>
                    <Cards title="领域总数" color="#805AD5" 
                    num={num.fieldSum} icon={<PieChartOutlined />} class="field"/>
                </Col>
                <Col span={8}>
                    <Cards title="已入驻学者数" color="#00B5D8" 
                    num={num.iScholarSum} icon={<VerifiedOutlined />} class="ident"/>
                </Col>
                <Col span={8}>
                    <Cards title="机构总数" color="#319795" 
                    num={num.insSum} icon={<HomeOutlined/>} class="search"/>
                </Col>
            </Row>
            <Row gutter={0} style={{marginTop: 35}}>
                <Col span={14}><Card id="chart1" style={{paddingTop:35}}> </Card></Col>
                <Col span={10}><img src={require('../../assets/manageinfo.png')}
                style={{width:400, height:330}}></img></Col>
            </Row>
            
        </div>
    )
}

export default Info;