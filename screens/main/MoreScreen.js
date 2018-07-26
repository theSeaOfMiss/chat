import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import {addToLIST} from "../../redux/actions/friends-list-action";



export default class MoreScreen extends Component {

	static navigationOptions = ({navigation, screenProps}) => ({
		headerTitle: '更多',
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
			<TouchableOpacity
				onPress={()=>navigation.navigate('Set')}
			>
				<Image
					source={require('../../images/clover_L.png')}
					style={{ width:40 ,height: 40}}
				/>
			</TouchableOpacity>
		),
	});
	render() {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>更多</Text>
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

