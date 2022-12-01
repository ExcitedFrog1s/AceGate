//by wgx
import { Button } from 'antd';
import Item from '../Item';
import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import '../index.css';

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
            <Button className="button1">编辑</Button>
          </Link>
        </div>
      </div>
    )
  }
}
