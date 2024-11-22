import 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store, persistor } from 'store';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import theme from './custom.theme';
import { ToastProvider } from 'react-native-toast-notifications'
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Router from 'Router';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, }}>

      <ToastProvider>

        <View style={{ flex: 1, backgroundColor: "#fff" }} >
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>

            <StatusBar style="dark" translucent />

            <ReduxProvider store={store}>
              <PersistGate loading={<LoadingMarkup />} persistor={persistor}>

                <Router />

              </PersistGate>
            </ReduxProvider>

          </ApplicationProvider>

        </View>

      </ToastProvider>
    </GestureHandlerRootView>
  );
}

const LoadingMarkup = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: "#fff"
    }}>
    <ActivityIndicator size="large" color="#009dff" />
  </View>
);