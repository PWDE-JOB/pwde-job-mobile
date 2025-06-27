// SignUpPage.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import styles from '../../styles/Main.styles'; // Unified styling
import { useRouter } from 'expo-router';

const SignUp = () => {
  const router = useRouter();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle sign-up button press
  const handleSignUp = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Navigate to MoreInfo screen with entered data
    router.push({
      pathname: '/(auth)/MoreInfo',
      params: { 
        name, 
        email, 
        password 
      }
    });
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
        {/* Title */}
        <Text style={styles.title}>Sign Up</Text>

        {/* Card with form inputs */}
        <View style={styles.card}>
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="words"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          {/* Sign Up Button */}
          <Pressable
            onPress={handleSignUp}
            style={({ pressed }) => [
              styles.button,
              pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 },
            ]}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>

          {/* Navigation to Login */}
          <Pressable
            onPress={() => router.push('/LoginPage')}
            style={({ pressed }) => [
              pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 },
            ]}
          >
            <Text style={{ marginTop: 10, color: '#888' }}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
