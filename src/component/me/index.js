/**
 * Created by Administrator on 2016/11/26 0026.
 */
import React from 'react'
import {} from 'antd'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import './index.css'

var Me = React.createClass({
    render(){
        const {project} = this.props
        var nodes = project.map(function(obj, i){
            return (
                <li key={i}>
                    <Link to={obj.id}>
                        <p>{obj.name}</p>
                        <p>{obj.description}</p>
                    </Link>
                </li>
            )
        })
        return (
            <div>
                <ul className="me-project">
                    {nodes}
                </ul>
            </div>
        )
    }
})

var store2props = function (store) {
    return {
        project: store.me.project,
    }
}
var M = connect(store2props)(Me)

export default M