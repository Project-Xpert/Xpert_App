import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Landing from './src/page/Landing/Landing';
import Login from './src/page/Login/Login';
import Signup from './src/page/Signup/Signup';
import Home from './src/page/Home/Home';
import EmailCode from './src/page/Signup/EmailCode';
import SignupDetail from './src/page/Signup/SignupDetail';
import {SafeAreaView} from 'react-native';
import {colorStyles} from './src/assets/styles/color';

const Stack = createStackNavigator();
const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colorStyles.defaultWhite}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            gestureEnabled: false,
            headerShown: false,
          }}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="EmailCode" component={EmailCode} />
          <Stack.Screen name="SignupDetail" component={SignupDetail} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
