/**
 * Created by Administrator on 2016/12/12 0012.
 */
import React from 'react'
import ReactDOM from 'react-dom'

import Init from './init'

import './index.css'

var Header = React.createClass({
    render(){
        return (
            <div className="app-auto-deploy">
                <h1>前端项目自动发布系统</h1>
                <div id="auto-deploy-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
})

ReactDOM.render(
    <Header>
        <Init/>
    </Header>,
    document.getElementById('root')
)