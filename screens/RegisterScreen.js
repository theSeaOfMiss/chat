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
import constants from "../bin/constants";


var REQUEST_URL =  constants.website + '/register';

export default class RegisterScreen extends Component {
	username = '';    //  用户名
	password = '';    // 密码

	static navigationOptions = {
		title: '注册',
	};

	constructor(props) {
		super(props);
		this.state = { message: '' };
	}

	onUsernameChanged = (newUsername) => {
		// console.log(newUsername);//运行后可以在输入框随意输入内容并且查看log验证！
		this.username = newUsername;
	};

	onPasswordChanged = (newPassword) => {
		this.password = newPassword;
	};

	submit = () => {
		if (!this.username) {
			this.setState({message: '请输入用户名'});
			return;
		}

		if (!this.password) {
			this.setState({message: '请输入密码'});
			return;
		}

		fetch(REQUEST_URL, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: this.username,
				password: this.password,
			})
		}).then((response)=>{
			if (response.ok) {
				return response.json();
			}
		}).then((json)=>{
			this.setState({message: json.message});
		}).catch((error)=>{
			console.error(error);
		});

	};

	render() {
		return <View style={styles.container}>
			<Text
				style={styles.error}
			>{this.state.message}
			</Text>
			<TextInput
				style={{marginTop: 40}}
				placeholder='用户名'
				onChangeText={this.onUsernameChanged}  //添加值改变事件
			/>
			<TextInput
				secureTextEntry={true}
				style={{marginTop: 20}}
				placeholder={'密码'}
				onChangeText={this.onPasswordChanged}
			/>
			<TouchableHighlight
				style={styles.textCenter}
				onPress={this.submit}
			>
				<Text
					style={styles.button}
				>注册</Text>
			</TouchableHighlight>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white',
		paddingLeft: 30,
		paddingRight: 30
	},
	textCenter: {
		height: 50,
		marginTop: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2ccaff'
	},
	button: {
		color: 'gray',
		fontSize: 20,
	},
	error: {
		color: 'red'
	}
});
