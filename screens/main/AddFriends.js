import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	Dimensions,
	AsyncStorage,
} from 'react-native';

import { connect } from 'react-redux';
import {iniList} from "../../redux/actions/friends-list-action";

import constants from '../../bin/constants'
let REQUEST_URL = constants.website + '/add';

class AddFriends extends Component{
	username = '';    // 搜索的用户名

	constructor(props) {
		super(props);
		this.state = {
			message: '',
		}
	}

	static navigationOptions = {
		title: '添加',
	};

	onUsernameChanged = (name) => {
		this.username = name;
	};

	search = () => {
		if (!this.username) {
			this.setState({message: '请输入用户名'});
			return;
		}

		AsyncStorage.getItem('token', (err, token) => {    // 因为这个是异步所以无法将
			if (err) {
									this.setState({message: '登入失败，请尝试重新登入！'});
				 					return
			}

			fetch(REQUEST_URL, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.username,
					token: token,
				})
			}).then((response)=>{
				if (response.ok) {
					return response.json();
				}
			}).then((json)=>{
					this.setState({message: json.message});
					console.log(json);

					if(json.friends) {
						console.log(json.friends);
						this.props.dispatch(iniList(json.friends));
						AsyncStorage.setItem('friends',
							json.friends.join('-'),
							(err) => {
								if (err) {
									this.setState({message: '发生错误，请刷新好友页面试试！'});
								}
							}
						);
					}
			}).catch((error)=>{
				this.setState({message: error});
			});
		});
	};

	render() {
		return <View style={styles.container}>
			<TextInput
				style={styles.input}
				onChangeText={this.onUsernameChanged}
				placeholder={'🔍用户名'}
				onEndEditing={this.search}
			/>
			<Text>{this.state.message}</Text>
		</View>
	}
}

const {height,width} =  Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingLeft: 30,
		paddingRight: 30
	},
	input: {
		height: 40,
		width: width,
	}
});

const mapStateToProps = state => ({
	friendsList: state.friendsList
});

const mapDispatchToProps = dispatch => ({
	dispatch: dispatch
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddFriends);


