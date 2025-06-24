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
import InvestHome from './src/page/Invest/InvestHome';
import AccountDetail from './src/page/Invest/account/AccountDetail';
import CreateAccountList from './src/page/Invest/account/CreateAccountList';
import CreateDepositDetail from './src/page/Invest/account/CreateDepositDetail';
import NewsHome from './src/page/news/NewsHome';
import NewsDetail from './src/page/news/NewsDetail';
import TradeGold from './src/page/Invest/gold/TradeGold';
import SocialHome from './src/page/social/SocialHome';
import PostList from './src/page/social/PostList';
import FXDetail from './src/page/Invest/FX/FXDetail';
import TradeFX from './src/page/Invest/FX/TradeFX';
import Mypage from './src/page/Mypage/Mypage';
import PostDetail from './src/page/social/PostDetail';
import CreatePost from './src/page/social/CreatePost';
import CreateSavingDetail from './src/page/Invest/account/CreateSavingDetail';
import SuccessCreateAccount from './src/page/Invest/account/SuccessCreateAccount';
import useModalData from './src/data/modalData';
import AutoTransferSetting from './src/page/Invest/account/AutoTransferSetting';
import FriendHome from './src/page/social/friend/FriendHome';
import FriendDetail from './src/page/social/friend/FriendDetail';
import SendMoney from './src/page/social/friend/SendMoney';
import StockDetail from './src/page/Invest/stock/StockDetail';
import TradeStock from './src/page/Invest/stock/TradeStock';

const Stack = createStackNavigator();
const App = () => {
  const {modalEnabled} = useModalData();

  const safeAreaViewStyle = {
    flex: 1,
    backgroundColor: modalEnabled
      ? colorStyles.transparentBackground
      : colorStyles.defaultWhite,
  };

  return (
    <SafeAreaView style={safeAreaViewStyle}>
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
          <Stack.Screen
            name="Home"
            component={Home}
            options={{animation: 'fade'}}
          />
          <Stack.Screen
            name="Invest"
            component={InvestHome}
            options={{animation: 'fade'}}
          />
          <Stack.Screen
            name="News"
            component={NewsHome}
            options={{animation: 'fade'}}
          />
          <Stack.Screen
            name="Social"
            component={SocialHome}
            options={{animation: 'fade'}}
          />
          <Stack.Screen
            name="Mypage"
            component={Mypage}
            options={{animation: 'fade'}}
          />
          <Stack.Screen name="AccountDetail" component={AccountDetail} />
          <Stack.Screen
            name="AutoTransferSetting"
            component={AutoTransferSetting}
          />
          <Stack.Screen
            name="CreateDepositDetail"
            component={CreateDepositDetail}
          />
          <Stack.Screen
            name="CreateSavingDetail"
            component={CreateSavingDetail}
          />
          <Stack.Screen
            name="CreateAccountList"
            component={CreateAccountList}
          />
          <Stack.Screen
            name="SuccessCreateAccount"
            component={SuccessCreateAccount}
          />
          <Stack.Screen name="TradeGold" component={TradeGold} />
          <Stack.Screen name="NewsDetail" component={NewsDetail} />
          <Stack.Screen name="PostList" component={PostList} />
          <Stack.Screen name="FXDetail" component={FXDetail} />
          <Stack.Screen name="TradeFX" component={TradeFX} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen name="Friend" component={FriendHome} />
          <Stack.Screen name="FriendDetail" component={FriendDetail} />
          <Stack.Screen name="SendMoney" component={SendMoney} />
          <Stack.Screen name="StockDetail" component={StockDetail} />
          <Stack.Screen name="TradeStock" component={TradeStock} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
