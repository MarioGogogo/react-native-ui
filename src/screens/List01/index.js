/* eslint-disable react/react-in-jsx-scope */
import {FlatList, StyleSheet, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import ListItem from './ListItem';

const data = new Array(50).fill(0).map((_, index) => ({id: index}));

export default function App() {
  const viewableItems = useSharedValue([]);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{paddingTop: 40}}
        onViewableItemsChanged={({viewableItems: vItems}) => {
          viewableItems.value = vItems;
        }}
        renderItem={({item}) => {
          // eslint-disable-next-line react/react-in-jsx-scope
          return <ListItem item={item} viewableItems={viewableItems} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
