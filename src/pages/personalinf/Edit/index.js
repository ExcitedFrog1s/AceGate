//by wgx
import { Button, Form, Input } from 'antd';
import {nanoid} from 'nanoid';
import Item from '../Item';
import Select from '../Select'
import {Link} from 'react-router-dom';
import React, { Component } from 'react'
import Interest from '../Interest';
import {RollbackOutlined, CheckCircleOutlined} from '@ant-design/icons';
import axios from 'axios';

export default class Edit extends Component {
  state = {fields:[
  ],
  interests:[
  ],
  }

  

  addfield = ()=>{
    const field = this.field;
    const {fields} = this.state;
    if (field.input.value.trim() === ''){
      alert('输入不能为空');
      return;
    }
    const newfield = {id:nanoid(),value:field.input.value};
    const newfields = [...fields,newfield];
    this.setState({fields:newfields});
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
    if (interest.input.value.trim() === ''){
      alert('输入不能为空')
      return
    }
    const newinterest = {id:nanoid(),value:interest.input.value}
    const newinterests = [...interests,newinterest]
    this.setState({interests:newinterests})
    interest.input.value = ''
  }

  selectinterest = (inter)=>{
    const {interests} = this.state
    const newinterest = {id:nanoid(),value:inter}
    const newinterests = [...interests,newinterest]
    this.setState({interests:newinterests})
  }


  changeInfo = () =>{
    const {name} = this.name;
    const {contact} = this.contact;
    const {institute} = this.institute;
    const {email} = this.email;
    axios({
      method: 'POST',
      url: 'https://mock.apifox.cn/m1/1955876-0-default/personInfo/edit',
      data:{
        Rname: {name},
        Rcontact: {contact},
        Rinstitute: {institute},
        Uemail: {email},
        Ufield: ['1', '2', '3'],
        Uinterest: ['1', '2', '3']
      }
    }).then(response =>{
      console.log(response)
    });
  }
  
  render() {
    const saveStyle = {
      backgroundColor: '#50af78',
      border: 'none',
      boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.2)',
    }

    const validateMessages = {
      required: '${label}为必填项',
      types: {
          email: '请输入有效的${label}!',
          number: '${label} is not a valid number!',
      },
      number: {
          range: '${label} must be between ${min} and ${max}',
      },
    };

    const {accountinfs} = this.props
    const {interestwords} = this.props
    const {scholar} = this.props
    const {fields} = this.state
    const {interests} = this.state
    let field;
    let interest;
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
        <Form >
          <div className="informationframe">
            <h2 className="frametitle">个人信息</h2>
            {scholar
            ?  <div>
                  <div className="list_container">
                    <div className="information_name">
                    </div>
                    <div className="infinput">
                      <Form.Item
                          label= {<span>真实姓名</span>}
                          rules={[
                              {
                                  required: false,
                              },
                          ]}
                      >
                          <Input ref={c => this.name = c} maxLength="15" className="input1" type="text" placeholder="请输入真实姓名"/>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="list_container">
                    <div className="information_name">
                    </div>
                    <div className="infinput">
                      <Form.Item
                          label= {<span>联系电话</span>}
                          rules={[
                              {
                                  required: false,
                              },
                          ]}
                      >
                          <Input ref={c => this.contact = c} maxLength="20" className="input1" type="text" placeholder="请输入联系电话"/>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="list_container">
                    <div className="information_name">
                    </div>
                    <div className="infinput">
                     <Form.Item
                          label= { <span>工作单位</span>}
                          rules={[
                              {
                                  required: false,
                              },
                          ]}
                      >
                          <Input ref={c => this.institute = c} maxLength="20" className="input1" type="text" placeholder="请输入工作单位"/>
                      </Form.Item>
                    </div>
                  </div>
                </div>
            :  <div/>
            }
            <div className="list_container">
              <div className="information_name">
              </div>
              <div className="infinput">
              <Form.Item
                label={
                  <div>
                    <b style={{color: 'rgb(215, 38, 31)'}}>* </b>
                    <span>E-mail</span>
                  </div>
                }
                rules={[
                    {
                        type: 'email',
                        required: false,
                    },
                ]}
              >
                <Input maxLength="20" ref={c => this.email = c} className="input1" type="text" placeholder="请输入E-mail"/>
              </Form.Item>
                
              </div>
             
            </div>
            <div className="list_container">
              <div className="information_name">
              </div>
              <div className="infinput">
                <Form.Item
                    label= {<span>研究领域</span>}
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                    style={{
                     float: 'left'
                  }}
                >
                      <Input maxLength="15" ref={c => this.field = c} className="input1" type="text" placeholder="请输入研究领域，点击按钮可完成添加"/>
                </Form.Item>
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
              </div>
              <div className="infinput">
                <Form.Item
                  label= {<span>我的兴趣</span>}
                  rules={[
                      {
                          required: false,
                      },
                  ]}
                  style={{
                    float: 'left'
                 }}
                >
                     <Input maxLength="15" ref={c => this.interest = c} className="input1" type="text" placeholder="请输入兴趣词，点击按钮可完成添加"/>
                </Form.Item>
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
              <Button className="button1"
              type={"primary"}
              icon={<CheckCircleOutlined />}
              size="middle"
              shape={"round"}
              style={saveStyle}
              onClick={this.changeInfo}
              >完成</Button>
              <Button className="button2" 
              icon = {<RollbackOutlined />}
              type="primary"
              size="middle"
              shape={"round"}
              style={{
                  margin: '25px 40px 16px 30px',
                  border: 'none',
                  boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
              }}
              >取消</Button>
            </Link>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}
