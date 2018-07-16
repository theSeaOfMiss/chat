import {
	createStackNavigator,
} from 'react-navigation'

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import Main from './screens/main/Main'

const root = createStackNavigator({
	Login: LoginScreen,
	Register: RegisterScreen,
	Main: Main,
}, {
	initialRouteName: 'Login',
});


export default root;
