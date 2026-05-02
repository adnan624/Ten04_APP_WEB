import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions }
  from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { LINKING_PREFIXES } from '../config/linking';
import LandingScreen  from '../screens/LandingScreen';
import HomeScreen     from '../screens/HomeScreen';
import FormScreen     from '../screens/FormScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: LINKING_PREFIXES,
  config: {
    screens: {
      Landing:  '',
      Home:     'dashboard',
      Form:     'contact',
      Settings: 'settings',
    },
  },
};

const screenOptions: NativeStackNavigationOptions = {
  headerStyle:      { backgroundColor: '#0c1120' },
  headerTintColor:  '#eef2ff',
  headerTitleStyle: { fontWeight: '700', fontSize: 17 },
  animation:        Platform.OS === 'web' ? 'none' : 'slide_from_right',
  contentStyle:     { backgroundColor: '#06070d' },
};

const AppNavigator: React.FC = () => (
  <>
    {Platform.OS === 'android' && (
      <StatusBar barStyle="light-content" backgroundColor="#0c1120" />
    )}
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="Landing" screenOptions={screenOptions}>
        {/* Landing has no header — it's the full-screen marketing page */}
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Form"
          component={FormScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);

export default AppNavigator;
