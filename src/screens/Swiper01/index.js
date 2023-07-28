import React, {useRef, useCallback, useState} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import Slide from './Slide';
const {width, height} = Dimensions.get('window');
const COLORS = {primary: '#282534', white: '#fff'};
//数据
const SLIDE = [
  {
    id: '1',
    image: require('../../../assets/image1.png'),
    title: 'Best Digital Solution',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '2',
    image: require('../../../assets/image2.png'),
    title: 'Achieve Your Goals',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '3',
    image: require('../../../assets/image3.png'),
    title: 'Increase Your Value',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export default function Swiper01() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != SLIDE.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = SLIDE.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* 轮播点 */}
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          {SLIDE.map((_, index) => {
            return (
              <Animated.View
                key={index}
                style={[
                  styles.indicator,
                  currentSlideIndex == index && {
                    backgroundColor: COLORS.white,
                    width: 25,
                  },
                  // eslint-disable-next-line react-native/no-inline-styles
                ]}
              />
            );
          })}
        </View>
        <FotterButton />
      </View>
    );
  };

  const FotterButton = () => {
    return (
      <View style={{marginBottom: 20}}>
        {currentSlideIndex == SLIDE.length - 1 ? (
          <View style={{height: 50}}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.replace('HomeScreen')}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={skip}
              style={[
                styles.btn,
                {
                  borderColor: COLORS.white,
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                },
              ]}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: COLORS.white,
                }}>
                SKIP
              </Text>
            </TouchableOpacity>
            <View style={{width: 15}} />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={goToNextSlide}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        horizontal
        data={SLIDE}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: '#fff',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
