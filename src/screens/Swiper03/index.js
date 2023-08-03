/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback, useRef} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import ListItem from './ListItem';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';

const TITLES = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍🏼 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo',
];

const TASKS = TITLES.map((title, index) => ({title, index}));
const BACKGROUND_COLOR = '#FAFBFF';
export default function Swiper03() {
  const [tasks, setTasks] = useState(TASKS);
  const onDismiss = useCallback(task => {
    console.log('删除了-----', task);
    setTasks(tasks => tasks.filter(item => item.index !== task.index));
  }, []);
  const scrollRef = useRef(null);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Tasks</Text>
        <ScrollView ref={scrollRef} style={{flex: 1}}>
          {tasks.map(task => (
            <ListItem
              simultaneousHandlers={scrollRef}
              key={task.index}
              task={task}
              onDismiss={onDismiss}
            />
          ))}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: '5%',
  },
});
