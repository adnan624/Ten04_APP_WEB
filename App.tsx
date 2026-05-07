import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HotUpdater } from '@hot-updater/react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => (
  <SafeAreaProvider>
    <AppNavigator />
  </SafeAreaProvider>
);

// On native, wrap with HotUpdater so release builds fetch JS updates on launch.
// In DEBUG (Metro), HotUpdater.wrap is a no-op — Metro hot reload still works.
// In RELEASE, it checks `baseURL` for a newer JS bundle and applies it on next launch.
//
// `baseURL` is filled in automatically by `npx hot-updater init` once you
// pick a storage provider (Supabase / R2 / S3 / Firebase).
export default HotUpdater.wrap({
  baseURL: 'https://oaifutdpfcajirxhvgaf.supabase.co/functions/v1/update-server',
  updateStrategy: 'appVersion',
  updateMode: 'auto',
  fallbackComponent: ({ progress, status }) => (
    <View style={{
      flex: 1,
      backgroundColor: '#06070d',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    }}>
      <ActivityIndicator size="large" color="#0ea5e9" />
      <Text style={{ color: '#eef2ff', marginTop: 16, fontSize: 16, fontWeight: '600' }}>
        {status === 'UPDATING' ? 'Updating Ten04…' : 'Checking for updates…'}
      </Text>
      {progress > 0 && (
        <Text style={{ color: '#8ba0be', marginTop: 6, fontSize: 13 }}>
          {Math.round(progress * 100)}%
        </Text>
      )}
    </View>
  ),
})(App);
