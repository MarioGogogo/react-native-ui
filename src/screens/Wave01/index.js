import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {MotiView} from '@motify/components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Easing} from 'react-native-reanimated';
const COLOR = '#6e01ef';
const SIZE = 100;

export default function Wave01() {
  return (
    <View style={styles.container}>
      <View style={[styles.dot, styles.center]}>
        {/* 三条波浪 */}
        {[...Array(3).keys()].map((_, i) => {
          return (
            <MotiView
              key={i}
              style={[StyleSheet.absoluteFillObject, styles.dot]}
              from={{opacity: 0.7, scale: 1}}
              animate={{opacity: 0, scale: 4}}
              transition={{
                type: 'timing',
                duration: 2000,
                easing: Easing.out(Easing.ease),
                loop: true, //循环
                repeatReverse: true, //循环
                delay: i * 400,
              }}
            />
          );
        })}
        <Icon name={'phone'} size={32} color={'#ccc'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: COLOR,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
