import React, {
  Ref,
  forwardRef,
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
  timing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Toast = forwardRef((props, ref) => {
  const [textLength, setTextLength] = useState(0);
  const [toastHeight, setToastHeight] = useState(0);
  const [config, setConfig] = useState({
    text: undefined,
    type: undefined,
    duration: 0,
  });

  //设置y初始值
  const transY = useSharedValue(0);
  const transX = useSharedValue(0);
  const visibleState = useSharedValue(false);

  useEffect(() => {
    if (config.text && toastHeight && textLength) {
      transX.value = textLength + 12;
      console.log('渲染到字符长度', textLength);
      showToast();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, toastHeight, textLength]);
  useEffect(() => {
    if (toastHeight) {
      transY.value = -toastHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastHeight]);

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  const show = (text, type, duration) => {
    setConfig({
      text,
      type,
      duration,
    });
  };

  const rView = useAnimatedStyle(() => {
    return {
      transform: [{translateY: transY.value}],
    };
  }, []);

  const rOutView = useAnimatedStyle(() => {
    return {
      transform: [{translateX: -transX.value / 2}],
    };
  }, []);
  const rInnerView = useAnimatedStyle(() => {
    return {
      transform: [{translateX: transX.value}],
    };
  }, []);

  const showToast = () => {
    // 如果字没有显示 则显示出来
    if (!visibleState.current) {
      visibleState.current = true;
      transY.value = withSpring(40, {duration: config.duration});
      transX.value = withDelay(
        config.duration,
        withTiming(0, {duration: config.duration}),
      );
    }
  };

  const hide = callback => {
    // 先缩短
    transX.value = withTiming(textLength + 12, {duration: config.duration});
    // 再升上去
    transY.value = withDelay(
      config.duration + 100,
      withSpring(
        -toastHeight,
        {
          duration: config.duration,
          easing: Easing.bezier(0.36, 0.0, 0.66, -0.56),
        },
        () => {
          runOnJS(handleOnFinish)(callback);
        },
      ),
    );
  };

  const handleOnFinish = callback => {
    setConfig({
      text: undefined,
      type: undefined,
      duration: 0,
    });
    //执行回调
    if (callback) {
      setTimeout(() => {
        callback();
      }, 0);
    }
    visibleState.current = false;
  };

  //根据type显示不同图标
  //根据type显示不同图标
  const generateImage = () => {
    if (config?.type === 'success') {
      return <Icon name={'check-circle'} size={24} color={'#fff'} />;
    } else if (config?.type === 'error') {
      return <Icon name={'cancel'} size={24} color={'#fff'} />;
    } else {
      return <Icon name={'app-registration'} size={24} color={'#fff'} />;
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
  const handleTextLayout = event => {
    setTextLength(Math.floor(event.nativeEvent.layout.width));
  };
  return (
    <Animated.View
      onLayout={handleViewLayout}
      style={[styles.container, rView]}>
      <Animated.View style={[styles.outerContainer, rOutView]}>
        <Animated.View
          style={[
            styles.innerContainer,
            {backgroundColor: gengerateBgColor()},
            rInnerView,
          ]}>
          {/* 图标 */}
          {generateImage()}
          {/* 文本 */}
          <Text onLayout={handleTextLayout} style={styles.text}>
            {config?.text}
          </Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
});

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
    // transform: [{translateX: -70 / 2}],
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 40,
    // transform: [{translateX: 70}],
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
export default Toast;
