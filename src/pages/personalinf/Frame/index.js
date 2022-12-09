//by wgx
import { Button } from 'antd';
import {ConfigProvider} from 'antd';
import 'antd/dist/antd.variable.min.css';
import Item from '../Item';
import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import '../index.css';
import {FormOutlined} from '@ant-design/icons';

ConfigProvider.config({
  theme: {
      primaryColor: '#3a3af1',
      successColor: '#50af78',
  },
});

export default class Frame extends Component {

  render() {
    const {accountinfs} = this.props
    const {personalinfs} = this.props
    const {scholar} = this.props
    return (
      <div>
        <div className="informationframe">
          <h2 className="frametitle">账户信息</h2>
          {
            accountinfs.map( inf =>{
              if(inf.id !== "002" || scholar){
                return<Item key={inf.id} {...inf}/>
              }
            })
          }
        </div>
        <div className="informationframe">
          <h2 className="frametitle">个人信息</h2>
          {
            personalinfs.map( inf =>{
              if((inf.id !== "003" && inf.id !== "004" && inf.id !== "005") || scholar){
                return<Item key={inf.id} {...inf}/>
              }
            })
          }
          <Link to="/personInfo/edit">
            <Button className="button1" 
            type="primary"
            icon={<FormOutlined />}
            size="middle"
            shape={"round"}
            style={{
                margin: '25px 40px 16px 260px',
                // backgroundColor: '#859dda',
                border: 'none',
      
                boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.3)',
            }}
            >编辑
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}
