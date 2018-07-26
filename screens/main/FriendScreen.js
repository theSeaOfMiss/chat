import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	AsyncStorage,
} from 'react-native';

import MulSelect from '../../lib/MulSelect'

import { connect } from 'react-redux';
import {addToLIST, iniList} from "../../redux/actions/friends-list-action";


import constants from '../../bin/constants'
let REQUEST_URL = constants.website + '/search';

class FriendScreen extends Component {

	addF = () => {
		alert('添加朋友！');
	};

	clickFriendName = (item) => {
		this.props.navigation.navigate('Chat', {title: item});
		
	};

	componentWillMount() {
		AsyncStorage.getItem('token', (err, token) => {    // 因为这个是异步所以无法将
			if (err) {
				console.log('FriendScreen页面获取token失败！');
				return
			}

			fetch(REQUEST_URL, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: token,
				})
			}).then((response)=>{
				if (response.ok) {
					return response.json();
				}
			}).then((json)=>{
				//console.log(json);
				if(json.friends) {
					//console.log(json.friends);
					this.props.dispatch(iniList(json.friends));
					AsyncStorage.setItem('friends',
						json.friends.join('-'),
						(err) => {
							if (err) {
								console.log(err);
							}
						}
					);
				}
			}).catch((error)=>{
				console.log(error);
			});
		})
	}
	// componentDidMount() {
	// 	//在static中使用this方法
	// 	this.props.navigation.setParams({navigatePress: this.addF});
	// 	AsyncStorage.getItem('friends', (err, result) => {
	// 		if (err) {alert('获取好友列表失败！')}
	//
	// 		this.props.dispatch(addToLIST(result.split('-')));
	// 	})
	// }

	static navigationOptions = ({navigation, screenProps}) => ({
		headerTitle: '联系人',
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
			/>
		),
		headerRight: (
			<TouchableOpacity
				onPress={()=>navigation.navigate('AddFriends')}
			>
				<Image
					source={require('../../images/add_user_L.png')}
					style={{ width:40 ,height: 40}}
				/>
			</TouchableOpacity>
		),
		});
	render() {
		return (
			<View style={{flex: 1}}>
				<MulSelect
					sections={[
						{title: '特别关心', data: ['Devin', 'Dnihao']},
						{title: '我的好友', data: this.props.friendsList.list},
					]}
					cliT={this.clickFriendName}
				/>
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

const mapStateToProps = state => ({
	friendsList: state.friendsList
});

const mapDispatchToProps = dispatch => ({
	dispatch: dispatch
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FriendScreen);