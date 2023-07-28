import React from 'react';
import {View, StyleSheet} from 'react-native';
import tw from 'twrnc';
import {NavigationContainer, BottomTabBar} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EmptyScreen from './emptyScreen';
import TabBarAdvancedButton from './TabBarAdvancedButton';

const BottomBar = createBottomTabNavigator();

export default function TabBar({barColor}) {
  return (
    <View style={tw`w-full h-full`}>
      <BottomBar.Navigator
        tabBar={props => (
          <View style={styles.navigatorContainer}>
            <BottomTabBar {...props} />
          </View>
        )}
        tabBarOptions={{
          showIcon: true,
          style: styles.navigator,
          tabStyle: {
            backgroundColor: barColor,
          },
        }}>
        <BottomBar.Screen
          name="Profile"
          component={EmptyScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="user" size={24} color={color} />
            ),
          }}
        />
        <BottomBar.Screen
          name="face"
          component={EmptyScreen}
          options={{
            tabBarButton: props => (
              <TabBarAdvancedButton bgColor={barColor} {...props} />
            ),
          }}
        />

        <BottomBar.Screen
          name="Messages"
          component={EmptyScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="wechat" size={24} color={color} />
            ),
          }}
        />
        <BottomBar.Screen
          name="Settings"
          component={EmptyScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="gear" size={24} color={color} />
            ),
          }}
        />
      </BottomBar.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 30,
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
  },
});
