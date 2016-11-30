/**
 * Created by Administrator on 2016/11/30 0030.
 */

import request from 'superagent'

import {hashHistory} from 'react-router'

const host = 'http://101.200.129.112:9527/'

const api = {
    init: '/deploy/init',
    login: '/deploy/login',
    logout:'/deploy/logout'
}

export function getInit(obj) {
    return {
        type: 'get-init',
        info: obj.info,
        project: obj.project,
        users: obj.users
    }
}

export function getLogin(obj) {
    return {
        type: 'get-login',
        data: obj
    }
}
export function init() {
    return function (dispatch) {
        request.get(host + api.init)
            .withCredentials()
            .end(function (err, res) {
                var data = res.body
                if (data.noLogin) {
                    hashHistory.push('login')
                } else {
                    hashHistory.push('home')
                    dispatch(getInit(res.body))
                }
            })
    }
}

export function login(query) {
    return function (dispatch) {
        request.get(host + api.login)
            .query(query)
            .end(function (err, res) {
                var data = res.body
                if(!data.noLogin){ //已登录
                    dispatch(init())
                }
                // dispatch(getLogin(res.body))
            })
    }
}

export function logout() {
    return function (dispatch) {
        request.get(host + api.logout)
            .end(function (err, res) {
              console.log(res.body)
            })
    }
}