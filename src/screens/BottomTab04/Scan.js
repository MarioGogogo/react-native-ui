import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function Template() {
  return (
    <View style={styles.container}>
      <Text>SCAN!</Text>
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
