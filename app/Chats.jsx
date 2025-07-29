import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Chats.styles';
import { supabase } from '../supabase/server';

// Chat bubble component to differentiate between user and employer messages
const ChatBubble = ({ message, time, isUser, type }) => {
  const formatMessageContent = () => {
    switch (type) {
      case 'zoom_link':
        return (
          <View>
            <Text style={styles.chatText}>📹 Zoom Meeting</Text>
            <Text style={[styles.chatText, styles.linkText]}>{message}</Text>
          </View>
        );
      case 'form_link':
        return (
          <View>
            <Text style={styles.chatText}>📝 Form Link</Text>
            <Text style={[styles.chatText, styles.linkText]}>{message}</Text>
          </View>
        );
      default:
        return <Text style={styles.chatText}>{message}</Text>;
    }
  };

  return (
    <View
      style={[
        styles.chatRow,
        isUser ? styles.chatUserRight : styles.chatUserLeft,
      ]}
    >
      <View
        style={[
          styles.chatBubble,
          isUser ? styles.userBubble : styles.employerBubble,
        ]}
      >
        {formatMessageContent()}
        <Text style={styles.chatTime}>{time}</Text>
      </View>
    </View>
  );
};

const Chat = () => {
  const params = useLocalSearchParams();
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const scrollViewRef = useRef(null);

  // Extract parameters from navigation
  const {
    employerId,
    jobId,
    jobTitle,
    companyName,
    applicationStatus
  } = params;

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

  // Load chat history when component mounts or comes into focus
  useFocusEffect(
    useCallback(() => {
      if (currentUserId && employerId && jobId) {
        loadChatHistory();
      }
    }, [currentUserId, employerId, jobId])
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

  const loadChatHistory = async () => {
    if (!currentUserId || !employerId) {
      console.log('❌ loadChatHistory: Missing required IDs', { currentUserId, employerId });
      return;
    }

    try {
      setLoading(true);
      
      // Get complete conversation history
      const messages = await getCompleteConversation(currentUserId, employerId);
      
      // Filter messages for this specific job
      const jobMessages = messages.filter(msg => {
        // Convert both to strings for comparison since jobId from params is a string
        const matches = msg.job_id.toString() === jobId.toString();
        return matches;
      });
      
      setChatHistory(jobMessages);
      console.log('✅ Set chat history in state, count:', jobMessages.length);
      
      // Scroll to bottom after loading
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }, 100);
      
    } catch (error) {
      console.error('💥 Failed to load chat history:', error);
      Alert.alert('Error', 'Failed to load chat history');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return 'Now';
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || sending) return;

    try {
      setSending(true);
      
      // Get auth token
      const token = await AsyncStorage.getItem('sessionKey');
      if (!token) {
        Alert.alert('Error', 'Not authenticated');
        return;
      }

      const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://pwde-job-api.onrender.com';
      const url = `${baseUrl}/message/send-message`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          sender_id: currentUserId,
          receiver_id: employerId,
          job_id: jobId, // Convert to number
          message: message.trim(),
          type: 'text'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to send message`);
      }

      const data = await response.json();
      console.log('📤 Message sent successfully:', data);

      // Clear input field
      setMessage('');

      // Reload chat history to show the new message
      // await loadChatHistory();

      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
      
    } catch (error) {
      console.error('💥 Failed to send message:', error);
      Alert.alert('Error', `Failed to send message: ${error.message}`);
    } finally {
      setSending(false);
    }
  };

  // SUPABASE REALTIME CHAT - Fixed version
  useEffect(() => {
    if (!currentUserId || !employerId || !jobId) {
      console.log('❌ Supabase subscription: Missing required IDs');
      return;
    }

    console.log('🔔 Setting up Supabase realtime subscription');
    
    const chat_channel = supabase.channel(`chat_${currentUserId}_${employerId}_${jobId}`);
    
    chat_channel
      .on(
        'postgres_changes',
        {
          schema: 'public',
          event: 'INSERT',
          table: 'messages',
          filter: `job_id=eq.${jobId}`
        },
        (payload) => {
          console.log('🔔 New message received via Supabase:', payload.new);
          const newMessage = payload.new;
          
          // Check if message is relevant to this conversation
          const isRelevantMessage = 
            (newMessage.sender_id === currentUserId && newMessage.receiver_id === employerId) ||
            (newMessage.sender_id === employerId && newMessage.receiver_id === currentUserId);
          
          const isCorrectJob = newMessage.job_id.toString() === jobId.toString();
          
          if (isRelevantMessage && isCorrectJob) {
            console.log('✅ Adding new message to chat history');
            setChatHistory(prev => {
              // Avoid duplicates
              const exists = prev.some(msg => msg.id === newMessage.id);
              if (exists) return prev;
              
              return [...prev, newMessage].sort((a, b) => 
                new Date(a.created_at) - new Date(b.created_at)
              );
            });
            
            // Scroll to bottom
            setTimeout(() => {
              scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
          } else {
            console.log('Message not relevant to this conversation');
          }
        }
      )
      .subscribe();

    console.log('✅ Supabase subscription active');

    // Cleanup function
    return () => {
      console.log('🧹 Cleaning up Supabase subscription');
      supabase.removeChannel(chat_channel);
    };
  }, [currentUserId, employerId, jobId]); // Proper dependencies



  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      } else {
        return date.toLocaleDateString();
      }
    } catch (error) {
      return '';
    }
  };

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case 'accepted':
  //       return '#4CAF50';
  //     case 'rejected':
  //       return '#F44336';
  //     case 'under_review':
  //       return '#FF9800';
  //     default:
  //       return '#757575';
  //   }
  // };

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = [];
    let currentDate = null;
    let currentGroup = [];

    messages.forEach(msg => {
      const messageDate = formatDate(msg.created_at);
      
      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({ date: currentDate, messages: currentGroup });
        }
        currentDate = messageDate;
        currentGroup = [msg];
      } else {
        currentGroup.push(msg);
      }
    });

    if (currentGroup.length > 0) {
      groups.push({ date: currentDate, messages: currentGroup });
    }

    return groups;
  };

  const messageGroups = groupMessagesByDate(chatHistory);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.scrollView}>
          {/* Header */}
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            
            <View style={styles.headerInfo}>
              <Text style={styles.companyName} numberOfLines={1}>{companyName}</Text>
              <Text style={styles.jobTitle} numberOfLines={1}>{jobTitle}</Text>
            </View>
          </View>

          {/* Messages */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0066CC" />
              <Text style={styles.loadingText}>Loading messages...</Text>
            </View>
          ) : (
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={{ paddingBottom: 12 }}
              keyboardShouldPersistTaps="handled"
              style={[styles.chatScroll, { flex: 1 }]}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
              {messageGroups.length === 0 ? (
                <View style={styles.emptyChat}>
                  <Text style={styles.emptyChatText}>
                    No messages yet for this job application
                  </Text>
                </View>
              ) : (
                messageGroups.map((group, groupIndex) => (
                  <View key={groupIndex}>
                    {/* Date separator */}
                    <View style={styles.dateSeparator}>
                      <Text style={styles.dateText}>{group.date}</Text>
                    </View>
                    
                    {/* Messages for this date */}
                    {group.messages.map((chat, index) => (
                      <ChatBubble
                        key={chat.id || index}
                        message={chat.message}
                        time={formatTime(chat.created_at)}
                        isUser={chat.sender_id === currentUserId}
                        type={chat.type}
                      />
                    ))}
                  </View>
                ))
              )}
            </ScrollView>
          )}

          {/* Message Input Section */}
          <View style={styles.inputSection}>
            <View style={styles.inputWrapper}>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder={
                  "Type a message..." 
                }
                placeholderTextColor="#999"
                style={styles.input}
                multiline
                maxLength={1000}
                editable={!sending}
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                  }, 100);
                }}
              />

              {/* Send Button */}
              <TouchableOpacity
                onPress={sendMessage}
                style={[
                  styles.sendButton,
                  (!message.trim() || sending) && styles.sendButtonDisabled
                ]}
                disabled={!message.trim() || sending}
              >
                {sending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.sendText}>Send</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
