// by wgx
import React, { Component } from 'react'
import Frame from '../Frame'
import Edit from '../Edit'

export default class Information extends Component {
    state = {accountinfs:[
        {id:'001',name:'用户ID：',value:'20231141'},
        {id:'002',name:'门户ID：',value:'11223344' }
      ],
      personalinfs:[
        {id:'003',name:'真实姓名：',value:'万光曦', },
        {id:'004',name:'联系电话：',value:'110119120', },
        {id:'005',name:'E-mail：',value:'2690121951@qq.com', prefix:'* '},
        {id:'006',name:'研究领域：',value:'如何晚睡早起不猝死', },
        {id:'007',name:'我的兴趣词：',value:'吃', }
      ],
      interestwords:[
        {id:'008',value:'中国式现代化'},
        {id:'009',value:'深度学习'},
        {id:'010',value:'中国式现代化'},
        {id:'011',value:'文献综述'},
        {id:'012',value:'软工2'},
        {id:'013',value:'区块链'}
      ]
    }

  render() {
    const {accountinfs} = this.state
    const {personalinfs} = this.state
    const {interestwords} = this.state
    return (
      <div>
        <Frame accountinfs={accountinfs} personalinfs={personalinfs}/>
        <Edit accountinfs={accountinfs} interestwords={interestwords}/>
      </div>
    )
  }
}
