import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, useWindowDimensions, ScrollView, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerformanceMetrics = () => {
  const [strength, setStrength] = useState('');
  const [speed, setSpeed] = useState('');
  const [strengthBarWidth] = useState(new Animated.Value(0)); // Animation for Strength
  const [speedBarWidth] = useState(new Animated.Value(0)); // Animation for Speed

  const { width, height } = useWindowDimensions(); // Responsive dimensions

  // Keys for AsyncStorage
  const STRENGTH_KEY = '@performance_strength';
  const SPEED_KEY = '@performance_speed';

  // Save inputs locally
  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STRENGTH_KEY, strength);
      await AsyncStorage.setItem(SPEED_KEY, speed);
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };

  // Load inputs when the screen is revisited
  const loadData = async () => {
    try {
      const savedStrength = await AsyncStorage.getItem(STRENGTH_KEY);
      const savedSpeed = await AsyncStorage.getItem(SPEED_KEY);

      if (savedStrength) setStrength(savedStrength);
      if (savedSpeed) setSpeed(savedSpeed);

      // Animate Bars based on loaded data
      if (savedStrength) {
        Animated.timing(strengthBarWidth, {
          toValue: parseInt(savedStrength),
          duration: 800,
          useNativeDriver: false,
        }).start();
      }

      if (savedSpeed) {
        Animated.timing(speedBarWidth, {
          toValue: parseInt(savedSpeed),
          duration: 800,
          useNativeDriver: false,
        }).start();
      }
    } catch (error) {
      console.error('Failed to load data', error);
    }
  };

  // Save and animate bars when "Save" button is pressed
  const handleSave = () => {
    if (!strength || strength == 0) { Alert.alert('Validation Error', 'Strength field is required!'); return; } if (!speed || speed == 0) { Alert.alert('Validation Error', 'Speed field is required!'); return; }

    saveData();

    // Animate Strength Bar
    Animated.timing(strengthBarWidth, {
      toValue: parseInt(strength),
      duration: 800,
      useNativeDriver: false,
    }).start();

    // Animate Speed Bar
    Animated.timing(speedBarWidth, {
      toValue: parseInt(speed),
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <StatusBar barStyle="light-content" backgroundColor="#5DB996" />
      <View style={[styles.container, { flexDirection: width > height ? 'row' : 'column' }]}>
        <View style={[styles.formContainer, { width: width > height ? '50%' : '100%' }]}>
          <Text style={styles.title}>Performance Metrics</Text>

          {/* Input for Maximum Strength */}
          <Text style={styles.label}>Maximum Strength (e.g.,  lifting weights)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter strength (e.g., 100)"
            keyboardType="numeric"
            value={strength}
            onChangeText={setStrength}
          />
          {/* Input for Maximum Speed */}
          <Text style={styles.label}>Maximum Speed (e.g., running pace)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter speed (e.g., 12)"
            keyboardType="numeric"
            value={speed}
            onChangeText={setSpeed}
          />

          {/* Save Button */}
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.chartContainer, { width: width > height ? '50%' : '100%', }]}>
          <View style={styles.chartSection}>
            <Text style={styles.chartLabel}>Strength Progress</Text>
            <Animated.View style={[styles.bar, { width: strengthBarWidth, maxWidth: '100%' }]} />
          </View>
          <View style={styles.chartSection}>
            <Text style={styles.chartLabel}>Speed Progress</Text>
            <Animated.View style={[styles.bar, { width: speedBarWidth, maxWidth: '100%' }]} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  formContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#5DB996',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: '1%',
    // borderWidth:1
  },
  chartSection: {
    marginTop: 20,
    overflow: 'hidden',
    // alignItems: 'center',
  },
  chartLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  bar: {
    height: 20,
    backgroundColor: '#5DB996',
    borderRadius: 8,
  },
});

export default PerformanceMetrics;
