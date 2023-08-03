/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
//列表高度
const ITEM_HEIGHT = 56;
const {width: DEVICE_WIDTH} = Dimensions.get('window');
const DELETE_BUTTON_WIDTH = DEVICE_WIDTH * 0.3;
//阈值
const SWIPE_THRESHOLD = DELETE_BUTTON_WIDTH;
//整个内容坐标
// const context = {
//   translateX: 0,
//   prevX: 0,
//   temp: 0,
// };
export default function FoodItem({data, onRemove, open, onSwipeOpenChange}) {
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);
  const transX = useSharedValue(0);
  const viewHeight = useSharedValue(ITEM_HEIGHT);

  useEffect(() => {
    if (!open) {
      console.log('open:', open);
      onClose();
    }
  }, [open]);
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.translateX = transX.value;
      context.temp = 0;
    },
    onActive: (event, context) => {
      //阻止 向右滑动
      const isSwipingLeft = context.prevX
        ? context.prevX >= event.translationX
        : true;
      console.log(
        '%c Line:44 🥪 isSwipingLeft',
        'font-size:18px;color:#ffffff;background:#ff6b6b',
        context.translateX,
        isSwipingLeft,
      );

      if (transX.value >= 0 && !isSwipingLeft) {
        transX.value = 0;
        return;
      }
      if (-transX.value > SWIPE_THRESHOLD && isSwipingLeft) {
        //模拟阻力 到达阈值之后拖动很慢
        const temp =
          (event.translationX + context.translateX) * 0.005 + transX.value;
        transX.value = withTiming(temp, {duration: 0});
        context.temp = temp;
      } else if (context.temp) {
        transX.value = transX.value - (context.prevX - event.translationX);
      } else {
        transX.value = event.translationX + context.translateX;
      }
      context.prevX = event.translationX;
    },
    onEnd: event => {
      //未拉倒阈值
      if (-event.translationX < SWIPE_THRESHOLD / 2) {
        transX.value = withTiming(0, {duration: 300, easing: Easing.quad});
      } else {
        console.log('拉倒阈值了', onSwipeOpenChange);
        transX.value = withTiming(
          -SWIPE_THRESHOLD,
          {
            duration: 300,
            easing: Easing.quad,
          },
          isFinished => {
            if (isFinished) {
              console.log(
                '%c Line:104 🥒 isFinished',
                'font-size:18px;color:#ffffff;background:#6666FF',
                isFinished,
              );
              runOnJS(onSwipeOpenChange)(data.id);
            }
          },
        );
      }
    },
  });

  //滑动过程中偏移量
  const rInnerContainer = useAnimatedStyle(() => {
    return {
      transform: [{translateX: transX.value}],
    };
  }, [transX.value]);

  const rDeleteViewStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      -transX.value,
      [0, DELETE_BUTTON_WIDTH * 0.6, DELETE_BUTTON_WIDTH],
      [1, 0.8, 1.2],
      Extrapolation.CLAMP,
    );
    return {
      width: -transX.value,
      height: ITEM_HEIGHT,
      // transform: [{scale}],
    };
  }, [transX.value]);

  const rTextContainer = useAnimatedStyle(() => {
    return {
      width: -transX.value,
    };
  }, [transX.value]);

  const rMinusIcon = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        -transX.value,
        [
          0,
          DELETE_BUTTON_WIDTH * 0.4,
          DELETE_BUTTON_WIDTH * 0.6,
          DELETE_BUTTON_WIDTH,
        ],
        [0, 0.4, 0.7, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          scale: interpolate(
            -transX.value,
            [0, DELETE_BUTTON_WIDTH * 0.4, DELETE_BUTTON_WIDTH * 0.7],
            [0, 0.5, 1.3],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, [transX.value]);

  const rRemove = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        -transX.value,
        [
          0,
          DELETE_BUTTON_WIDTH * 0.8,
          DELETE_BUTTON_WIDTH,
          DELETE_BUTTON_WIDTH * 1.5,
          DELETE_BUTTON_WIDTH * 2.0,
        ],
        [0, 0, 1, 1, 0],
        Extrapolation.CLAMP,
      ),
    };
  }, [transX.value]);

  const rRemoving = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        -transX.value,
        [DELETE_BUTTON_WIDTH * 1.5, DELETE_BUTTON_WIDTH * 2.0],
        [0, 1],
        Extrapolation.CLAMP,
      ),
    };
  }, [transX.value]);

  //容器删除动画
  const rDeleteContainer = useAnimatedStyle(() => {
    return {
      height: withTiming(viewHeight.value, {duration: 300}, () => {
        if (viewHeight.value === 0) {
          //回调
          onRemove && runOnJS(onRemove)(data.id);
        }
      }),
      opacity: withTiming(viewHeight.value === 0 ? 0 : 1, {duration: 300}),
    };
  }, [viewHeight.value]);

  const handlePress = () => {
    transX.value = withSpring(-DEVICE_WIDTH, {duration: 200}, () => {
      viewHeight.value = 0;
    });
  };

  const onClose = () => {
    transX.value = withSpring(0, {duration: 10});
  };

  return (
    // item容器动画
    <Animated.View style={[styles.container, rDeleteContainer]}>
      {/*删除icon */}
      <View style={styles.deleteContainer}>
        <Animated.View
          style={[styles.deleteInnerContainer, rDeleteViewStyles]}
        />
        <AnimatedTouchableOpacity
          style={[styles.textContainer, rTextContainer]}
          onPress={handlePress}>
          <Animated.Text style={[styles.minusIcon, rMinusIcon]}>
            <Icon name={'backspace'} size={24} color={'#fff'} />
          </Animated.Text>
          <Animated.Text style={[styles.remove, rRemove]}>
            REMOVE ITEM
          </Animated.Text>
          <Animated.Text style={[styles.remove, rRemoving]}>
            REMOVING
          </Animated.Text>
        </AnimatedTouchableOpacity>
      </View>
      {/* 滑动手势区域 */}
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={[styles.innerContainer, rInnerContainer]}>
          <View style={styles.quantityContainer}>
            <Text>{data.quantity}</Text>
          </View>
          <View style={styles.itemsContainer}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.amount}>{data.amount}</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: ITEM_HEIGHT,
    paddingHorizontal: 20,
  },
  deleteContainer: {
    position: 'absolute',
    right: 0,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
    width: DELETE_BUTTON_WIDTH,
  },
  deleteInnerContainer: {
    position: 'absolute',
    backgroundColor: '#ff5050',
    // borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    height: ITEM_HEIGHT,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusIcon: {
    fontSize: 26,
    color: 'white',
    fontWeight: '600',
  },
  remove: {
    position: 'absolute',
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  quantityContainer: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 12,
  },
  amount: {
    textAlign: 'right',
  },
});
