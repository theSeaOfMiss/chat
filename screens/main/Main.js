import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	AsyncStorage,
	Button,
	Image,
} from 'react-native';

import {
	createStackNavigator,
	TabNavigator,
	TabBarBottom
} from 'react-navigation'

import FriendScreen from './FriendScreen'
import MessageScreen from './MessageScreen'
import MoreScreen from './MoreScreen'
import ChatScreen from "./ChatScreen"
import AddFriends from './AddFriends'
import Setting from './SettingScreen'

const MesNavs = createStackNavigator({
	Main: MessageScreen,
}, {
	initialRouteName: 'Main',
});

const FriNavs = createStackNavigator({
	Main: FriendScreen,
}, {
	initialRouteName: 'Main',
});

const MoreNavs = createStackNavigator({
	Main: MoreScreen,
}, {
	initialRouteName: 'Main',
});

const MainTab = TabNavigator({
	Mes: {
		screen: MesNavs,
		navigationOptions: {
			tabBarLabel: '消息',
			tabBarIcon: ({ tintColor, focused }) => (
				<Image resizeMode='contain'
				       source={require('../../images/message.png')}
				       style={[styles.footImage, {tintColor: tintColor}]}
				/>
			)
		}
	},
	Friend: {
		screen: FriNavs,
		navigationOptions: {
			tabBarLabel: '联系人',
			tabBarIcon: ({ tintColor, focused }) => (
				<Image resizeMode='contain'
				       source={require('../../images/friend.png')}
				       style={[styles.footImage, {tintColor: tintColor}]}
				/>
			)
		},
	},
	More: {
		screen: MoreNavs,
		navigationOptions: {
			tabBarLabel: '更多',
			tabBarIcon: ({ tintColor, focused }) => (
				<Image resizeMode='contain'
				       source={require('../../images/more.png')}
				       style={[styles.footImage, {tintColor: tintColor}]}
				/>
			)
		},
	},
}, {
	tabBarPosition: 'bottom',
	tabBarOptions: {
		activeTintColor: '#1e53ff', // 文字和图片选中颜色
		inactiveTintColor: '#999', // 文字和图片未选中颜色
		showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
		indicatorStyle: {
			height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
		},
		style: {
			backgroundColor: '#fff', // TabBar 背景色
			// height: 44
		},
		labelStyle: {
			fontSize: 10, // 文字大小
		},
	},
});

const root = createStackNavigator({
	Mainer: {
		screen: MainTab,
		navigationOptions:{
			header:null,
		},
	},
	Chat: ChatScreen,
	AddFriends: AddFriends,
	Set: Setting,
}, {
	initialRouteName: 'Mainer',
});

export default root;

const styles = StyleSheet.create({
	footImage: {
		height: 20,
	}
});

