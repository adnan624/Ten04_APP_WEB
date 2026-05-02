import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  // Skip SafeAreaProvider on web — its DOM measurement pass can
  // block the initial render and cause a blank screen
  if (Platform.OS === 'web') {
    return <AppNavigator />;
  }
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
