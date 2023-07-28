import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Transition, Transitioning } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TabComponent({ label, accessibilityState, onPress }) {
  const ref = useRef();
  const focused = accessibilityState.selected;
  console.log('%c Line:8 🍬 focused', 'font-size:18px;color:#ffffff;background:#6666FF', focused);

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={0} />
      <Transition.Change interpolation="easeInOut" durationMs={100} />
      <Transition.In type="fade" durationMs={10} />
    </Transition.Sequence>
  );

  // const icon = !focused ? Images.icons[label] : Images.icons[`${label}Focused`];
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log('focused', label, focused);
        ref.current.animateNextTransition();
        onPress();
      }}
    >
      <Transitioning.View style={styles.itemIcon} focused={focused} label={label} ref={ref} transition={transition}>
        <Icon name={label} size={22} color={'#ccc'} />
        <Text>{label}</Text>
      </Transitioning.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  itemIcon: {
    flex: 1,
    // width: 60,
    // height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // borderRadius: 100,
    margin: 6,
  },
  trans_view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // background: ${(props) => (props.focused ? bgColors[props.label] : 'white')};
    // borderRadius: 100,
    margin: 6,
  },
});
