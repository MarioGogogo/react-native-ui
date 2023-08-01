import React, {
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Image, LayoutChangeEvent, StyleSheet, View, Text} from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Toast() {
  const [textLength, setTextLength] = useState(0);
  const [toastHeight, setToastHeight] = useState(0);
  const [config, setConfig] = useState({
    text: undefined,
    type: undefined,
    duration: 0,
  });

  const transY = useSharedValue(0);

  useEffect(() => {
    if (toastHeight) {
      transY.value = -toastHeight;
    }
  }, [toastHeight]);

  //根据type显示不同图标
  const generateImage = () => {
    if (config?.type === 'success') {
      return <Icon name={'success'} size={22} color={gengerateBgColor()} />;
    } else if (config?.type === 'error') {
      return <Icon name={'error'} size={22} color={gengerateBgColor()} />;
    } else {
      return <Icon name={'info'} size={22} color={gengerateBgColor()} />;
    }
  };

  const gengerateBgColor = () => {
    if (config?.type === 'success') {
      return '#1f8503';
    } else if (config?.type === 'error') {
      return '#f00a1d';
    } else {
      return '#0077ed';
    }
  };
  const handleViewLayout = event => {
    //高度
    setToastHeight(event.nativeEvent.layout.height);
  };
  return (
    <Animated.View onLayout={handleViewLayout} style={styles.container}>
      <View>
        {/* 图标 */}
        {generateImage()}
        {/* 文本 */}
        <Text>{config?.text}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
    marginHorizontal: 24,
  },
  outerContainer: {
    overflow: 'hidden',
    borderRadius: 40,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 40,
  },
  image: {
    width: 20,
    height: 20,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 12,
    textAlign: 'center',
  },
});
