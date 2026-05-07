// react-native-web's Alert.alert is a no-op — use the host alert when present
const showPlatformAlert = (title: string, message: string): void => {
  const g = globalThis as typeof globalThis & { alert?: (message?: string) => void };
  g.alert?.(`${title}\n\n${message}`);
};
export default showPlatformAlert;
