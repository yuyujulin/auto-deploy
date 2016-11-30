/**
 * Created by Administrator on 2016/11/26 0026.
 */
import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import {createStore, compose} from 'redux'

import reducer from './reducer'

import R from './route'

import 'antd/dist/antd.css'

var store = createStore(reducer,
    //让Chrome的Redux Devtools显示数据, 需要在Chrome上先安装Redux Devtools
    compose(window.devToolsExtension())
)

ReactDOM.render(
    <div className="App">
        <Provider store={store}>
            <R/>
        </Provider>
    </div>,
    document.getElementById('root')
)