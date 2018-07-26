import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	TouchableHighlight,
	AsyncStorage
} from 'react-native';

import constants from "../bin/constants";
let REQUEST_URL = constants.website + '/login';


export default class LoginScreen extends Component {
	username = '';    //  用户名
	password = '';    // 密码

	static navigationOptions = {
		title: '登入',
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

			if (json.message) {
				this.setState({message: json.message});
			} else {
				AsyncStorage.setItem('token',
					json.token,
					(err) => {
						if (err) {
							this.setState({message: '登入失败，请尝试重新登入！'});
						}
					}
					);
				this.props.navigation.navigate('Main');
			}
		}).catch((error)=>{
			this.setState({message: error});
		});

	};

	render() {
		return <View style={styles.container}>
			<Image
				source={require('../images/spiro_b.png')}
				style={styles.image}
			/>
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
				<Text style={styles.button}>登录</Text>
			</TouchableHighlight>
			<View style={styles.row}>
				<View style={styles.left}>
					<Text
						onPress={() => alert('忘记密码!')}
					>忘记密码？</Text>
				</View>
				<View style={styles.right}>
					<Text
						onPress={() => this.props.navigation.navigate('Register')}
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
		marginTop: 50,
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
	},
	error: {
		marginTop: 20,
		color: 'red'
	}
});