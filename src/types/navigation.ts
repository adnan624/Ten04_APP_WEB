import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Landing:  undefined;
  Home:     undefined;
  Form:     undefined;
  Settings: undefined;
};

export type LandingScreenProps  = NativeStackScreenProps<RootStackParamList, 'Landing'>;
export type HomeScreenProps     = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type FormScreenProps     = NativeStackScreenProps<RootStackParamList, 'Form'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
