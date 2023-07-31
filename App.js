/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {Provider} from 'react-native-paper';
import Home from './src/screens/Home';
import DetailsScreen from './src/screens/shop/DetailsScreen';
import Colors from './src/constants/Colors';
import DrawerNav1 from './src/screens/drawer/DrawerNav1';
import BottomTab01 from './src/screens/BottomTab01';
import BottomTab02 from './src/screens/BottomTab02';
import BottomTab03 from './src/screens/BottomTab03';
import BottomTab04 from './src/screens/BottomTab04';
import Dialog01 from './src/screens/Dialog01';
import List01 from './src/screens/List01';
import List02 from './src/screens/List02';
import List03 from './src/screens/List03';
import Wave01 from './src/screens/Wave01';
import Swiper01 from './src/screens/Swiper01';
import Swiper02 from './src/screens/Swiper02';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  return (
    <Provider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={Colors.white}
        />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

// 配置
const options = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

const Stack = createSharedElementStackNavigator();

/**路由栈 */
const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'React-Native-UI❤️', headerShown: true}}
      />
      {/* 底部导航 */}
      <Stack.Screen name="Tab1" component={BottomTab01} />
      <Stack.Screen name="Tab2" component={BottomTab02} />
      <Stack.Screen name="Tab3" component={BottomTab03} />
      <Stack.Screen name="Tab4" component={BottomTab04} />
      {/* 弹窗 */}
      <Stack.Screen name="Dialog1" component={Dialog01} />
      {/* 列表 */}
      <Stack.Screen name="List01" component={List01} />
      <Stack.Screen name="List02" component={List02} />
      <Stack.Screen name="List03" component={List03} />
      {/* 波浪 */}
      <Stack.Screen name="Wave01" component={Wave01} />
      {/* 轮播 */}
      <Stack.Screen name="Swiper01" component={Swiper01} />
      <Stack.Screen name="Swiper02" component={Swiper02} />
      {/*<Stack.Screen name="Tab2" component={AnimTab2} />
      <Stack.Screen name="Tab3" component={AnimTab3} />
      <Stack.Screen name="Tab4" component={Tab4} />
      <Stack.Screen name="Tab5" component={Tab5} />
      <Stack.Screen name="Contacts" component={ContactList} />
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Screen" component={Screen} />
      <Stack.Screen name="Products" component={ProductsList} /> */}
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      {/* <Stack.Screen name="Fab" component={Fab} />*/}
      <Stack.Screen name="Drawer1" component={DrawerNav1} />
    </Stack.Navigator>
  );
};

export default App;
