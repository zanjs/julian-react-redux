import {GET_CAPTCHAURL,LOGIN_SUCCESS,LOGIN_FAILURE,USERINFO_SUCCESS,LOGOUT_USER,USERINFO_FAILURE,UPDATE_USER_FAILURE,UPDATE_USER_SUCCESS,SUCCESS_GET_SNSLOGINS,FAILURE_GET_SNSLOGINS} from './ActionTypes'
import {API_ROOT} from '../config'
import fetch from 'isomorphic-fetch'
import { pushPath } from 'redux-simple-router'
import {saveCookie,getCookie,signOut} from '../utils/authService'

//登录
function loginSuccess(token) {
	return {
		type: LOGIN_SUCCESS,
		token: token
	}
}
function loginFailure(err) {
	return {
		type: LOGIN_FAILURE,
		errMsg : err.error_msg || '登录失败'
	}
}
export function localLogin(userInfo) {
	return (dispatch,getState) =>{
		return fetch(API_ROOT + 'auth/local',{
			method: 'post',
			credentials: 'include',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInfo)
		}).then(response => response.json().then(json => ({ json, response })))
		  .then(({json,response}) => {
		  	if(!response.ok){
		  		return dispatch(loginFailure(json))
		  	}
		  	//得到token,并存储
		  	saveCookie('token',json.token)
		  	//获取用户信息
		  	dispatch(getUserInfo(json.token))
		  	dispatch(loginSuccess(json.token))
		  	dispatch(pushPath('/'))
		  }).catch( err =>{
		  	//登录异常
		  	return dispatch(loginFailure(err))
		  })
	}

}

//获取验证码
export function getCaptchaUrl() {
	return {
		type: GET_CAPTCHAURL,
		captchaUrl: API_ROOT + 'users/getCaptcha?' + Math.random()
	}
}

//获取用户信息
function receiveUserInfo(user) {
	return {
		type: USERINFO_SUCCESS,
		user: user
	}
}
function failureUserInfo() {
	return {
		type: USERINFO_FAILURE
	}
}
export function getUserInfo(token) {
  return (dispatch, getState) => {
    return fetch(API_ROOT + 'users/me', {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json().then(json => ({ json, response })))
				  .then(({json,response}) => {
				  	if(!response.ok){
				  		return dispatch(failureUserInfo())
				  	}
				  	return dispatch(receiveUserInfo(json))
				  }).catch( err =>{
				  	//登录异常
				  	return dispatch(failureUserInfo())
				  })
   }
}

export function logout() {
  return dispatch => {
  	signOut()
    dispatch({type: LOGOUT_USER})
    dispatch(pushPath('/'))
  }
}
//修改用户资料
function failureUpdateUser(err) {
	return {
		type: UPDATE_USER_FAILURE,
		errMsg : err.error_msg || '更新用户资料失败'
	}
}
function successUpdateUser(user) {
	return {
		type: UPDATE_USER_SUCCESS,
		user:user
	}
}
export function updateUser(userInfo) {
	return (dispatch,getState)=>{
		return fetch(API_ROOT + 'users/mdUser',{
			method: 'put',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			  'Authorization': `Bearer ${getCookie('token')}`
			},
			body: JSON.stringify(userInfo)
		}).then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			if(!response.ok){
				return dispatch(failureUpdateUser(json.data))
			}
			return dispatch(successUpdateUser(json.data))
		}).catch(err=>{
			return dispatch(failureUpdateUser(err))
		})
	}
}


//获取sns
function receiveSnsLogins(logins) {
	return {
		type: SUCCESS_GET_SNSLOGINS,
		logins:logins
	}
}
function failureSnsLogins() {
	return {
		type: FAILURE_GET_SNSLOGINS,
	}
}
export function getSnsLogins() {
	return (dispatch,getState)=>{
		return fetch(API_ROOT + 'users/snsLogins')
		.then(response => response.json().then(json => ({json,response})))
		.then(({json,response}) => {
			if(!response.ok){
				return dispatch(failureSnsLogins())
			}
			return dispatch(receiveSnsLogins(json.data))
		}).catch(e=>{
			return dispatch(failureSnsLogins())
		})
	}
}