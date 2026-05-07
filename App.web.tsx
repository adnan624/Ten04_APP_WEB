// Web build: no HotUpdater (webpack hot reload already does this, and the
// native module isn't available on web). Webpack picks this file because
// `.web.tsx` comes before `.tsx` in resolve.extensions.
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => (
  <SafeAreaProvider>
    <AppNavigator />
  </SafeAreaProvider>
);

export default App;
