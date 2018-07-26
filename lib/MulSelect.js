// 多下拉框组件
// <MulSelect
// 				sections={[
// 					{title: '特别关心', data: ['Devin']},
// 					{title: '我的好友', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
// 				]}
// 			/>

import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';

import Select from './Select'

export default class MulSelect extends Component {

	render(){
		let that = this;
		return <View style={{paddingTop: 20}}>
			{this.props.sections.map(function (section, key) {
				return <Select sections={[section]} key={key} clickText={that.props.cliT}/>
			})}
		</View>
	}
}


// export default class Test extends Component {
// 	render() {
// 		return <View>
// 			<MulSelect
// 				cliT={(item) => alert(item)}
// 				sections={[
// 					{title: '特别关心', data: ['Devin']},
// 					{title: '我的好友', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
// 				]}
// 			/>
// 		</View>
// 	}
// }