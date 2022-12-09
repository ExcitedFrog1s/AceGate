// by wgx
import React, { Component } from 'react'
import Frame from '../Frame'
import Edit from '../Edit'
import { Route,Routes } from 'react-router-dom';
import '../index.css';
import axios from 'axios'


export default class Information extends Component {
    state = {accountinfs:[
        {id:'001',name:'用户ID：',value:'20231141'},
        {id:'002',name:'门户ID：',value:'11223344' }
      ],
      personalinfs:[
        {id:'003',name:'真实姓名：',value:'', },
        {id:'004',name:'联系电话：',value:'', },
        {id:'005',name:'工作单位：',value:'', },
        {id:'006',name:'E-mail：',value:'', prefix:'* '},
        {id:'007',name:'研究领域：',value:'', },
        {id:'008',name:'我的兴趣词：',value:'', }
      ],
      interestwords:[
        {id:'009',value:'中国式现代化'},
        {id:'010',value:'深度学习'},
        {id:'011',value:'中国式现代化'},
        {id:'012',value:'文献综述'},
        {id:'013',value:'软工2'},
        {id:'014',value:'区块链'}
      ],
      scholar: true
    }

  componentDidMount(){
    axios.get('https://mock.apifox.cn/m1/1955876-0-default/personInfo').then(
      response => {
        const newPersonalinfs = this.state.personalinfs;
        newPersonalinfs.map((item, index)=>{
        if (item.id === '003'){
          item.value = response.data.Rname;
        }else if (item.id === '004'){
          item.value = response.data.Rcontact;
        }if (item.id === '005'){
          item.value = response.data.Rinstitute;
        }if (item.id === '006'){
          item.value = response.data.Uemail;
        }if (item.id === '007'){
          const {Ufield} = response.data;
          let out = '';
          Ufield.map((item, index) => {
            if (index < Ufield.length - 1){
              out = `${out}${item}、`;
            }else{
              out = `${out}${item}`;
            }
          })
          item.value = out;
        }if (item.id === '008'){
          const {Uinterest} = response.data;
          let out = '';
          Uinterest.map((item, index) => {
            if (index < Uinterest.length - 1){
              out = `${out}${item}、`;
            }else{
              out = `${out}${item}`;
            }
          })
          item.value = out;
        }
      })
      this.setState({personalinfs: newPersonalinfs});
      console.log(response.data);
      console.log(this.state)},
      error => {console.log('失败了',error);}
    )
  }

  render() {
    const {accountinfs} = this.state
    const {personalinfs} = this.state
    const {interestwords} = this.state
    const {scholar} = this.state
    return (
      <div className='infoBackground'>
        <div>&nbsp;</div>
        <Routes>
          <Route path="/" element={<Frame  accountinfs={accountinfs} personalinfs={personalinfs} scholar={scholar}/> }  />
          <Route path="edit" element={<Edit  accountinfs={accountinfs} interestwords={interestwords} scholar={scholar}/>} />
        </Routes>
        <div>&nbsp;</div>
      </div>
    )
  }
}
