// inbox.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/inbox.styles';
import { useRouter, useFocusEffect } from 'expo-router';

const Inbox = () => {
  const router = useRouter();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Initialize user ID
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        setCurrentUserId(userId);
      } catch (error) {
        console.error('Failed to get user ID:', error);
      }
    };
    initializeUser();
  }, []);

  // Load conversations when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (currentUserId) {
        loadConversations();
      }
    }, [currentUserId])
  );

  // Get chat history between two users
  const getChatHistory = async (senderId, receiverId) => {
    console.log('🔍 Getting chat history between:', { senderId, receiverId });
    
    try {
      const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://pwde-job-api.onrender.com';
      const url = `${baseUrl}/messages/${senderId}/{receiver_id}?reciever_id=${receiverId}`;
      console.log('📡 Fetching chat history from URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Response status:', response.status);
      
      const data = await response.json();
      console.log('📡 Raw API response data:', JSON.stringify(data, null, 2));
      
      if (data.Status === 'Success') {
        const messages = data.data || [];
        console.log('✅ Successfully fetched', messages.length, 'messages');
        return messages;
      } else if (data.Message === 'No chat history found') {
        console.log('ℹ️ No chat history found for this conversation');
        return [];
      } else {
        console.error('❌ API returned error status:', data.Status, 'Message:', data.Message);
        return [];
      }
    } catch (error) {
      console.error('💥 Chat history fetch error:', error);
      return [];
    }
  };

  // Get complete conversation history (both directions)
  const getCompleteConversation = async (userId1, userId2) => {
    console.log('🔄 Getting complete conversation between:', { userId1, userId2 });
    
    try {
      console.log('📡 Fetching messages in both directions...');
      
      const [messages1, messages2] = await Promise.all([
        getChatHistory(userId1, userId2),
        getChatHistory(userId2, userId1)
      ]);

      console.log('📨 Messages from', userId1, 'to', userId2, ':', messages1.length, 'messages');
      console.log('📨 Messages from', userId2, 'to', userId1, ':', messages2.length, 'messages');

      // Combine and sort messages by creation date
      const allMessages = [...messages1, ...messages2];
      console.log('📨 Combined messages count:', allMessages.length);
      
      const sortedMessages = allMessages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      console.log('📨 Sorted messages:', sortedMessages);
      
      return sortedMessages;
    } catch (error) {
      console.error('💥 Complete conversation fetch error:', error);
      return [];
    }
  };

  const loadConversations = async () => {
    if (!currentUserId) {
      console.log('❌ loadConversations: No currentUserId, skipping');
      return;
    }

    console.log('🔄 loadConversations: Starting to load conversations for user:', currentUserId);

    try {
      setLoading(true);
      
      // Get user's job applications
      const token = await AsyncStorage.getItem('sessionKey');
      const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://pwde-job-api.onrender.com';
      
      console.log('📡 Fetching my applications from:', `${baseUrl}/my-applications`);
      console.log('🔑 Using token:', token ? 'Present' : 'Missing');
      
      const response = await fetch(`${baseUrl}/my-applications`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Applications response status:', response.status);
      
      const data = await response.json();
      console.log('📡 Applications API response:', JSON.stringify(data, null, 2));
      
      if (data.Status === 'Successfull' && data.Message) {
        const applications = data.Message;
        console.log('✅ Found', applications.length, 'applications');
        console.log('📋 Applications:', applications);
        
        // For each application, get the job details and check for messages
        const conversationPromises = applications.map(async (application, index) => {
          console.log(`🔄 Processing application ${index + 1}/${applications.length}:`, application);
          
          try {
            // Get job details to find the employer
            const jobUrl = `${baseUrl}/jobs/view-job/${application.job_id}`;
            console.log('📡 Fetching job details from:', jobUrl);
            
            const jobResponse = await fetch(jobUrl, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            console.log('📡 Job response status:', jobResponse.status);
            
            const jobData = await jobResponse.json();
            console.log('📡 Job API response:', JSON.stringify(jobData, null, 2));
            
            if (jobData.Status === 'Successfull' && jobData.Details && jobData.Details.length > 0) {
              const job = jobData.Details[0];
              const employerId = job.user_id;
              
              console.log('👔 Job details:', { 
                jobId: application.job_id, 
                jobTitle: job.title, 
                companyName: job.company_name, 
                employerId 
              });
              
              // Get chat history between current user and employer
              console.log('💬 Fetching chat history between:', currentUserId, 'and', employerId);
              const messages = await getCompleteConversation(currentUserId, employerId);
              console.log('💬 Total messages for this conversation:', messages.length);
              
              // Filter messages related to this job
              console.log('🔍 Filtering messages for job ID:', application.job_id);
              const jobMessages = messages.filter(msg => {
                // Compare numbers directly since both are numbers
                const matches = msg.job_id === application.job_id;
                console.log('🔍 Message job_id:', msg.job_id, 'vs application job_id:', application.job_id, 'matches:', matches);
                return matches;
              });
              console.log('💬 Messages for job', application.job_id, ':', jobMessages.length);
              console.log('💬 Job messages:', jobMessages);
              
              if (jobMessages.length > 0) {
                // Get the latest message
                const latestMessage = jobMessages[jobMessages.length - 1];
                console.log('📨 Latest message:', latestMessage);
                
                const conversation = {
                  id: `${application.job_id}_${employerId}`,
                  applicationId: application.id,
                  jobId: application.job_id,
                  employerId: employerId,
                  jobTitle: job.title,
                  companyName: job.company_name,
                  applicationStatus: application.status,
                  latestMessage: latestMessage.message,
                  latestMessageTime: formatTime(latestMessage.created_at),
                  latestMessageType: latestMessage.type,
                  isFromUser: latestMessage.sender_id === currentUserId,
                  messageCount: jobMessages.length,
                  hasUnreadMessages: jobMessages.some(msg => !msg.is_read && msg.sender_id !== currentUserId),
                  avatar: job.company_logo, // Placeholder - could be company logo
                };
                
                console.log('✅ Created conversation object:', conversation);
                return conversation;
              } else {
                console.log('ℹ️ No messages found for job', application.job_id);
              }
            } else {
              console.log('❌ Invalid job data for application:', application.id);
            }
          } catch (error) {
            console.error(`💥 Error loading conversation for application ${application.id}:`, error);
          }
          return null;
        });

        console.log('⏳ Waiting for all conversation promises to resolve...');
        const conversationResults = await Promise.all(conversationPromises);
        console.log('📊 Conversation results:', conversationResults);
        
        const validConversations = conversationResults.filter(conv => conv !== null);
        console.log('✅ Valid conversations:', validConversations.length);
        console.log('📋 Valid conversations data:', validConversations);
        
        // Sort by latest message time (newest first)
        validConversations.sort((a, b) => new Date(b.latestMessageTime) - new Date(a.latestMessageTime));
        console.log('📋 Sorted conversations:', validConversations);
        
        setConversations(validConversations);
        console.log('✅ Set conversations in state, count:', validConversations.length);
      } else {
        console.log('❌ No applications found or invalid response');
        setConversations([]);
      }
    } catch (error) {
      console.error('💥 Failed to load conversations:', error);
      console.error('💥 Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      Alert.alert('Error', 'Failed to load conversations. Please try again.');
    } finally {
      setLoading(false);
      console.log('✅ loadConversations completed');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadConversations();
    setRefreshing(false);
  };

  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      if (diffInSeconds < 60) {
        return 'Just now';
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes}m ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours}h ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
      }
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Recently';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return '#4CAF50';
      case 'rejected':
        return '#F44336';
      case 'under_review':
        return '#FF9800';
      default:
        return '#757575';
    }
  };

  const getPreviewText = (conversation) => {
    const prefix = conversation.isFromUser ? 'You: ' : '';
    let messageText = conversation.latestMessage;
    
    // Handle different message types
    if (conversation.latestMessageType === 'zoom_link') {
      messageText = '📹 Interview link';
    } else if (conversation.latestMessageType === 'form_link') {
      messageText = '📝 Technical Test link';
    } else if (conversation.latestMessageType === 'status_update') {
      messageText = '📋 Status update';
    }
    
    // Truncate long messages
    if (messageText.length > 50) {
      messageText = messageText.substring(0, 50) + '...';
    }
    
    return prefix + messageText;
  };

  const renderConversationItem = ({ item }) => (
    <Pressable
      onPress={() => router.push({
        pathname: '/Chats',
        params: {
          employerId: item.employerId,
          jobId: item.jobId,
          jobTitle: item.jobTitle,
          companyName: item.companyName,
          applicationStatus: item.applicationStatus
        }
      })}
      style={({ pressed }) => [
        styles.navItem,
        pressed && { transform: [{ scale: 0.96 }], opacity: 0.8 },
      ]}
    >
      <View style={styles.messageCard}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          {item.hasUnreadMessages && <View style={styles.unreadBadge} />}
        </View>

        {/* Message Content */}
        <View style={styles.messageTextContainer}>
          <View style={styles.messageHeader}>
            <Text style={styles.nameText} numberOfLines={1}>
              {item.companyName}
            </Text>
            <Text style={styles.timeText}>{item.latestMessageTime}</Text>
          </View>
          
          <Text style={styles.jobTitleText} numberOfLines={1}>
            {item.jobTitle}
          </Text>
          
          <Text 
            style={[
              styles.previewText,
              item.hasUnreadMessages && styles.unreadPreviewText
            ]} 
            numberOfLines={1}
          >
            {getPreviewText(item)}
          </Text>
          
          <View style={styles.statusContainer}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.applicationStatus) }]}>
              <Text style={styles.statusText}>
                {item.applicationStatus.replace('_', ' ').toUpperCase()}
              </Text>
            </View>
            
            {item.messageCount > 1 && (
              <Text style={styles.messageCountText}>
                {item.messageCount} messages
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No Messages Yet</Text>
      <Text style={styles.emptyStateText}>
        Messages from employers about your job applications will appear here.
      </Text>
    </View>
  );

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

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading conversations...</Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={renderConversationItem}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0000ff']}
            />
          }
          contentContainerStyle={conversations.length === 0 ? styles.emptyListContainer : null}
        />
      )}
    </SafeAreaView>
  );
};

export default Inbox;
