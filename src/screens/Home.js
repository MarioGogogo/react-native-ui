import React from 'react';
import {List} from 'react-native-paper';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const leftIcon = () => {
  return () => <Icon name="folder" size={24} color="#ccc" />;
};

const rightIcon = () => {
  return () => <Icon name="expand-more" size={24} color="#ccc" />;
};

const Home = ({navigation}) => {
  const navigate = route => navigation.navigate(route);
  return (
    <View>
      <List.Accordion title="底部栏导航" left={leftIcon()} right={rightIcon()}>
        <List.Item title="底部导航1" onPress={() => navigate('Tab1')} />
        <List.Item title="底部动画导航2" onPress={() => navigate('Tab2')} />
        <List.Item title="底部动画导航3" onPress={() => navigate('Tab3')} />
        <List.Item title="底部动画导航4" onPress={() => navigate('Tab4')} />
        {/* <List.Item title="Animatable Tab1" onPress={() => navigate('Tab1')} />
        <List.Item title="Animatable Tab2" onPress={() => navigate('Tab2')} />
        <List.Item title="Animatable Tab3" onPress={() => navigate('Tab3')} />
        <List.Item title="Animatable Tab4" onPress={() => navigate('Tab4')} />
        <List.Item title="Animatable Tab5" onPress={() => navigate('Tab5')} /> */}
      </List.Accordion>
      <List.Accordion title="弹窗" left={leftIcon()} right={rightIcon()}>
        <List.Item title="弹窗01" onPress={() => navigate('Dialog1')} />
      </List.Accordion>
      <List.Accordion title="列表动画" left={leftIcon()} right={rightIcon()}>
        <List.Item title="列表1" onPress={() => navigate('List01')} />
        <List.Item title="列表2" onPress={() => navigate('List02')} />
        <List.Item title="列表3" onPress={() => navigate('List03')} />
      </List.Accordion>
      <List.Accordion title="波浪" left={leftIcon()} right={rightIcon()}>
        <List.Item title="电话响了" onPress={() => navigate('Wave01')} />
      </List.Accordion>
      <List.Accordion title="轮播动画" left={leftIcon()} right={rightIcon()}>
        <List.Item title="轮播01" onPress={() => navigate('Swiper01')} />
        <List.Item title="轮播02" onPress={() => navigate('Swiper02')} />
      </List.Accordion>
      <List.Accordion
        title="Floating Action Button"
        left={leftIcon()}
        right={rightIcon()}>
        <List.Item title="Animated Fab" onPress={() => navigate('Fab')} />
      </List.Accordion>
      <List.Accordion title="抽屉导航" left={leftIcon()} right={rightIcon()}>
        <List.Item title="侧边栏抽屉" onPress={() => navigate('Drawer1')} />
        <List.Item title="Drawer 2" onPress={() => navigate('Drawer2')} />
      </List.Accordion>
    </View>
  );
};

export default Home;
