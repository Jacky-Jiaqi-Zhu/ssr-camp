import React from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../store/user'
import {Redirect} from 'react-router-dom'

function User(props) {
    console.log(props.userinfo)

    return <Redirect to="/about"></Redirect>

    // return <div>
    //     <h1>
    //         hellow{props.userinfo.name}, the best one is {props.userinfo.best}
    //     </h1>
    // </div>
    
}


User.loadData = (store)=> {
    return store.dispatch(getUserInfo())
}


export default connect(
    state=>({userinfo:state.user.userinfo}),
    // {getUserInfo}
    // state => {
    //     return {
    //         userinfo: state.userinfo
    //     }
    // }
)(User)
