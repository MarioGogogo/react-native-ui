import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AddPage({props}) {
  //设置打开和关闭
  const [opened, setOpened] = useState(false);
  //设置动画
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    //动画函数
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      friction: 1, //加速度
      useNativeDriver: false, //是否使用原生驱动
    }).start();
  }, [opened, animation]);
  return (
    <TouchableWithoutFeedback {...props} style={styles.addbutton_container}>
      <View style={styles.addbutton_box}>
        {/* 浮动按钮三个 */}
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.addItem,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -30],
                    }),
                  },
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}>
            <Icon name={'get-app'} size={22} color={'#fff'} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.addItem,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -55],
                    }),
                  },
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}>
            <Icon name={'translate'} size={22} color={'#fff'} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[
              styles.addItem,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -30],
                    }),
                  },
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}>
            <Icon name={'room'} size={22} color={'#fff'} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={styles.addButtonInner}
          activeOpacity={1}
          onPress={() => setOpened(!opened)}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],
                  }),
                },
              ],
            }}>
            <Icon name={'add'} size={22} color={'#fff'} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
  addItem: {
    position: 'absolute',
    backgroundColor: '#534db2',
    borderRadius: 27,
    width: 40,
    height: 40,
    top: -22,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonInner: {
    top: -22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#534db2',
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
