import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FoodItem from './FoodItem';
import {FlatList} from 'react-native-gesture-handler';

const FOOD_ITEMS = [
  {
    id: 1,
    name: 'Chicken Fried Rice',
    amount: 'LKR 2,100.00',
    quantity: 2,
  },
  {
    id: 2,
    name: 'Devilled Chicken(Boneless)',
    amount: 'LKR 1,700.00',
    quantity: 1,
  },
  {
    id: 4,
    name: 'Milk Shake',
    amount: 'LKR 700.00',
    quantity: 4,
  },
];
export default function Swiper04() {
  const [allItems, setAllItems] = useState(FOOD_ITEMS);
  const flatListRef = useRef(null);
  const panRef = useRef(null);

  const renderItem = ({item}) => {
    return <FoodItem data={item} onRemove={handleRemove} />;
  };

  const handleRemove = id => {
    setAllItems(prevState => prevState.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.topView}>
          <Text style={styles.yourItems}>Your items</Text>
          <Text style={styles.seeMenu}>see menu</Text>
        </View>
        <FlatList
          ref={flatListRef}
          data={allItems}
          simultaneousHandlers={panRef}
          keyExtractor={(_item, _) => _item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F7EB',
  },
  innerContainer: {
    height: 200,
    width: '100%',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 6,
  },
  yourItems: {
    fontSize: 16,
    fontWeight: '500',
  },
  seeMenu: {
    color: 'green',
    fontWeight: '500',
  },
});
