import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AuthLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginPage" />
          <Stack.Screen name="SignupPage" />
          <Stack.Screen name="MoreInfo" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default AuthLayout