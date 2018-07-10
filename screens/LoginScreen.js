import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
	Image,
	TouchableHighlight,
} from 'react-native';


export default class loginScreen extends Component {
	render() {
		return <View style={styles.container}>
			<Image
				source={require('../images/spiro_b.png')}
				style={styles.image}
			/>
			<TextInput
				style={{marginTop: 40}}
				placeholder='手机号'
			/>
			<TextInput
				secureTextEntry={true}
				style={{marginTop: 5}}
				placeholder={'密码'}
			/>
			<TouchableHighlight
				style={styles.textCenter}
			>
				<Text style={styles.button}>登录</Text>
			</TouchableHighlight>
			<View style={styles.row}>
				<View style={styles.left}>
					<Text
						onPress={() => alert('This is a 忘记密码!')}
					>忘记密码？</Text>
				</View>
				<View style={styles.right}>
					<Text
						onPress={() => alert('This is a 注册!')}
					>新用户注册</Text>
				</View>
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingLeft: 30,
		paddingRight: 30
	},
	textCenter: {
		height: 50,
		marginTop: 30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2ccaff'
	},
	image: {
		width: 50,
		height: 50,
		marginRight: 40,
		marginTop: 80,
	},
	button: {
		color: 'gray',
		fontSize: 20,
	},
	row: {
		flexDirection: 'row',
		marginTop: 10,
	},
	left: {
		flex: 0.5,
	},
	right: {
		flex: 0.5,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	}
});