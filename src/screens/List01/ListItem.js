import {memo} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const ListItem = memo(({item, viewableItems}) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter(x => x.isViewable)
        .find(viewableItem => viewableItem.item.id === item.id),
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Animated.View style={[styles.item, rStyle]} />
  );
});

export default ListItem;

const styles = StyleSheet.create({
  item: {
    height: 80,
    width: '90%',
    backgroundColor: '#78CAD2',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20,
  },
});
