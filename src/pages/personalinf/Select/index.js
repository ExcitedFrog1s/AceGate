// by wgx
import React, { Component } from 'react'

export default class Select extends Component {
  handledelete = ()=>{
    const {id} = this.props
    this.props.deletefieldint(id)
  }
  render() {
    const {id,value} = this.props
    return (
      <div  className='selected'>
        <span>{value}&nbsp;<b className='cancelOption' onClick={this.handledelete} >&nbsp;×&nbsp;</b></span>
      </div>
    )
  }
}
