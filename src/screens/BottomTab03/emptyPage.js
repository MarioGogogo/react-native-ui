import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function EmptyPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.midText}>emptyPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  midText: {
    fontSize: 29,
  },
});
