import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';



export default class MessageScreen extends Component {
	static navigationOptions = {
		headerTitle: '消息',
		headerStyle: {
			backgroundColor: '#3654f4',
		},
		headerTintColor: '#f9fffb',
		headerTitleStyle: {
			flex: 1,
			fontWeight: 'bold',
			alignItems: 'center',
			textAlign: 'center',
		},
		headerLeft: (
			<Image
				source={require('../../images/spiro_w.png')}
				style={{ width:40 ,height: 40}}
				onPress
			/>
		),
		headerRight: (
			<View/>
		),
	};
	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>消息</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	image: {
		width: 20,
		height: 20,
	},
});

