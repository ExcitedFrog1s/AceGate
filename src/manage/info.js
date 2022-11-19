/**
 * 后台管理/平台概况
 */
import './info.css';
import { Card, Form } from 'antd';
import * as echarts from 'echarts'
import { useEffect } from 'react';
const num = {
    users: 1000,
    scholars: 12213312,
    papers: 1234567,
    indentified: 8
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };


function CardInfo(){
    return (
        <div>
            <Card>
                <Form {...layout} labelAlign="left">
                    <Form.Item label="注册用户数量"><span className='inline'>{num.users}</span></Form.Item>
                    <Form.Item label="学者总数"><span className='inline'>{num.scholars}</span></Form.Item>
                    <Form.Item label="文献总数"><span className='inline'>{num.papers}</span></Form.Item>
                    <Form.Item label="已入驻学者数"><span className='inline'>{num.indentified}</span></Form.Item>
                </Form>
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
            <CardInfo></CardInfo>
            <div id="chart1"></div>
        </div>
    )
}

export default Info;