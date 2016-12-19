/**
 * Created by Administrator on 2016/11/30 0030.
 */
import React from 'react'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'
import {connect} from 'react-redux'

import User from './component/user'
import Me from './component/me'
import Project from './component/project'
import Home from './component/home'
import Repo from './component/repo'
import Page404 from './component/page-404'

import {init, login, reset, getInit} from './action'

const R = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Home}/>
                <Route path="user" component={User}></Route>
                <Route path="me" component={Me}/>
                <Route path="repo/:id" component={Repo}></Route>
                <Route path="project" component={Project}></Route>
                <Route path="home" component={Home}></Route>
                <Route path="*" component={Page404}></Route>
            </Router>
        )
    },
    componentWillMount(){
        const {dispatch} = this.props
        dispatch(getInit(window.initData))
    }
})


var store2props = function () {
    return {}
}

var action2props = function (dispatch) {
    return {
        dispatch,
        init: init,
        login: login,
        reset: reset

    }
}

var Rout = connect(store2props, action2props)(R)

export default Rout