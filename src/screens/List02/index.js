import React, {useRef} from 'react';
import {StatusBar, Image, Animated, Text, View, StyleSheet} from 'react-native';
import faker from 'faker';

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: `item_${i}`,
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      'women',
      'men',
    ])}/${faker.datatype.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});
const BG_IMG =
  'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg';
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
export default function List02() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
      }}>
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={80}
      />
      <Animated.FlatList
        data={DATA}
        //将滚动位置offset.y与screenY值绑定,screenY就可以根据滚动实时更新。
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        extraData={item => item.key}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          //计算参数
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];
          const scale = scrollY.interpolate({
            inputRange: inputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                opacity,
                transform: [{scale}],
              }}>
              <Image
                source={{uri: item.image}}
                style={{width: 40, height: 40, borderRadius: AVATAR_SIZE}}
              />
              <View>
                <Text style={{fontSize: 22}}>{item.name}</Text>
                <Text style={{fontSize: 18}}>{item.jobTitle}</Text>
                <Text style={{fontSize: 14, opacity: 0.8}}>{item.email}</Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}
