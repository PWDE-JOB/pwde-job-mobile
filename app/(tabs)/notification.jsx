// notification.jsx
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles/notif.styles';
import { useRouter } from 'expo-router';

const notifications = [
  {
    id: '1',
    name: 'Job Offer',
    message: 'You have received a new job offer!',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    id: '2',
    name: 'Profile Approved',
    message: 'Your profile has been approved by the admin.',
    avatar: 'https://via.placeholder.com/50',
  },
  {
    id: '3',
    name: 'Interview Invitation',
    message: 'An employer has invited you for an interview.',
    avatar: 'https://via.placeholder.com/50',
  },
];

const Notification = () => {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <View style={styles.messageCard}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageTextContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.previewText}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Notification;
