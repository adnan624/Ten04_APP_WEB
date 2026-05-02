// react-native-web's Alert.alert is a no-op — use window.alert instead
const showPlatformAlert = (title: string, message: string): void => {
  window.alert(`${title}\n\n${message}`);
};
export default showPlatformAlert;
