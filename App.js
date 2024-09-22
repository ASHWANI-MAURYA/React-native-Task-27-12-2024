
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, View, Alert, StyleSheet, Linking, StatusBar, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from '@react-native-community/netinfo';
import ErrorPage from './ErrorPage.js';
import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [isConnected, setIsConnected] = useState(null);
  const [CurrentUrl, setCurrentUrl] = useState('https://appskvt.charvns.com/');
  const injectedJavaScript = `
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'viewport');
  meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  document.getElementsByTagName('head')[0].appendChild(meta);
  true;
`;
  useEffect(() => {
    if (CurrentUrl === 'https://shrikashiprasadam.com/') {
      // Alert.alert('url is changed')
      // Ensure the spinner is shown before navigating
      setShowSpinner(true);
      // Delay the URL change to ensure spinner is visible
      // setTimeout(() => {
      Linking.openURL('https://shrikashiprasadam.com/');
      const redirectScript = "window.location.href = 'https://appskvt.charvns.com/';";
      webViewRef.current.injectJavaScript(redirectScript);
      // }, 100); // Adjust the delay if needed
    }

    if (CurrentUrl === 'https://www.instagram.com/shrikashivishwanath/') {
      setShowSpinner(true);
      Linking.openURL('https://www.instagram.com/shrikashivishwanath/');
      const redirectScript = "window.location.href = 'https://appskvt.charvns.com/';";
      webViewRef.current.injectJavaScript(redirectScript);
    }

    if (CurrentUrl.substring(0, 18) == 'https://m.facebook') {
      setShowSpinner(true);
      Linking.openURL(CurrentUrl);
      const redirectScript = "window.location.href = 'https://appskvt.charvns.com/';";
      webViewRef.current.injectJavaScript(redirectScript);
    }

    if (CurrentUrl === 'https://twitter.com/ShriVishwanath') {
      setShowSpinner(true);
      Linking.openURL('https://twitter.com/ShriVishwanath');
      const redirectScript = "window.location.href = 'https://appskvt.charvns.com/';";
      webViewRef.current.injectJavaScript(redirectScript);
    }

    if (CurrentUrl === 'https://api.whatsapp.com/send/?phone=918528996606&text&type=phone_number&app_absent=0') {
      setShowSpinner(true);
      Linking.openURL('https://api.whatsapp.com/send/?phone=918528996606&text&type=phone_number&app_absent=0');
      const redirectScript = "window.location.href = 'https://appskvt.charvns.com/';";
      webViewRef.current.injectJavaScript(redirectScript);
    }

  }, [CurrentUrl]);
  const handleLoadStart = () => {
    setShowSpinner(true);
  };

  const handleLoadEnd = () => {
    setShowSpinner(false);
  };

  const handleError = () => {
    setShowSpinner(false);
    Alert.alert('Error', 'An error occurred while loading the page.');
  };

  const handleLoadProgress = ({ nativeEvent }) => {
    if (nativeEvent.progress === 1) {
      setShowSpinner(false);
    }
  };

  const resetScrollPosition = () => {
    webViewRef.current.injectJavaScript(`window.scrollTo(0, 0);true;`);
  };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    const onBackPress = () => {
      if (canGoBack) {
        webViewRef.current.goBack();
        return true; // Prevent default behavior (exit app)
      }
      if (CurrentUrl === 'https://appskvt.charvns.com/BookingOrderList') {
        const redirectScript = "window.location.href = 'https://appskvt.charvns.com/';";
        webViewRef.current.injectJavaScript(redirectScript);
      }
      if (CurrentUrl === 'https://appskvt.charvns.com/DonationList') {
        const redirectScript = "window.location.href = 'https://appskvt.charvns.com/';";
        webViewRef.current.injectJavaScript(redirectScript);
      }
      if (CurrentUrl === 'https://appskvt.charvns.com/') {
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
      } else {
        webViewRef.current.goBack();
      }
      return true; // Prevent default behavior (exit app)
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      unsubscribe();
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [canGoBack, CurrentUrl]);

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
    <SafeAreaView style={styles.safeArea}>
      {/* Translucent StatusBar */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Gradient View for StatusBar */}
      <LinearGradient
        colors={['#FF5733', '#FFBD33']} // Define your gradient colors here
        style={styles.gradient}
      />
      <Spinner
        visible={showSpinner}
        textContent={'Please Wait ..'}
        textStyle={{ color: '#FFF', fontWeight: '400' }}
        size="large"
        color="#bb5533"
      />
      <WebView
        source={{ uri: 'https://appskvt.charvns.com/' }}
        ref={webViewRef}
        onNavigationStateChange={navState => {
          const { url } = navState;
          setCurrentUrl(url);
          if (url === 'https://secure.ccavenue.com/cancelTransaction') {
            if (webViewRef.current) {
              const redirectScript = "window.location.href = 'https://appskvt.charvns.com/';";
              webViewRef.current.injectJavaScript(redirectScript);
            }
          }
          if (!navState.loading) {
            setShowSpinner(false);
            resetScrollPosition();
          }
        }}
        injectedJavaScript={injectedJavaScript}
        onLoadStart={handleLoadStart}
        onLoadEnd={() => {
          handleLoadEnd();
          resetScrollPosition();
        }}
        onError={handleError}
        onHttpError={handleError} // Handles HTTP errors
        onLoadProgress={handleLoadProgress}
      />
    </SafeAreaView>
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
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StatusBar.currentHeight, // Height of the status bar area
  },
});