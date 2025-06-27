// Home.jsx
import React, { useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Main.styles'; // Importing the merged style file

const Home = () => {
  const router = useRouter();
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('Token');
        // console.log(token);
        if (!token) {
          return; // No token found, stay on home screen
        }

        const response = await fetch(`${API_BASE_URL}/preload`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        // console.log(data);

        if (data.Status === 'Success' && data.isAuthenticated) {
          // Store user data if needed
          // await AsyncStorage.setItem('userData', JSON.stringify(data.userData));
          // Redirect to dashboard if authenticated
          router.replace('/DashBoard');
        }
      } catch (error) {
        console.error('Preload error:', error);
        // On error, we stay on the home screen
      }
    };

    checkAuthStatus();
  }, []);

  // Navigate to LoginPage when button is pressed
  const handlePress = () => {
    router.push('/(auth)/LoginPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Logo or Intro Image */}
      <View style={styles.containerz}>
        <Image
          source={require('../assets/PWD.png')} // App Logo or Branding
          style={styles.card1}
          resizeMode="cover"
        />
      </View>

      {/* Welcome Message and Continue Button */}
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to Pwd-E-JOB Recruitment App</Text>
        <View>
          <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
              styles.button,
              pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 },
            ]}
          >
            <Text style={styles.buttonText}>Continue?</Text>
          </Pressable>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

export default Home;

// ✅ Disable header for this screen
export const options = {
  headerShown: false,
};
