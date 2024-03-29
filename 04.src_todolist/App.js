import React, { Component } from 'react'
import axios from 'axios';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer'
import './App.css';

export default class App extends Component {

  state = {
    todos: [
      { id: '01', name: '吃饭', done: false },
      { id: '02', name: '睡觉', done: false },
      { id: '03', name: '打代码', done: false }
    ]
  }

  // 添加一个todo项
  addTodo = (todoObj) => {
    const { todos } = this.state
    const newTodos = [todoObj, ...todos]
    // 更新状态
    this.setState({ todos: newTodos })
  }

  // 删除一个todo项isiklskfgidisiskgskoai
  deleteTodo = (id) => {
    const { todos } = this.state
    // 匹配过滤todoObj.id !== id 返回一个新数组
    const newTodos = todos.filter(todoObj => {
      return todoObj.id !== id
    })
    this.setState({ todos: newTodos })
  }

  // 全选checkBox事件回到
  checkAllTodo = (done) => {
    const { todos } = this.state
    const newTodos = todos.map(todoObj => {
      return { ...todoObj, done }
    })
    this.setState({ todos: newTodos })
  }

  // 清除全部已完成
  clearAllTodoDone = () => {
    const { todos } = this.state
    const newTodos = todos.filter(todoObj => {
      return !todoObj.done
    })
    this.setState({ todos: newTodos })
  }

  // 更新todo项状态
  updateTodo = (id, done) => {
    const { todos } = this.state
    const newTodos = todos.map(todoObj => {
      if (todoObj.id === id) return todoObj = { ...todoObj, done: done }
      else return todoObj
    })
    this.setState({ todos: newTodos })
  }

  // 请求todolist数据
  getTodoListData = () => {
    axios.get('http://localhost:3000/api1/todolist').then(
      response => {
        console.log('请求成功！', response.data)
      },
      err => {
        console.log('请求失败了', err)
      }
    )
  }

  getCarData = () => {
    axios.get('http://localhost:3000/api2/cars').then(
      response => {
        console.log('请求成功', response.data)
      },
      error => {
        console.log('请求失败啦！', error)
      }
    )
  }


  render () {
    const { todos } = this.state
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
          <Footer todos={todos} clearAllTodoDone={this.clearAllTodoDone} checkAllTodo={this.checkAllTodo} />
          <button onClick={this.getTodoListData}>点击请求todolist数据</button>
          <button onClick={this.getCarData}>点击请求汽车数据</button>
        </div>
      </div>
    )
  }
}
