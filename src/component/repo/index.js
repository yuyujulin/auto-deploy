/**
 * Created by Administrator on 2016/11/26 0026.
 */
import React from 'react'
import {Col, Row, Steps, Button} from 'antd'


import {detail} from '../../action'

const Step = Steps.Step

var Repo = React.createClass({
    render(){
        const {project} = this.props

        const {
            admin,
            commit_info,
            description,
            folders,
            local_branches,
            active_branch,
            logo,
            remote_branches,
            url,
            name
        } = project


        var local_branch_nodes = []

        for (var key in local_branches) {
            local_branch_nodes.push(
                <a key={key} href="javascript:void(0)">&nbsp;{key} &nbsp;</a>
            )
        }

        var remote_branch_nodes = []
        for (var key in remote_branches) {
            remote_branch_nodes.push(
                <a key={key} href="javascript:void(0)">&nbsp; {key} &nbsp;</a>
            )
        }


        return (
            <div className="repo">
                <Row>
                    <Col push={4} span={8}>
                        <h3>项目名称:{name}</h3>
                        <p>作者:{admin.name}</p>
                        <h4>active_branch:</h4>
                        <p><a href="javascript:void(0)">{active_branch}</a></p>
                        <h4>folders:</h4>
                        {
                            folders.map((str, i) => (<a key={i} href="javascript:void(0)">&nbsp; {str} &nbsp;</a>))
                        }
                        <h4>local_branch:</h4>
                        <div>{local_branch_nodes}</div>

                        <h4>remote_branch:</h4>
                        <div>{remote_branch_nodes}</div>

                        <div>active_branch:</div>
                        <div><a href="javascript:void(0)" key={key}>{active_branch}</a></div>
                    </Col>
                    <Col push={4} span={8}>
                        <Steps direction='vertical' current={1}>
                            {
                                commit_info.map((obj, i) =>
                                    <Step key={i} title={obj.committer.message} description={
                                        (
                                            <Row>
                                                <Col span={12}>
                                                    <p>{obj.committer.name}</p>
                                                    <p>{obj.committer.email}</p>
                                                    <p><Button type='ghost'>reset to here</Button></p>
                                                </Col>
                                                <Col span={12}>
                                                    <p>{obj.message}</p>
                                                    <p>{obj.summary}</p>
                                                    <p>{obj.time}</p>
                                                </Col>
                                            </Row>
                                        )
                                    }>

                                    </Step>
                                )
                            }
                        </Steps>
                    </Col>
                </Row>
            </div>
        )
    },
    componentDidMount(){
        const {params, dispatch} = this.props
        const {id} = params
        dispatch(detail({
            repo_id: id
        }))
    }
})

import {connect} from 'react-redux'

var store2props = function (store) {
    return {
        info: store.me.info,
        users: store.me.users,
        project: store.detail.project
    }
}
var Re = connect(store2props)(Repo)
export default Re