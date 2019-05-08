import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import Login from '../components/Login';
import SplashPage from '../components/SplashPage';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Login:  Login,
  Splash: SplashPage
},
{
  initialRouteName: 'Splash',
}));