import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	TouchableHighlight,
	AsyncStorage,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView
} from 'react-native';

import constants from '../../bin/constants'
import {iniList} from "../../redux/actions/friends-list-action";
let REQUEST_URL = constants.website + '/chat';

import { connect } from 'react-redux';
import { iniRecords } from "../../redux/actions/chat-records-action";

class ChatScreen extends Component {
	flag = '';    //  用于区别自己和好友

	constructor(props) {
		super(props);
		this.state = {
			recordC: '',    // 聊天记录
			friend: '',   // 聊天对象
			text: '',   // 输入的聊天内容
		}
	}

	componentWillMount() {
		this.request();
	}

	static navigationOptions = ({navigation}) => {
		const { params } = navigation.state;
		return {
			title: params ? params.title : '聊天板块',
		}
	};

	request = () => {
		AsyncStorage.getItem('token', (err, token) => {    // 因为这个是异步所以无法将
			if (err) {
				console.log('获取token失败！');
				return
			}
			fetch(REQUEST_URL, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.props.navigation.state.params.title,
					mess: this.state.recordC,
					token: token,
				})
			}).then((response)=>{

				console.log(response);
				if (response.ok) {
					return response.json();
				}
			}).then((json)=>{

				console.log(json);
				// console.log(typeof(json.flag));
				this.flag = json.flag;
				this.props.dispatch(iniRecords(json.records));
				AsyncStorage.setItem('records', json.records.join('-'), function (err) {
					if (err) console.log(err);
				})

			}).catch((error)=>{
				alert(error);
			});
		});
	};


	onContentChange = (newContent) => {
		this.setState({text: newContent})
	};

	submit = () => {
		this.setState(previousState => {
			return {recordC: previousState.text, text: ''}});
		this.request();
	};

	render() {
		let that = this;
		return <KeyboardAvoidingView behavior='position' >
			<ScrollView style={styles.outerContainer} keyboardShouldPersistTaps = "always">

				<ScrollView style={styles.insideCont}>
					<View style={styles.container}>
						<View style={styles.topArea}>
							<Text style={{fontSize:28,color:'#998462',textAlign:'center',}}>Top Area</Text>
							{console.log(typeof(that.flag))}
							{this.props.chatRecords.record.map(function (record, key) {
								if (record.slice(0, 1) === that.flag) {
									return <View style={styles.right}  key={key}><Text style={styles.text} key={key}>{record.slice(1, -1)}</Text></View>
								} else {
									return <View style={styles.left} key={key}><Text style={styles.text2} key={key}>{record.slice(1, -1)}</Text></View>
								}
							})}
						</View>

						{/*<View style={styles.bottomArea}>*/}
						{/*<Text style={{fontSize:28,color:'#998462',textAlign:'center',}}>Bottom Area</Text>*/}
						{/*</View>*/}
					</View>
				</ScrollView>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						onChangeText={this.onContentChange}
						value={this.state.text}
					/>
					<TouchableHighlight
						style={styles.textCenter}
						onPress={this.submit}
					>
						<Text>发送</Text>
					</TouchableHighlight>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	}
}

const {height,width} =  Dimensions.get('window');
const styles = StyleSheet.create({
	outerContainer: {
		marginTop: 0,
		paddingTop: 0,
		height:height,
	},
	insideCont: {
		height: height*0.90,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	textInput: {
		borderRadius: 5,
		borderWidth: 1,
		height: 44,
		paddingHorizontal: 10,
	},
	input: {
		height: 40,
		marginLeft: 20,
		backgroundColor: 'white',
		flex: 7
	},
	textCenter: {
		flex: 1.5,
		height: 40,
		marginLeft: 5,
		marginRight: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2ccaff'
	},
	topArea: {
		height: 5000,
		backgroundColor:'white',
		// justifyContent:'center',
		// alignItems:'center'
	},
	inputContainer: {
		position: 'absolute',
		alignItems: 'center',
		width: width,
		height: 50,
		bottom: 10,
		flexDirection: 'row',
		backgroundColor: '#f6f7f9',
	},
	right: {
		flexDirection: 'row-reverse',
		height: 40,
	},
	left: {
		flexDirection: 'row',
		height: 40,
	},
	text: {
		height: 30,
		backgroundColor: 'red',
		fontSize: 20
	},
	text2: {
		height: 30,
		backgroundColor: 'blue',
		fontSize: 20
	},
	// bottomArea: {
	// 	height:20,
	// 	backgroundColor:'blue',
	// 	// justifyContent:'center',
	// 	// alignItems:'center',
	// }
});

const mapStateToProps = state => ({
	chatRecords: state.chatRecords
});

const mapDispatchToProps = dispatch => ({
	dispatch: dispatch
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatScreen);
