/**
 * Created by Administrator on 2016/11/26 0026.
 */
import React from 'react'

import {Link} from 'react-router'
import {Col, Row} from 'antd'
import {hashHistory} from 'react-router'

import './index.css'

var User = React.createClass({
    render(){
        const {data} = this.props
        const {name, project} = data

        var nodes = project.map(function (obj, i) {
            return (
                <li onClick={(e) => hashHistory.push('repo/' + obj.id)} style={{float: 'left'}} key={i}>
                    <h5>{obj.name}</h5>
                    <p>{obj.description}</p>
                </li>
            )
        })

        return (
            <div>
                <h4>{name}</h4>
                <ul className="home-user-project">
                    {nodes}
                    <div style={{clear: 'both'}}></div>
                </ul>
            </div>
        )
    }
})

var Home = React.createClass({
    render(){
        const {info, users} = this.props
        var nodes = users.map(function (obj, i) {
            return (
                <div key={i}>
                    <User data={obj}/>
                </div>
            )
        })
        return (
            <div className="home">
                <h3>前端项目自动发布系统</h3>
                <Row>
                    <Col span={2}>我</Col>
                    <Col span={4}><Link to="me">{info.name}</Link></Col>
                </Row>
                <Row>
                    <Col span={20}>
                        <div className="home-user">
                            {nodes}
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
})

import {connect} from 'react-redux'

var store2props = function (store) {
    return {
        info: store.me.info,
        users: store.me.users
    }
}
var H = connect(store2props)(Home)
export default H