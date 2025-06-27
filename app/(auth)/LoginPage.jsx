// LoginPage.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styles from '../../styles/Main.styles'; // Using unified styles
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const router = useRouter();

  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
  
  // Check if API_BASE_URL is configured
  if (!API_BASE_URL) {
    console.error('API_BASE_URL is not configured in .env file');
    alert('Server configuration error. Please contact support.');
    return null;
  }

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle sign-in logic
  const handleSignIn = async () => {
    // console.log('Signing in with:', email, password);
    // console.log('API URL:', `${API_BASE_URL}/login-employee`); // Log the full URL FOR DEBUGING <------------------------------------------------------

    //API call to authenticate user
    try {
      const response = await fetch(`${API_BASE_URL}/login-employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.Status === 'Success') {
        // Store the token securely
        await AsyncStorage.setItem('Token', data.Token);
        
        // Navigate to Dashboard on success
        router.push('/DashBoard');
      } else {
        // Show the error message from the API
        alert(data.Message || 'Login failed');
      }
    } catch (error) {
      // console.error('Login error details:', {
      //   message: error.message,
      //   stack: error.stack,
      //   url: `${API_BASE_URL}/login-employee`
      // }); FOR DEBUGING <------------------------------------------------------
      
      if (error.message.includes('Network request failed')) {
        alert('Unable to connect to the server. Please check your internet connection and make sure the API server is running.');
      } else {
        alert(`Login error: ${error.message}`);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Header Title */}
          <Text style={styles.title}>WELCOME BACK!!</Text>

          {/* Card Container for Form */}
          <View style={styles.card}>
            {/* Email Input */}
            <TextInput
              placeholder="e.g . example@email.com"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Password Input */}
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            {/* Sign In Button */}
            <Pressable
              onPress={handleSignIn}
              style={({ pressed }) => [
                styles.button,
                pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 },
              ]}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>

            {/* Link to Sign Up */}
            <Pressable
              onPress={() => router.push('/SignupPage')}
              style={({ pressed }) => [
                pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 },
              ]}
            >
              <Text style={{ marginTop: 10, color: '#888' }}>
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
