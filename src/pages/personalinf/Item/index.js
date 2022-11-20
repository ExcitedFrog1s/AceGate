//by wgx
import React, { Component } from 'react'
import '../index.css';

export default class Item extends Component {
  render() {
    const {id,name,value,prefix} = this.props
    return (
        <div className="list_container">
            <div className="information_name">
            <b style={{color: 'rgb(215, 38, 31)'}}>{prefix}</b>
              <span>{name}</span>
            </div>
            <div className="information_value">
              <span>{value}</span>
            </div>
        </div>
    )
  }
}
