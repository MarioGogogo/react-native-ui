/* eslint-disable react-native/no-inline-styles */
import {fa} from 'faker/lib/locales';
import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
const COLOR = '#5359D1';

// const DATA = new Array(10).fill(0).map((_, i) => ({id: i}));

export default function Template() {
  const [items, setItems] = useState(
    new Array(5).fill(0).map((_, i) => ({id: i})),
  );
  //改变动画
  const onAdd = useCallback(() => {
    setItems(currentItems => {
      const nextItemID = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;
      return [...currentItems, {id: nextItemID}];
    });
  }, []);
  const onDelete = useCallback(id => {
    setItems(currentItems => {
      return currentItems.filter(item => item.id !== id);
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingHorizontal: 0}}>
        {items.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeIn.delay(index * 100)} //当item 添加的时候 不同动画效果
            exiting={FadeOut}
            layout={Layout.delay(100)}
            onTouchEnd={() => onDelete(item.id)}
            style={styles.listItem}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.floatButton} onPress={onAdd}>
        <Icon name={'add'} size={52} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7EB',
  },
  listItem: {
    width: '90%',
    height: 100,
    backgroundColor: COLOR,
    borderRadius: 15,
    marginVertical: 10,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 20,
  },
  floatButton: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: 'red',
    borderRadius: 40,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
