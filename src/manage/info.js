/**
 * 后台管理/平台概况
 */
import './info.css';
import { Avatar } from '@chakra-ui/react'
import { Card, Row, Col } from 'antd';
import * as echarts from 'echarts'
import { useEffect } from 'react';
import { TeamOutlined, RiseOutlined, BookOutlined, SearchOutlined, PieChartOutlined, VerifiedOutlined } from '@ant-design/icons'

const num = {
    users: 1000,
    scholars: 12213312,
    papers: 1234567,
    indentified: 8
}

const { Meta } = Card;

function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

function CardUser(){
    return (
        <div className='user'>
            <Card style={{width: 330}}>
            <Meta
                avatar={<Avatar size="md" bg='#422AFB' icon={<TeamOutlined/>}/>}
                title="注册用户数量"
                description={separator(num.users)}
                />
            </Card>
        </div>
    )
}

function CardScholar(){
    return (
        <div className='sch'>
            <Card style={{width: 330}}>
            <Meta
                avatar={<Avatar size="md" bg='#56C3FF' icon={<RiseOutlined />}/>}
                title="学者总数"
                description={separator(num.scholars)}
                />
            </Card>
        </div>
    )
}

function CardPaper(){
    return (
        <div className='paper'>
            <Card style={{width: 330}}>
            <Meta
                avatar={<Avatar size="md" bg='#01B574' icon={<BookOutlined />}/>}
                title="文献总数"
                description={separator(num.papers)}
                />
            </Card>
        </div>
    )
}

function CardIdent(){
    return (
        <div className='ident'>
            <Card style={{width: 330}}>
            <Meta
                avatar={<Avatar size="md" bg='#805AD5' icon={<VerifiedOutlined />}/>}
                title="已入驻学者数"
                description={separator(num.indentified)}
                />
            </Card>
        </div>
    )
}

function CardField(){
    return (
        <div className='field'>
            <Card style={{width: 330}}>
            <Meta
                avatar={<Avatar size="md" bg='#00B5D8' icon={<PieChartOutlined />}/>}
                title="文献涉及领域数"
                description={separator(num.indentified)}
                />
            </Card>
        </div>
    )
}

function CardSearch(){
    return (
        <div className='search'>
            <Card style={{width: 330}}>
            <Meta
                avatar={<Avatar size="md" bg='#319795' icon={<SearchOutlined />}/>}
                title="用户搜索量"
                description={separator(num.indentified)}
                />
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
var myChart1;
function Info(){
   useEffect(() => {
        myChart1 = echarts.init(document.getElementById('chart1'));
    // 绘制图表
        myChart1.setOption(option);
        
   });
    return(
        <div className='info'>
            <Row gutter={15} wrap={true}>
                <Col span={8}><CardUser /></Col>
                <Col span={8}><CardSearch /></Col>
                <Col span={8}><CardScholar /></Col>
            </Row>
            <Row gutter={15} wrap={true}>
                <Col span={8}><CardIdent /></Col>
                <Col span={8}><CardPaper /></Col>
                <Col span={8}><CardField /></Col>
            </Row>
            <Card id="chart1" style={{paddingTop:35}}> </Card>
        </div>
    )
}

export default Info;