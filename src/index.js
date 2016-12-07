/**
 * Created by Administrator on 2016/12/7 0007.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'
//
// new Promise(function (resolve, reject) {
//     console.log('Hello Promise')
//     reject('start')
// }).then(function(){
//     console.log('resolve')
// }, function(){
//     console.log('reject')
// })

request.get('http://101.200.129.112:9527/react1/student')
    .then(function (res) {
        var data = res.body
            return new Promise((resolve, reject) => {

            })
        }
    )


ReactDOM.render(<div>1111</div>, document.getElementById('root'))
