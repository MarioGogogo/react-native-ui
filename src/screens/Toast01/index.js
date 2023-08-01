import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Toast from './Toast';
export default function Toast01() {
  const toastRef = useRef();
  const showInfo = () => {
    //通过ref获取toast 隐藏之前的实例
    toastRef.current?.hide(() => {
      //通过ref获取toast 打开toast
      toastRef.current?.show('Posting...', 'info', 400);
    });
  };
  const showSuccess = () => {
    toastRef.current?.hide(() => {
      toastRef.current?.show('Posted', 'success', 400);
    });
  };
  const showError = () => {
    toastRef.current?.hide(() => {
      toastRef.current?.show('Ops, something is wrong!', 'error', 400);
    });
  };
  const hide = () => {
    toastRef.current?.hide();
  };
  function handleHide() {
    console.log('toast is hidden');
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Toast ref={toastRef} onHide={handleHide} />
      <TouchableOpacity style={styles.infoButton} onPress={showInfo}>
        <Text style={styles.text}>INFO Toast</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.successButton} onPress={showSuccess}>
        <Text style={styles.text}>SUCCESS Toast</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.errorButton} onPress={showError}>
        <Text style={styles.text}>ERROR Toast</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.hideButton} onPress={hide}>
        <Text style={styles.text}>Hide Toast</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#01113b',
  },
  infoButton: {
    backgroundColor: '#0077ed',
    borderRadius: 10,
    width: '80%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  successButton: {
    backgroundColor: '#1f8503',
    borderRadius: 10,
    width: '80%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  errorButton: {
    backgroundColor: '#f00a1d',
    borderRadius: 10,
    width: '80%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  hideButton: {
    backgroundColor: 'grey',
    borderRadius: 10,
    width: '80%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
});
