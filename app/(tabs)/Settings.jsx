// Settings.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Pressable, Alert } from 'react-native';
import styles from '../../styles/settings.styles';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('Token');
      
      if (!token) {
        // If no token exists, just redirect to login
        router.replace('/(auth)/LoginPage');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.Status === 'Success') {
        // Clear stored token
        await AsyncStorage.removeItem('Token');
        // Clear any other stored user data
        await AsyncStorage.removeItem('userData');
        // Redirect to login page
        router.replace('/(auth)/LoginPage');
      } else {
        Alert.alert('Logout Failed', data.Message || 'Failed to logout. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert(
        'Logout Error',
        'Failed to logout. Please check your connection and try again.'
      );
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: handleLogout,
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <Pressable 
            onPress={() => router.push('/updateProf')} 
            style={({ pressed }) => [styles.settingItem, pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 }]}
          >  
            <Text style={styles.settingText}>Edit Profile</Text>
          </Pressable>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.settingItemRow}>
            <Text style={styles.settingText}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>

          <View style={styles.settingItemRow}>
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Help Center</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>About</Text>
          </TouchableOpacity>

          <Pressable 
            onPress={() => router.push('/AccessabilityFeatures')} 
            style={({ pressed }) => [styles.settingItem, pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 }]}
          > 
            <Text style={styles.settingText}>Accessibility Features</Text>
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Pressable 
            onPress={confirmLogout} 
            style={({ pressed }) => [styles.logoutButton, pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 }]}
          > 
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
