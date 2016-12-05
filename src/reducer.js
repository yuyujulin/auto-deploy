/**
 * Created by Administrator on 2016/11/30 0030.
 */
import {combineReducers} from 'redux'

const me = function (state = {info: {}, project: []}, action) {
    switch (action.type) {
        case 'get-init':
            return Object.assign({}, state,
                {
                    info: action.info,
                    project: action.project,
                    users: action.users
                }
            )
    }
    return state
}

const user = function (state = {}, action) {
    return state
}

const detail = function (state = {
    project: {
        admin: {},
        commit_info: [],
        description: '',
        folders: [],
        local_branches: [],
        active_branch: '',
        logo: '',
        name: '',
        remote_branches: [],
        url: '',
    }
}, action) {
    switch (action.type) {
        case 'get-detail':
            return Object.assign({}, state, {project: action.data})
        default:
            return state
    }
}


//合并reducer
var reducer = combineReducers({
    me,
    user,
    detail
})

export default reducer