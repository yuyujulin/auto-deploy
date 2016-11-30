/**
 * Created by Administrator on 2016/11/30 0030.
 */
import {combineReducers} from 'redux'

const me = function (state = {info: {}, project: []}, action) {
    switch (action.type) {
        case 'get-init':
            return Object.assign({}, state, {info: action.info, project: action.project, users:action.users})
    }
    return state
}

const user = function (state = {}, action) {
    return state
}

//合并reducer
export  default combineReducers({
    me,
    user
})
