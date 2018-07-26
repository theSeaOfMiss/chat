// 一个下拉框组件
// 使用方法
// <Select
//   sections={[{title: 'J', data: ['Jackson', 'Jillian', 'Jimmy']}]}
//   clickText={(item) => alert(item)}
// />

import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View, Image, TouchableHighlight, } from 'react-native';

export default class Select extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showText: false,
		}
	}

	_keyExtractor = (item, index) => {
		return item + index;
	};

	turn = () => {
		this.setState(previousState => {
			return { showText: !previousState.showText };
		});
	};

	clickT = (item) => {
		this.props.clickText(item);
	};

	render() {
		return (
				<SectionList
					style={styles.container}
					keyExtractor={this._keyExtractor}
					sections={this.props.sections}
					renderItem={({item}) =>
						this.state.showText?<Text style={styles.item} onPress={() => this.clickT(item)}>{item}</Text>:null}
					renderSectionHeader={({section}) =>
						<TouchableHighlight
							underlayColor={'#E0E0E0'}
							onPress={this.turn}
							style={styles.textCenter}
						>
						<View
							style={styles.titleCont}
						>
						<Image
							source={this.state.showText?require('../images/down.png'):require('../images/right.png')}
						/>
						<Text
							style={styles.sectionHeader}
						>{section.title}</Text></View></TouchableHighlight>}
				/>
		);
	}
}

// export default class Test extends Component {
// 	render(){
// 		return (<View>
// 		<Select
// 			sections={[
// 				{title: '我的好友', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']}
// 			]}
// 			clickText={(item) => alert(item)}
// 		/></View>)
// 	}
// }

const styles = StyleSheet.create({
	container: {
		paddingTop: 5
	},
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 14,
		fontWeight: 'bold',
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
	titleCont: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
	},
	textCenter: {
		paddingTop: 5,
		paddingBottom: 5,
	},
});