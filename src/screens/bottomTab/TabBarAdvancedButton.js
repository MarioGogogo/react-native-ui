import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import TabBg from './tabBg';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function TabBarAdvancedButton({bgColor, ...props}) {
  <TouchableOpacity style={styles.container} {...props}>
    <View style={styles.box}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        {/* <Icon name="face" size={24} color="#F6F7EB" /> */}
        <View style={styles.addButtonInner}>
          <Text>1</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
    {/* <TabBg color={bgColor} style={styles.background} /> */}
  </TouchableOpacity>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: 0,
  },
  background: {
    position: 'absolute',
    top: 0,
  },
  box: {
    position: 'relative',
    width: 60,
    height: 60,
    marginTop: -30,
  },
  // button: {
  //   top: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: 50,
  //   height: 50,
  //   borderRadius: 27,
  //   backgroundColor: '#E94F37',
  // },
  // buttonIcon: {
  //   fontSize: 26,
  //   color: '#F6F7EB',
  // },
  addButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    width: 50,
    height: 50,
  },
});
