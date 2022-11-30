//by wgx
import { Button } from 'antd';
import {nanoid} from 'nanoid';
import Item from '../Item';
import Select from '../Select'
import {Link} from 'react-router-dom';
import React, { Component } from 'react'
import Interest from '../Interest';

export default class Edit extends Component {
  state = {fields:[
  ],
  interests:[

  ],
  }

  addfield = ()=>{
    const field = this.field
    const {fields} = this.state
    if (field.value.trim() === ''){
      alert('输入不能为空')
      return
    }
    const newfield = {id:nanoid(),value:field.value}
    const newfields = [...fields,newfield]
    this.setState({fields:newfields})
    field.value = ''
  }

  deletefieldint = (id)=>{
    const {fields} = this.state
    const {interests} = this.state
    const newfields = fields.filter((field)=>{
      return field.id !==id
    })
    const newinterests = interests.filter((interest)=>{
      return interest.id !==id
    })
    this.setState({fields:newfields})
    this.setState({interests:newinterests})
  }

  addinterest = ()=>{
    const interest = this.interest
    const {interests} = this.state
    if (interest.value.trim() === ''){
      alert('输入不能为空')
      return
    }
    const newinterest = {id:nanoid(),value:interest.value}
    const newinterests = [...interests,newinterest]
    this.setState({interests:newinterests})
    interest.value = ''
  }

  selectinterest = (inter)=>{
    const {interests} = this.state
    const newinterest = {id:nanoid(),value:inter}
    const newinterests = [...interests,newinterest]
    this.setState({interests:newinterests})
  }
  
  render() {
    const {accountinfs} = this.props
    const {interestwords} = this.props
    const {scholar} = this.props
    const {fields} = this.state
    const {interests} = this.state
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
          {scholar
           ?  <div>
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
                    <span>工作单位：</span>
                  </div>
                  <div className="infinput">
                    <input className="input1" type="text" placeholder="请输入工作单位"/>
                  </div>
                </div>
              </div>
           :  <div/>
          }
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
              <input ref={c => this.field = c} className="input1" type="text" placeholder="请输入研究领域，点击按钮可完成添加"/>
              <Button className="clickconfirm" onClick={this.addfield}> √ </Button>
            </div>
            <div className='select_wrap'>
              {
                fields.map( inf =>{
                return<Select deletefieldint={this.deletefieldint} key={inf.id} {...inf}/>
               })
              }  
            </div>
          </div>
          <div className="list_container">
            <div className="information_name">
              <span>我的兴趣词：</span>
            </div>
            <div className="infinput">
              <input ref={c => this.interest = c} className="input1" type="text" placeholder="请输入兴趣词，点击按钮可完成添加"/>
              <Button className="clickconfirm" onClick={this.addinterest}> √ </Button>
            </div>
            <div className='select_wrap'>
              {
                interests.map( inf =>{
                return<Select deletefieldint={this.deletefieldint} key={inf.id} {...inf}/>
               })
              }  
            </div>
            <div className="option">
            <div className="optiontitle">
                <p>推荐：</p>
                {
                  interestwords.map( inf =>{
                    return<Interest addinterest={this.selectinterest} key={inf.id} {...inf}/>
                     })
                }
            </div>
          </div>
          <Link to="/personInfo">
            <Button className="button1">完成</Button>
            <Button className="button2">取消</Button>
          </Link>
          </div>
        </div>
      </div>
    )
  }
}
