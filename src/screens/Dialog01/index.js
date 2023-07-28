import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';

export default function Dialog01() {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const {height} = Dimensions.get('window');
  // 遮罩层
  const color = animation.interpolate({
    inputRange: [0, 0.2, 1.8, 2],
    outputRange: [
      'rgba(255, 255, 255, 0.0)',
      'rgba(45, 57, 82, 0.5)',
      'rgba(45, 57, 82, 0.8)',
      'rgba(255, 255, 255, 0.0)',
    ],
  });
  //===========动画效果==================
  const openModal = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp', // extrapolate: 'clamp'
  });
  const saveModal = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [0, -height],
    extrapolate: 'clamp', // extrapolate: 'clamp'
  });
  //===========动画效果==================
  const modalTrigger = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false, //是否使用原生驱动
    }).start();
  };

  const close = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false, //是否使用原生驱动
    }).start();
  };

  const save = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 500,
      useNativeDriver: false, //是否使用原生驱动
    }).start(() => {
      animation.setValue(0);
    });
  };

  const open = {
    transform: [{scale: openModal}, {translateY: saveModal}],
  };
  const background = {
    backgroundColor: color,
  };

  return (
    <View style={[styles.container, styles.center]}>
      <View style={[styles.shadowButton, styles.center]}>
        <TouchableOpacity
          style={[styles.mainButton, styles.center]}
          onPress={modalTrigger}>
          <Text style={[styles.text]}>Open</Text>
        </TouchableOpacity>
      </View>
      {/* 弹窗 */}
      <Animated.View
        style={[styles.background, background]}
        pointerEvents={'box-none'}>
        <Animated.View style={[styles.background, open]}>
          <View style={[styles.wrap]}>
            <Text style={[styles.text, styles.helloText]}>Hello !</Text>
            <Text style={[styles.text, styles.moreText]}>
              We love react. It's the best mobile UI framework. We are gonna be
              the best deve lopers. Learn react ever
            </Text>
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.modalButton, styles.center]}
                onPress={close}>
                <Text style={[styles.text]}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.center]}
                onPress={save}>
                <Text style={[styles.text]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 24,
  },
  modalButton: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    borderColor: '#fff',
    marginTop: 64,
    borderWidth: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 25,
    paddingRight: 25,
    marginHorizontal: 5,
    flex: 1,
  },
  moreText: {
    textAlign: 'center',
    marginTop: 64,
  },
  helloText: {
    fontSize: 51.2,
    textAlign: 'center',
    marginTop: 20,
  },
  wrap: {
    padding: 20,
    margin: 20,
    borderRadius: 8,
    backgroundColor: '#2d3953',
    shadowColor: '#4048bf',
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
  },
  text: {
    fontSize: 28.8,
    color: '#ecf0f9',
    fontWeight: '600',
    fontFamily: 'Avenir',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowButton: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 105,
    width: 210,
    height: 80,
    shadowColor: '#4048bf',
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
  },
  mainButton: {
    zIndex: 10,
    width: 200,
    height: 70,
    borderRadius: 100,
    shadowColor: '#4048bf',
    shadowOffset: {
      width: 6.4,
      height: 6.4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    backgroundColor: '#2d3953',
  },
  container: {
    flex: 1,
    backgroundColor: '#F6F7EB',
  },
});
