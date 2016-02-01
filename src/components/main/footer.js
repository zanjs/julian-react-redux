import React,{Component,PropTypes} from 'react'

export default class Footer extends Component{

	render(){
		return (
			<footer>
			<div className="footer-container">
			  <ul>
			    <li>
			      <span>©2015 / 2100075-1</span>
			    </li>
			    <li>
			      <a className="github" href="https://github.com/zanjs/julian-react-redux" target="_blank">
			        <i className="fa fa-github"></i>
			      </a>
			    </li>
			    <li>
			      <a className="weibo" href="http://weibo.com/zanjser" target="_blank">
			        <i className="fa fa-weibo"></i>
			      </a>
			    </li>
			  </ul>
			</div>
			</footer>
		)
	}
}