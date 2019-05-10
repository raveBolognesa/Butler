import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import Login from '../components/Login';
import Signup from '../components/Signup';
import SplashPage from '../components/SplashPage';
import ProductCreate from '../components/ProductCreate';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Splash: SplashPage,
  Signup: Signup,
  ProductCreate: ProductCreate
},
{
  initialRouteName: 'Splash',
}));
