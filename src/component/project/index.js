/**
 * Created by Administrator on 2016/11/26 0026.
 */
import React from 'react'
import $ from 'jquery'
import {
    Router,
    Route,
    IndexRoute,
    Link,
    hashHistory,
    browserHistory
} from 'react-router';

var Project = React.createClass({
    render(){
        return (
            <div>Project</div>
        )
    },
    componentDidMount(){
        $.ajax({
            url: 'http://101.200.129.112:9527/deploy/project',
            success: function (res) {
                console.log(res)
                if(res.noLogin){

                }
            },
            crossDomain: true,
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true
            }
        })
    }
})

export default Project