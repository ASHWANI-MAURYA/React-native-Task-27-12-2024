import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Animated, Easing } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'

const Error = () => {
    const [showSpinner, setShowSpinner] = useState(true);
    const [retryClicked, setRetryClicked] = useState(false);
    
    const buttonAnimation = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const timeout = setTimeout(() => setShowSpinner(false), 2000);
        return () => clearTimeout(timeout);
    }, []);

    // Animate button on press
    const animateButton = () => {
        setRetryClicked(true);
        Animated.sequence([
            Animated.timing(buttonAnimation, {
                toValue: 1.2,
                duration: 200,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(buttonAnimation, {
                toValue: 1,
                duration: 200,
                easing: Easing.ease,
                useNativeDriver: true,
            })
        ]).start(() => {
            setRetryClicked(false);
            setShowSpinner(true);
        });
    };

    return (
        <ImageBackground 
            source={require('./src/Image/Background.png')} 
            style={styles.background}
        >
            {/* Show Spinner Overlay while loading */}
            <Spinner
                visible={showSpinner}
                textContent={'Please Wait ..'}
                textStyle={styles.spinnerText}
                size="large"
                color="#ff4747"
            />

            {/* Error Message Section */}
            <View style={styles.overlay}>
                <Image 
                    source={require('./src/Image/Connectivity.png')} 
                    style={styles.image} 
                    resizeMode="contain"
                />
                <Text style={styles.errorText}>Oops! No Internet Connection</Text>
                <Text style={styles.subText}>Please check your connection and try again.</Text>

                {/* Retry Button with Animation */}
                <Animated.View style={{ transform: [{ scale: buttonAnimation }] }}>
                    <TouchableOpacity 
                        onPress={animateButton} 
                        style={[styles.retryButton, retryClicked && { backgroundColor: '#ff7373' }]}
                    >
                        <Text style={styles.retryButtonText}>
                            {retryClicked ? 'RETRYING...' : 'RETRY'}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </ImageBackground>
    );
}

export default Error;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinnerText: {
        color: '#FFF',
        fontWeight: '500',
    },
    overlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        padding: 30,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        opacity: 0.9,
    },
    errorText: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 22,
        marginBottom: 10,
        textAlign: 'center',
    },
    subText: {
        color: '#555',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
    },
    retryButton: {
        backgroundColor: '#ff4747',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        letterSpacing: 1,
    },
});
