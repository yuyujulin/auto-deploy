/**
 * Created by Administrator on 2016/11/26 0026.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Form, Icon, Input, Button, Row, Col} from 'antd';

import {login, logout} from '../../action'

const FormItem = Form.Item;

var Login = React.createClass({
    getInitialState(){ //当组件的数据对全局没有影响时，可以把数据写在state里面
        return {
            username: '',
            password: ''
        }
    },
    render(){
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem label='用户名' labelCol={{span: 6}} wrapperCol={{span: 14}}>
                        <Input value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}
                               addonBefore={<Icon type="user"/>} placeholder="Username"/>
                    </FormItem>
                    <FormItem label='密码' labelCol={{span: 6}} wrapperCol={{span: 14}}>
                        < Input value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}
                                addonBefore={<Icon type="lock"/>} type="password" placeholder="Password"/>
                    </FormItem>
                    <Row>
                        <Col push={6} span={3}><Button onClick={this.login}>登录</Button></Col>
                    </Row>
                    <Row>
                        <Col push={6} span={3}><Button onClick={this.logout}>登出</Button></Col>
                    </Row>
                </Form>
            </div>
        )
    },
    login(){
        var {dispatch} = this.props
        var query = {
            username: this.state.username,
            password: this.state.password
        }
        dispatch(login(query))
    },
    logout(){
        var {dispatch} = this.props
        dispatch(logout())
    },
    componentDidMount(){
        const {name} = this.props
        if (name) {

        }
    }
})

import {connect} from 'react-redux'

const store2props = function (store) {
    return {
        name: store.me.info.name
    }
}

var L = connect(store2props)(Login)
export default L