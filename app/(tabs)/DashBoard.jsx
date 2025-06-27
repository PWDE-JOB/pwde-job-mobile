import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { PanGestureHandler } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/DashBoard.style';

const SCREEN_WIDTH = Dimensions.get('window').width;

const DashBoard = () => {
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
  
  // Check if API_BASE_URL is configured
  if (!API_BASE_URL) {
    console.error('API_BASE_URL is not configured in .env file');
    alert('Server configuration error. Please contact support.');
    return null;
  }

  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const translateX = useRef(new Animated.Value(0)).current;


  const getJobRecommendations = async () => {
    try {
      const token = await AsyncStorage.getItem('Token');
      
      const response = await fetch(`${API_BASE_URL}/reco-jobs`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.recommendations) {
        return data.recommendations;
      } else {
        throw new Error(data.Message || 'No recommendations available');
      }
    } catch (error) {
      console.error('Recommendations error:', error);
      throw error;
    }
  };
  
  const getMyApplications = async () => {
    try {
      const token = await AsyncStorage.getItem('Token');
      
      const response = await fetch(`${API_BASE_URL}/my-applications`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.Status === 'Successfull') {
        return data.Message;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  const getDeclinedJobs = async () => {
    try {
      const token = await AsyncStorage.getItem('Token');
      
      const response = await fetch(`${API_BASE_URL}/declined-applications`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.Status === 'Successfull') {
        return data.Message;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  const applyForJob = async (jobId) => {
    try {
      const token = await AsyncStorage.getItem('Token');
      
      const response = await fetch(`${API_BASE_URL}/apply-job/${jobId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.Status === 'Successfull') {
        return data;
      } else {
        throw new Error(data.Message);
      }
    } catch (error) {
      console.error('Job application error:', error);
      throw error;
    }
  };

  const declineJob = async (jobId) => {
    try {
      const token = await AsyncStorage.getItem('Token');
      
      const response = await fetch(`${API_BASE_URL}/decline-application/${jobId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log(data);
      
      if (data.Status === 'Successfull') {
        return true;
      } else {
        throw new Error(data.Message);
      }
    } catch (error) {
      console.error('Job decline error:', error);
      throw error;
    }
  };

  // Main function to fetch jobs and applications and filter out applied and declined jobs

  useEffect(() => {
    const fetchJobsAndApplications = async () => {
      try {
        setLoading(true);
        // Fetch recommendations first
        const recommendations = await getJobRecommendations();
        
        if (!recommendations || recommendations.length === 0) {
          setJobs([]);
          return;
        }

        try {
          // Fetch both applications and declined jobs in parallel
          const [applications, declinedJobs] = await Promise.all([
            getMyApplications(),
            getDeclinedJobs()
          ]);
          
          // Get arrays of job IDs to exclude
          const appliedJobIds = applications ? applications.map(app => app.job_id) : [];
          const declinedJobIds = declinedJobs ? declinedJobs.map(job => job.job_id) : [];
          
          // Filter out both applied and declined jobs
          const availableJobs = recommendations.filter(job => 
            !appliedJobIds.includes(job.id) && !declinedJobIds.includes(job.id)
          );
          
          setJobs(availableJobs);
        } catch (appError) {
          setJobs(recommendations);
        }

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsAndApplications();
  }, []);

  const currentCard = jobs[index % jobs.length];

  const rotate = translateX.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
    extrapolate: 'clamp',
  });

  const resetPosition = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const onGestureEvent = useCallback(
    Animated.event([{ nativeEvent: { translationX: translateX } }], {
      useNativeDriver: true,
    }),
    []
  );

  const handleJobApplication = async () => {
    if (!currentCard) return;
    try {
      await applyForJob(currentCard.id);
      // Reload data after successful application
      setLoading(true);
      const recommendations = await getJobRecommendations();
      if (!recommendations || recommendations.length === 0) {
        setJobs([]);
        return;
      }
      const [applications, declinedJobs] = await Promise.all([
        getMyApplications(),
        getDeclinedJobs()
      ]);
      
      const appliedJobIds = applications ? applications.map(app => app.job_id) : [];
      const declinedJobIds = declinedJobs ? declinedJobs.map(job => job.job_id) : [];
      
      const availableJobs = recommendations.filter(job => 
        !appliedJobIds.includes(job.id) && !declinedJobIds.includes(job.id)
      );
      setJobs(availableJobs);
      setIndex(0);
    } catch (err) {
      console.error('Failed to apply:', err);
    } finally {
      setLoading(false);
    }
  };

  const onHandlerStateChange = useCallback(({ nativeEvent }) => {
    const swipeThreshold = 120;

    if (nativeEvent.state === 5) {
      if (nativeEvent.translationX > swipeThreshold) {
        // Right swipe (accept)
        Animated.timing(translateX, {
          toValue: SCREEN_WIDTH,
          duration: 200,
          useNativeDriver: true,
        }).start(async () => {
          await handleJobApplication();
          translateX.setValue(0);
        });
      } else if (nativeEvent.translationX < -swipeThreshold) {
        // Left swipe (decline)
        Animated.timing(translateX, {
          toValue: -SCREEN_WIDTH,
          duration: 200,
          useNativeDriver: true,
        }).start(async () => {
          translateX.setValue(0);
          setLoading(true);
          try {
            if (currentCard) {
              await declineJob(currentCard.id);
            }
            // Reload data after declining
            const recommendations = await getJobRecommendations();
            if (!recommendations || recommendations.length === 0) {
              setJobs([]);
              return;
            }
            const [applications, declinedJobs] = await Promise.all([
              getMyApplications(),
              getDeclinedJobs()
            ]);
            
            const appliedJobIds = applications ? applications.map(app => app.job_id) : [];
            const declinedJobIds = declinedJobs ? declinedJobs.map(job => job.job_id) : [];
            
            const availableJobs = recommendations.filter(job => 
              !appliedJobIds.includes(job.id) && !declinedJobIds.includes(job.id)
            );
            setJobs(availableJobs);
            setIndex(0);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        });
      } else {
        resetPosition();
      }
    }
  }, [currentCard]);

  if (!jobs.length) {
    return (
      <View style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', flex: 1, alignItems: 'center' }]}>
          <Text style={{ fontSize: 50, marginBottom: 20, alignContent: 'center'}}>😔</Text>
          <Text style={{ 
            textAlign: 'center', 
            fontSize: 18, 
            color: 'black',
            fontWeight: 'bold',
            marginBottom: 10,
            fontWeight: '600'
          }}>
            No jobs available at the moment
          </Text>
          <Text style={{ 
            textAlign: 'center', 
            fontSize: 14, 
            color: 'black',
            paddingHorizontal: 40
          }}>
            Check back later for new opportunities!
          </Text>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.navBar}>
          <Pressable onPress={() => router.push('/ApplicationHistory')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navText}>📜</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/inbox')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navText}>💬</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/notification')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navText}>🔔</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/Settings')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navText}>≡</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>

        {/* Bottom Navigation */}
        <View style={styles.navBar}>
          <Pressable onPress={() => router.push('/ApplicationHistory')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navText}>📜</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/inbox')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navText}>💬</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/notification')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navText}>🔔</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/Settings')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navText}>≡</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
          <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.navBar}>
          <Pressable onPress={() => router.push('/ApplicationHistory')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navText}>📜</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/inbox')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navText}>💬</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/notification')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navText}>🔔</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/Settings')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
            <Text style={styles.navText}>≡</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Swipeable Card */}
      <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={[styles.cardWrapper, { transform: [{ translateX }, { rotate }] }]}>
          <View style={styles.card}>
            <Text style={styles.companyName}>{currentCard.company_name}</Text>
            <Text style={styles.jobTitle}>{currentCard.title}</Text>
            <Text style={styles.location}>{currentCard.location} • {currentCard.job_type}</Text>
            <Text style={styles.salary}>₱{currentCard.min_salary} - ₱{currentCard.max_salary}</Text>
            
            <Text style={styles.skillsLabel}>Required Skills</Text>
            <View style={styles.skillContainer}>
              {[
                currentCard.skill_1,
                currentCard.skill_2,
                currentCard.skill_3,
                currentCard.skill_4,
                currentCard.skill_5
              ].filter(Boolean).map((skill, i) => (
                <TouchableOpacity key={i} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.basicInfoLabel}>Job Description</Text>
            <Text style={styles.infoText}>{currentCard.job_description}</Text>
            
            <Text style={styles.matchScore}>
              Skill Match: {Math.round(currentCard.skill_match_score * 100)}%
            </Text>
          </View>
        </Animated.View>
      </PanGestureHandler>

      {/* Swipe Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.circleButton, styles.rejectButton]}
          onPress={() => {
            Animated.timing(translateX, {
              toValue: -SCREEN_WIDTH,
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              translateX.setValue(0);
              setIndex(prev => prev + 1);
            });
          }}
        >
          <Text style={styles.buttonText}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.circleButton, styles.acceptButton]}
          onPress={async () => {
            Animated.timing(translateX, {
              toValue: SCREEN_WIDTH,
              duration: 200,
              useNativeDriver: true,
            }).start(async () => {
              await handleJobApplication();
              translateX.setValue(0);
              setIndex(prev => prev + 1);
            });
          }}
        >
          <Text style={styles.buttonText}>❤️</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <Pressable onPress={() => router.push('/ApplicationHistory')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
          <Text style={styles.navText}>📜</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/inbox')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
          <Text style={styles.navText}>💬</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/notification')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
          <Text style={styles.navText}>🔔</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/Settings')} style={({ pressed }) => [styles.navItem, pressed && { opacity: 0.8 }]}>
          <Text style={styles.navText}>≡</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DashBoard;
