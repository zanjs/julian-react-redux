import React, { PropTypes, Component } from 'react'

export default class Sidebar extends Component{
	render(){
		const {indexImg} = this.props
		let styles = { backgroundImage: 'url(' + indexImg + ')'}
		return (
			<div className="col-sm-3 sidebar-box">
			  <div className="cover-img" style={styles}></div>
			  <div className="bottom-block">
			    <h1>Julian</h1>			  
			  </div>
			</div>
		)
	}
}