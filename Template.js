import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function Template() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on you app !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
