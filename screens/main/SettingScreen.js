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



export default class MoreScreen extends Component {
	static navigationOptions = {
		headerTitle: '设置',
	};

	signOut = () => {
		AsyncStorage.clear(function (err) {
			if (err) console.log(err);
		});
		this.props.navigation.navigate('Login')
	};

	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<	TouchableOpacity
					onPress={this.signOut}
				>
					<Text>退出应用</Text>
				</TouchableOpacity>
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

