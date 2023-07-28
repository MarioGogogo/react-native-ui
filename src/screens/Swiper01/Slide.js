import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const COLORS = {primary: '#282534', white: '#fff'};
const Slide = ({item}) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{alignItems: 'center'}}>
      <Image
        source={item?.image}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{height: '75%', width, resizeMode: 'contain'}}
      />
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});

export default Slide;
