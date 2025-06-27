// app/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const MainScreenLayout = () => {
return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="DashBoard" />
                <Stack.Screen name="ApplicationHistory" />
                <Stack.Screen name="inbox" />
                <Stack.Screen name="Settings" />
                <Stack.Screen name="notification" />
            </Stack>
        </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default MainScreenLayout