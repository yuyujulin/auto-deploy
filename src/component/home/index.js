/**
 * Created by Administrator on 2016/11/26 0026.
 */
import React from 'react'
import {Col, Row} from 'antd'
import {Link} from 'react-router'

var Home = React.createClass({
    render(){
        const {info} = this.props
        return (
            <div className="home">
                <h3>动脑学院前端项目自动发布系统</h3>
                <Row>
                    <Col span={2}>我</Col>
                    <Col span={4}><Link to="me">{info.name}</Link></Col>
                </Row>
                <Row>
                    <Col span={2}>其他人</Col>
                    <Col span={20}><Link to="me">{info.name}</Link></Col>
                </Row>
                <div>
                    <p>
                        <Link to="me">{info.name}</Link>
                    </p>
                </div>
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