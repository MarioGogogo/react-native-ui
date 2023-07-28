import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import tw from 'twrnc';
import profile from '../../../assets/profile.png';
import home from '../../../assets/home.png';
import search from '../../../assets/search.png';
import notifications from '../../../assets/bell.png';
import settings from '../../../assets/settings.png';
import logout from '../../../assets/logout.png';
import menu from '../../../assets/menu.png';
import close from '../../../assets/close.png';
import photo from '../../../assets/photo.jpg';
import {useNavigation} from '@react-navigation/native';
export default function SliderAnim() {
  const navigation = useNavigation();
  //初始化
  const [currentTab, setCurrentTab] = useState('Home');
  const [showMenu, setShowMenu] = useState(false);
  // 动画
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <View style={tw`p-2`}>
        <Image source={profile} style={tw`w-10 h-10 rounded-xl mt-8`} />
        <Text style={tw`text-[4] font-bold text-white mt-2`}>Jenna Ezarik</Text>
        <TouchableOpacity>
          <Text style={tw`mt-4 text-white`}>View Profile</Text>
        </TouchableOpacity>
        <View style={tw`flex-1`}>
          {renderButton(currentTab, setCurrentTab, 'Home', home)}
          {renderButton(currentTab, setCurrentTab, 'Search', search)}
          {renderButton(
            currentTab,
            setCurrentTab,
            'Notifications',
            notifications,
          )}
          {renderButton(currentTab, setCurrentTab, 'Settings', settings)}
        </View>
        <View>
          {renderButton(
            currentTab,
            setCurrentTab,
            'Logout',
            logout,
            navigation,
          )}
        </View>
      </View>
      {/* //over lay View */}
      <Animated.View
        style={[
          tw`flex-1 bg-white absolute top-0 bottom-0 left-0 right-0 px-4 py-4`,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            transform: [{scale: scaleValue}, {translateX: offsetValue}],
            borderRadius: showMenu ? 20 : 0,
          },
        ]}>
        {/* 按钮 */}
        <Animated.View
          style={{
            transform: [
              {
                translateY: closeButtonOffset,
              },
            ],
          }}>
          <TouchableOpacity
            onPress={() => {
              Animated.timing(scaleValue, {
                toValue: showMenu ? 1 : 0.88,
                duration: 300,
                useNativeDriver: true,
              }).start();
              Animated.timing(offsetValue, {
                toValue: showMenu ? 0 : 230,
                duration: 300,
                useNativeDriver: true,
              }).start();
              Animated.timing(closeButtonOffset, {
                toValue: !showMenu ? -10 : 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
              setShowMenu(!showMenu);
            }}>
            <Image
              source={showMenu ? close : menu}
              style={tw`w-4 h-4 mt-4 pl-4`}
            />
          </TouchableOpacity>
        </Animated.View>
        <Text style={tw`text-[6] mt-2 text-[#000]`}>{currentTab}</Text>
        <Image source={photo} style={tw`w-full h-80 rounded-xl mt-5`} />
        <Text style={tw`text-[6] font-bold text-[#000]`}>Jenna Ezarik</Text>
        <Text style={tw`text-[2] font-bold text-[#000]`}>
          Techie,YouTuber,PS Lover,Apple Sheep Sister
        </Text>
      </Animated.View>
    </View>
  );
}

const renderButton = (currentTab, setCurrentTab, title, image, navigation) => {
  const currentBg = currentTab === title ? 'bg-white rounded-xl' : '';
  const textColor = currentTab === title ? 'text-[#5359D1]' : 'text-white';
  return (
    <TouchableOpacity
      onPress={() => {
        if (title === 'Logout') {
          navigation.goBack();
          // navigation.goBack({name: 'Lucy'}); 还可以传参回去
        }
        setCurrentTab(title);
      }}>
      <View
        style={[
          tw`flex-row items-center  pl-3 pr-2 py-1.6 mt-2 ${currentBg}`,
          {},
        ]}>
        <Image
          source={image}
          style={[
            tw`h-4 w-4`,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              tintColor: currentTab === title ? '#5359D1' : '#fff',
            },
          ]}
        />
        <Text style={tw`text-[3] font-bold pl-2 ${textColor}`}>{title}</Text>
      </View>
    </TouchableOpacity>
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
