import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// 空列表
import EmptyPage from './emptyPage';

import AddPage from './addPage';

// 生成tab实例化
const Tab = createBottomTabNavigator();

export default function BottomTab02() {
  return (
    <Tab.Navigator
      initialRouteName="Home" // 默认首页
      screenOptions={{
        headerShown: false, // 隐藏头
        tabBarShowLabel: false, // 隐藏标签
        showIcon: true, // 显示图标
        tabBarStyle: styles.tabBar, // 样式
      }}>
      <Tab.Screen
        name={'Home'}
        component={EmptyPage}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({color, size}) => (
            <View style={styles.tabIconContainner}>
              <Icon name={'home'} size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Search'}
        component={EmptyPage}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({color, size}) => (
            <View style={styles.tabIconContainner}>
              <Icon name={'search'} size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Add'}
        component={EmptyPage}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarButton: props => <AddPage {...props} />,
        }}
      />
      <Tab.Screen
        name={'Face'}
        component={EmptyPage}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({color, size}) => (
            <View style={styles.tabIconContainner}>
              <Icon name={'face'} size={size} color={color} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'Setting'}
        component={EmptyPage}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({color, size}) => (
            <View style={styles.tabIconContainner}>
              <Icon name={'fingerprint'} size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    padding: 0,
    left: 16,
    right: 16,
    bottom: 32,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderTopColor: 'transparent',
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
  addbutton_box: {
    position: 'relative',
    width: 56,
    height: 56,
  },
  tabIconContainner: {
    position: 'absolute',
    top: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
