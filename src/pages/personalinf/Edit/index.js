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
    'test'
  ],
  interests:[
    'tst'
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


  changeInfo = () =>{
    axios({
      method: 'POST',
      url: 'https://mock.apifox.cn/m1/1955876-0-default/personInfo/edit',
      data:{
        Rname:'hh',
        Rcontact: '1',
        Rinstitute: '2',
        Uemail: '3',
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
        <Form>
          <div className="informationframe">
            <h2 className="frametitle">个人信息</h2>
            {scholar
            ?  <div>
                  <div className="list_container">
                    <div className="information_name">
                    </div>
                    <div className="infinput">
                      <Form.Item
                          name={['user', 'search-area']}
                          label= {<span>真实姓名</span>}
                          rules={[
                              {
                                  required: false,
                              },
                          ]}
                      >
                          <Input maxLength="15" className="input1" type="text" placeholder="请输入真实姓名"/>
                      </Form.Item>
                    </div>
                  </div>
                  <div className="list_container">
                    <div className="information_name">
                    </div>
                    <div className="infinput">
                      <Form.Item
                          name={['user', 'search-area']}
                          label= {<span>联系电话</span>}
                          rules={[
                              {
                                  required: false,
                              },
                          ]}
                      >
                          <Input maxLength="20" className="input1" type="text" placeholder="请输入联系电话"/>
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
                          <Input maxLength="20" className="input1" type="text" placeholder="请输入工作单位"/>
                      </Form.Item>
                    </div>
                  </div>
                </div>
            :  <div/>
            }
            <div className="list_container">
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
                <Input maxLength="20" className="input1" type="text" placeholder="请输入E-mail"/>
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
                >
                      <Input maxLength="15" ref={c => this.field = c} className="input1" type="text" placeholder="请输入研究领域，点击按钮可完成添加"/>
                </Form.Item>
                <Button className="clickconfirm" onClick={this.addfield}> √ </Button>
              </div>
              <div className='select_wrap'>
              <div>hello</div>
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
                <input maxLength="15" ref={c => this.interest = c} className="input1" type="text" placeholder="请输入兴趣词，点击按钮可完成添加"/>
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
