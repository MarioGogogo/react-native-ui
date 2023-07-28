import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EmptyPage from './emptyPage';
import TabComponent from './TabComponent';
const Tab = createBottomTabNavigator();
export default function BottomTab03() {
  return (
    <Tab.Navigator
      initialRouteName="Home" // 默认首页
      screenOptions={{
        headerShown: true, // 隐藏头
        tabBarShowLabel: true, // 隐藏标签
        showIcon: true, // 显示图标
        tabBarStyle: styles.tabBar, // 样式
      }}>
      <Tab.Screen
        name="Home"
        component={EmptyPage}
        options={{
          tabBarButton: props => <TabComponent label="home" {...props} />,
        }}
      />
      <Tab.Screen
        name="Adb"
        component={EmptyPage}
        options={{
          tabBarButton: props => <TabComponent label="adb" {...props} />,
        }}
      />
      <Tab.Screen
        name="Addchart"
        component={EmptyPage}
        options={{
          tabBarButton: props => <TabComponent label="addchart" {...props} />,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={EmptyPage}
        options={{
          tabBarButton: props => <TabComponent label="menu" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    // position: 'absolute',
    // padding: 0,
    // left: 16,
    // right: 16,
    // bottom: 32,
    // height: 56,
    // borderRadius: 16,

    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    borderTopColor: 'transparent',
  },
});
