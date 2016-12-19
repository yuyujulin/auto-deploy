/**
 * Created by Administrator on 2016/12/7 0007.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'
import {Provider, connect} from 'react-redux'
import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import R from './route'

import {Form, Input, Icon, message, Row, Col, Button} from 'antd'
const FormItem = Form.Item

import 'antd/dist/antd.min.css'
import './init.css'

var host = 'http://101.200.129.112:9527'

var api = {
    init: '/deploy/init',
    login: '/deploy/login',
    logout: '/deploy/logout'
}

var store = createStore(reducer,
    compose(applyMiddleware(thunk), window.devToolsExtension())
)

window.initData = null


var Login = React.createClass({
    getInitialState(){
        return {
            username: '',
            password: ''
        }
    },
    render(){
        const {username, password} = this.state
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem label='用户名' labelCol={{span: 10}} wrapperCol={{span: 6}}>
                        <Input
                            id='username'
                            value={username}
                            addonBefore={<Icon type='user'/>}
                            onChange={(e) => this.setState({username: e.target.value})}
                            placeholder='用户名'
                        />
                    </FormItem>
                    <FormItem label='密码' labelCol={{span: 10}} wrapperCol={{span: 6}}>
                        <Input
                            id='password'
                            value={password}
                            addonBefore={<Icon type='lock'/>}
                            onChange={(e) => this.setState({password: e.target.value})}
                            placeholder='密码'
                        />
                    </FormItem>
                    <Row>
                        <Col push={10} span={6}>
                            <Button onClick={this.login}>登录</Button>
                            <Button className='login-form-logout' onClick={this.logout}>退出</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    },
    login(){
        var _this = this
        const {username, password} = this.state
        const {loginSucceed} = this.props
        var query = {
            name: username,
            password: password
        }

        request
            .get(host + api.login)
            .query(query)
            .withCredentials()
            .end(function (err, res) {
                var data = res.body
                if (!data || data.noLogin) {
                    message.info('登录失败:' + data.info)
                } else {
                    loginSucceed(data)
                }
            })
    },
    logout(){

    }

})

var Init = React.createClass({
    getInitialState(){
        return {
            isLoading: true,
            loggedIn: false,
        }
    },
    render(){
        var comp = null
        const {isLoading, loggedIn} = this.state
        if (isLoading) { //是否加载中
            comp = <div>loading</div>
        } else {
            if (loggedIn) {
                console.log("logged in, rendering...")
                comp =
                    <Provider store={store}>
                        <R/>
                    </Provider>
            } else {
                comp = <Login loginSucceed={this.loginSucceed}/>

            }
        }

        return comp
    },
    loginSucceed(data){
        window.initData = data
        this.setState({
                isLoading: false,
                loggedIn: true,
            }
        )
    },
    componentDidMount(){
        var _this = this
        request
            .get(host + api.init)
            .withCredentials()
            .end(function (err, res) {
                if (res.error) {
                    message.info("服务内部错误：" + res.error)
                }
                var data = res.body
                if (!data || data.noLogin) {
                    _this.setState({
                            isLoading: false,
                        }
                    )
                } else {
                    window.initData = data
                    _this.setState({
                            isLoading: false,
                            loggedIn: true,
                        }
                    )
                }
            })
    }
})

export default Init
