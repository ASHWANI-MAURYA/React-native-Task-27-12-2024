import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, View, Alert, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import ErrorPage from './ErrorPage';

const App = () => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    const onBackPress = () => {
      if (canGoBack) {
        webViewRef.current.goBack();
        return true; // Prevent default behavior (exit app)
      } else {
        Alert.alert(
          'Exit App',
          'Do you want to exit the app?',
          [
            {
              text: 'No',
              onPress: () => null,
              style: 'cancel'
            },
            {
              text: 'Yes',
              onPress: () => BackHandler.exitApp()
            }
          ],
          { cancelable: false }
        );
        return true; // Prevent default behavior (exit app)
      }
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      unsubscribe();
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [canGoBack]);

  if (isConnected === null) {
    return (
      <View style={styles.container}>
        <ErrorPage />
      </View>
    );
  }

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <ErrorPage />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={showSpinner}
        textContent={'Please Wait ..'}
        textStyle={{ color: '#FFF', fontWeight: '400' }}
        size="large"
        color="#bb5533"
      />
      <WebView
        source={{ uri: 'https://divya.charvns.com/' }}
        onLoadStart={() => setShowSpinner(true)}
        onLoad={() => setShowSpinner(false)}
        onError={() => setShowSpinner(false)}
        ref={webViewRef}
        onNavigationStateChange={navState => {
          setCanGoBack(navState.canGoBack);
          if (navState.url === 'https://divya.charvns.com/') {
            setCanGoBack(false);
          }
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
  },
});