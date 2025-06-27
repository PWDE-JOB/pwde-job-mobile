import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/accFeature.styles';
import { useRouter } from 'expo-router';

const AccessabilityFeatures = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Accessibility Features</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Theme Section */}
        <Text style={styles.sectionTitle}>Select Theme</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity style={[styles.themeButton, { backgroundColor: '#ffffff' }]}>
            <Text style={styles.themeLabel}>Light</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.themeButton, { backgroundColor: '#000000' }]}>
            <Text style={[styles.themeLabel, { color: '#fff' }]}>Dark</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.themeButton, { backgroundColor: '#b2d8d8' }]}>
            <Text style={styles.themeLabel}>Teal</Text>
          </TouchableOpacity>
        </View>

        {/* Text Size Section */}
        <Text style={styles.sectionTitle}>Text Size</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity style={styles.textSizeButton}>
            <Text style={styles.textSizeSmall}>A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textSizeButton}>
            <Text style={styles.textSizeMedium}>A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textSizeButton}>
            <Text style={styles.textSizeLarge}>A</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AccessabilityFeatures;
