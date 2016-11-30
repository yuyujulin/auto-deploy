/**
 * Created by Administrator on 2016/11/30 0030.
 */
import React from 'react'
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'
import {connect} from 'react-redux'

import User from './component/user'
import Me from './component/me'
import Login from './component/login'
import Project from './component/project'
import Home from './component/home'
import Repo from './component/repo'
import Page404 from './component/page-404'

import {init, login} from './action'

const R = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="login" component={Login}></Route>
                <Route path="users" component={User}></Route>
                <Route path="me" component={Me}>

                </Route>
                <Route path="repo/:name" component={Repo}></Route>
                <Route path="project" component={Project}></Route>
                <Route path="home" component={Home}></Route>
                <Route path="*" component={Page404}></Route>
            </Router>
        )
    },
    componentDidMount(){
        const {init,dispatch, login} = this.props
        // dispatch(login({name:'lielie2', password:'lielie2'}))
        dispatch(init())
    }
})

import {} from 'react-redux'

var store2props = function () {
    return {}
}

var action2props = function (dispatch) {
    return {
        init: init,
        login:login,
        dispatch:dispatch
    }
}

var Rout = connect(store2props, action2props)(R)

export default Rout