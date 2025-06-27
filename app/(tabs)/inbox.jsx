// inbox.jsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import styles from '../../styles/inbox.styles';
import { useRouter } from 'expo-router';

// Sample static message data (can be replaced with API-fetched data)
const messages = Array(10).fill({
  name: 'Name',
  preview: 'Your messages here...',
  avatar: 'https://via.placeholder.com/50', // Placeholder avatar
});

const Inbox = () => {
  const router = useRouter();

  // 📌 Placeholder: Replace this with a useEffect to fetch messages from API
  /*
  useEffect(() => {
    fetch('https://your-api.com/inbox')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error(err));
  }, []);
  */

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>

        {/* Back Button */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Message List using FlatList */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push('/Chats')} // Navigate to chat detail screen
            style={({ pressed }) => [
              styles.navItem,
              pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 },
            ]}
          >
            <View style={styles.messageCard}>
              {/* Avatar */}
              <Image source={{ uri: item.avatar }} style={styles.avatar} />

              {/* Message Preview */}
              <View style={styles.messageTextContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.previewText}>{item.preview}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default Inbox;
