import React, { Component } from 'react'
import '../index.css';

export default class Interest extends Component {
  render() {
    const {value} = this.props
    return (
        <div className="opton-wrap">
            <div className="unselect-option">{value}</div>
        </div>
    )
  }
}
