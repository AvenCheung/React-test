// Header
import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
import './index.css'

export default class Header extends Component {

  static = {
    addTodo: PropTypes.func.isRequired
  }

  // 键盘回调事件
  addTodo = (event) => {
    const { target, keyCode } = event
    if (keyCode !== 13) return
    if (target.value.trim() === '') {
      alert('输入不能为空')
      return
    }
    const todoObj = { id: nanoid(), name: target.value, done: false }
    this.props.addTodo(todoObj)
    target.value = ''
  }
  render () {
    return (
      <div className="todo-header">
        <input onKeyUp={this.addTodo} type="text" placeholder="请输入你的任务名称，按回车键确认" />
      </div>
    )
  }
}
