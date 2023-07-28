/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import TailwindApproachList from './src/TailwindApproachList';
import SiderAnim from './src/SiderAnim';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <TailwindApproachList /> */}
      <SiderAnim />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5359D1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default App;
