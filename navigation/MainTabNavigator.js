import * as React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CharacterScreen from '../screens/CharacterScreen';

const CharacterStack = createStackNavigator({
  Character: CharacterScreen,
});

CharacterStack.navigationOptions = {
  tabBarLabel: 'Character',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-man' : 'md-man'}
    />
  ),
};

export default createBottomTabNavigator({
  CharacterStack,
});
