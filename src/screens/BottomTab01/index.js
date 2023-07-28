import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// 空列表
import EmptyScreen from './emptyScreen';

// 生成tab实例化
const Tab = createBottomTabNavigator();

// 中间浮动按钮 TouchableWithoutFeedback 不会因为定位而偏移
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

export default function BottomTab01() {
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
