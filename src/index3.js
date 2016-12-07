/**
 * Created by Administrator on 2016/11/26 0026.
 */
import React from 'react'
import ReactDOM from 'react-dom'

import request from 'superagent'

import {
    Router,
    Route,
    IndexRoute,
    Link,
    hashHistory,
    browserHistory
} from 'react-router'

var host = 'http://101.200.129.112:9527'
var api = {
    init: '/deploy/init/',
    login: '/deploy/login/',
    logout: '/deploy/logout'
}

import {Form, Input, Icon, Button, Row, Col} from 'antd'
const FormItem = Form.Item

import {Provider, connect} from 'react-redux'

import {createStore, compose, applyMiddleware} from 'redux'

import thunk from 'redux-thunk'

import reducer from './reducer'

import R from './route'

import 'antd/dist/antd.css'

var store = createStore(reducer,
    //让Chrome的Redux Devtools显示数据, 需要在Chrome上先安装Redux Devtools
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension())
)

window.initData = null

var Login = React.createClass({
    getInitialState(){
        return {
            username: '',
            password: '',
        }
    },
    render(){
        return (
            <div>
                <h3 style={{textAlign: 'center'}}>前端项目自动发布系统</h3>
                <Form className="login-form">
                    <FormItem label='用户名' labelCol={{span: 6}} wrapperCol={{span: 14}}>
                        <Input
                            value={this.state.username}
                            addonBefore={<Icon type="user"/>}
                            onChange={(e) => this.setState({username: e.target.value})}
                            placeholder='username'
                        />
                    </FormItem>
                    <FormItem label='密码' labelCol={{span: 6}} wrapperCol={{span: 14}}>
                        <Input
                            type="password"
                            value={this.state.password}
                            addonBefore={<Icon type="lock"/>}
                            onChange={(e) => this.setState({password: e.target.value})}
                            placeholder='password'
                        />
                    </FormItem>
                    <Row>
                        <Col push={6} span={3}><Button onClick={this.login}>登录</Button></Col>
                        <Col push={6} span={3}><Button onClick={this.logout}>退出</Button></Col>
                    </Row>
                </Form>
            </div>
        )
    },
    login(){
        var that = this

        var query = {
            name: this.state.username,
            password: this.state.password
        }

        request.get(host + api.login)
            .query(query)
            .withCredentials()
            .end(function (err, res) {
                var data = res.body
                if (data.noLogin) {
                    alert('没有该用户')
                } else {
                    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
                    ReactDOM.render(
                        <Init/>,
                        document.getElementById('root')
                    )
                }
            })
    },
    logout(){
        console.log('logout')
    }
})

var Init = React.createClass({
    render(){
        return <div>loading</div>
    },
    componentDidMount(){
        request.get(host + api.init)
            .withCredentials()
            .end(function (err, res) {
                var data = res.body
                if (data.noLogin) { //如果未登录
                    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
                    ReactDOM.render(<Login></Login>, document.getElementById('root'))
                } else { //如果已登录
                    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
                    window.initData = res.body
                    ReactDOM.render(
                        <div className="App">
                            <Provider store={store}>
                                <R/>
                            </Provider>
                        </div>,
                        document.getElementById('root')
                    )
                }
            })
    }
})

ReactDOM.render(
    <Init/>,
    document.getElementById('root')
)