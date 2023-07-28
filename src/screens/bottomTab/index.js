import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../constants/Colors';

import EmptyScreen from './emptyScreen';
import TabBarAdvancedButton from './TabBarAdvancedButton';

const Tab = createBottomTabNavigator();

const AddButton = props => {
  return (
    <TouchableWithoutFeedback {...props} style={styles.addbutton_container}>
      <View style={styles.addbutton_box}>
        <View style={styles.addButtonInner}>
          <Icon name={'add'} size={22} color={'#fff'} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home" // 默认首页
      screenOptions={{
        headerShown: false, // 隐藏头
        tabBarShowLabel: false, // 隐藏标签
        showIcon: true, // 显示图标
        tabBarStyle: styles.tabBar, // 样式
      }}>
      {/* 三个图标 */}
      <Tab.Screen
        name={'Home'}
        component={EmptyScreen}
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
        component={EmptyScreen}
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
        component={EmptyScreen}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarButton: props => <AddButton {...props} />,
        }}
      />
      <Tab.Screen
        name={'Face'}
        component={EmptyScreen}
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
        component={EmptyScreen}
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
    backgroundColor: '#F6F7EB',
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
    // backgroundColor: 'blue',
  },
  // navigatorContainer: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   shadowColor: '#222',
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.22,
  //   shadowRadius: 2.22,
  // },
  navigator: {
    borderTopWidth: 0,
    // backgroundColor: 'transparent',
    elevation: 30,
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
  },
  tabIconContainner: {
    position: 'absolute',
    top: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addbutton_container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    flex: 1,
    height: 0,
    position: 'absolute',
    shadowColor: '#222',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  addButtonInner: {
    top: -22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E94F37',
    borderRadius: 27,
    width: 50,
    height: 50,
    shadowColor: '#7f5df0',
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
});
