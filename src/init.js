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

import {Form, Input, Icon, message} from 'antd'
const FormItem = Form.Item

import 'antd/dist/antd.min.css'

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
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem label={'用户名'} labelCol={{span: 6}} wrapperCol={{span: 14}}>
                        <Input
                            value={this.state.username}
                            addonBefore={<Icon type='user'/>}
                            onChange={(e) => this.setState({username: e.targe.value})}
                            placeholder='用户名'
                        />
                    </FormItem>
                </Form>
            </div>
        )
    }
})

var Init = React.createClass({
    render(){
        return <div>loading</div>
    },
    componentDidMount(){
        request
            .get(host + api.init)
            .withCredentials()
            .end(function (err, res) {
                console.log(res)
                if (res.error) {
                    message.info("服务返回错误" + res.error)
                }
                var data = res.body
                if (!data || data.noLogin) {
                    // ReactDOM.unmountComponentAtNode(document.getElementById('auto-deploy-container'))
                    // ReactDOM.render(
                    //     <Login></Login>,
                    //     document.getElementById('auto-deploy-container')
                    // )

                    ReactDOM.unmo
                } else {
                    ReactDOM.unmountComponentAtNode(document.getElementById('auto-deploy-container'))
                    window.initData = res.body
                    ReactDOM.render(
                        <Provider store={store}>
                            <R/>
                        </Provider>,
                        document.getElementById('auto-deploy-container')
                    )
                }
            })
    }
})

export default Init
