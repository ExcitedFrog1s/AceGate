import { Button } from 'antd';
import Item from '../Item';
import React, { Component } from 'react'
import Interest from '../Interest';

export default class Edit
 extends Component {
  render() {
    const {accountinfs} = this.props
    const {interestwords} = this.props
    return (
        <div>
        <div className="informationframe">
          <h2 className="frametitle">账户信息</h2>
          {
            accountinfs.map( inf =>{
              return<Item key={inf.id} {...inf}/>
            })
          }
        </div>
        <div className="informationframe">
          <h2 className="frametitle">个人信息</h2>
          <div className="list_container">
            <div className="information_name">
              <span>真实姓名：</span>
            </div>
            <div className="infinput">
              <input className="input1" type="text" placeholder="请输入真实姓名"/>
            </div>
          </div>
          <div className="list_container">
            <div className="information_name">
              <span>联系电话：</span>
            </div>
            <div className="infinput">
              <input className="input1" type="text" placeholder="请输入联系电话"/>
            </div>
          </div>
          <div className="list_container">
            <div className="information_name">
              <b style={{color: 'rgb(215, 38, 31)'}}>* </b>
              <span>E-mail：</span>
            </div>
            <div className="infinput">
              <input className="input1" type="text" placeholder="请输入E-mail"/>
            </div>
          </div>
          <div className="list_container">
            <div className="information_name">
              <span>研究领域：</span>
            </div>
            <div className="infinput">
              <input className="input1" type="text" placeholder="请输入研究领域,点击按钮可完成添加"/>
              <Button className="clickconfirm"> √ </Button>
            </div>
          </div>
          <div className="list_container">
            <div className="information_name">
              <span>我的兴趣词：</span>
            </div>
            <div className="infinput">
              <input className="input1" type="text" placeholder="请输入兴趣词，点击按钮可完成添加"/>
              <Button className="clickconfirm"> √ </Button>
            </div>
            <div className="option">
            <div className="optiontitle">
                <p>推荐：（最多选择五个）</p>
                {
                  interestwords.map( inf =>{
                    return<Interest key={inf.id} {...inf}/>
                     })
                }
            </div>
          </div>
          <Button className="button1">完成</Button>
          <Button className="button2">取消</Button>
          </div>
        </div>
      </div>
    )
  }
}
