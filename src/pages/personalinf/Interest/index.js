//by wgx
import React, { Component } from 'react'
import '../index.css';

export default class Interest extends Component {
  handleClick = ()=>{
    const {value} = this.props
    this.props.addinterest(value)
  }
  render() {
    const {value} = this.props
    return (
        <div onClick={this.handleClick} className="opton-wrap">
            <div className="unselect-option">{value}</div>
        </div>
    )
  }
}
