import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
const LIST_ITEM_HEIGHT = 70;
export default function ListItem({task, onDismiss, simultaneousHandlers}) {
  const translateX = useSharedValue(0);

  const {width: SCREEN_WIDTH} = Dimensions.get('window');
  //侧滑的删除 阈值
  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.1;
  const marginVertical = useSharedValue(10);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const opacity = useSharedValue(1);
  //手势
  const panGesture = useAnimatedGestureHandler({
    onActive: event => {
      //阻止从左往右滑动
      if (event.translationX > 0) return;
      translateX.value = event.translationX;
      console.log('event.translationX---', event.translationX);
    },
    onEnd: () => {
      //滑动到阈值 可以静止不动
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        //回调
        opacity.value = withTiming(0, undefined, isFinished => {
          //如果没有这个回调 改变list数据 我们只是改变了布局
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  //手势触发样式
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  // 图标透明度
  const rIconContainerStyle = useAnimatedStyle(() => {
    // eslint-disable-next-line no-shadow
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return {opacity};
  });
  // 整个item动画
  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });
  return (
    <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
      {/* 图标隐藏在列表下面 */}
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <Icon name={'backspace'} size={24} color={'red'} />
      </Animated.View>
      <PanGestureHandler
        onGestureEvent={panGesture}
        simultaneousHandlers={simultaneousHandlers}>
        <Animated.View style={[styles.task, rStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    alignItems: 'center',
  },
  task: {
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'white',
    borderRadius: 6,
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
    // marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
