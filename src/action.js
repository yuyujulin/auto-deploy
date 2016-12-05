/**
 * Created by Administrator on 2016/11/30 0030.
 */

import request from 'superagent'

import {hashHistory} from 'react-router'

const host = 'http://101.200.129.112:9527'

const api = {
    logout: '/deploy/logout',
    detail: '/deploy/detail'
}

export function getInit(obj) {
    return {
        type: 'get-init',
        info: obj.info,
        project: obj.project,
        users: obj.users
    }
}

export function reset(obj) {
    return {
        type: 'reset',
        data: obj
    }
}

export function getDetail(obj) {
    return {
        type: 'get-detail',
        data: obj
    }
}

export function detail(query) {
    return function (dispatch) {
        request
            .get(host + api.detail)
            .query(query)
            .withCredentials()
            .end(function (err, res) {
                var data = res.body
                dispatch(getDetail(data))
            })
    }
}