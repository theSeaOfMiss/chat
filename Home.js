import {
	createStackNavigator,
} from 'react-navigation'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import Main from './screens/main/Main'



const home = createStackNavigator({
	Login: LoginScreen,
	Register: RegisterScreen,
	Main: {
		screen:Main,
		navigationOptions:{
			header:null,
		}}
}, {
	initialRouteName: 'Login',
});

import Friend from './screens/main/FriendScreen'


// export default home;
export default home;

