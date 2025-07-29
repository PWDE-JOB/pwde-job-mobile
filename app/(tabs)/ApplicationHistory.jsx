import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../../styles/ApplicationHistory.styles';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApplicationHistory = () => {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

  const getJobDetails = async (jobId) => {
    try {
      const token = await AsyncStorage.getItem('sessionKey');
      
      const response = await fetch(`${API_BASE_URL}/view-job/${jobId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.Status === 'Successfull') {
        return data.Details[0];
      }
      return null;
    } catch (error) {
      console.error('Error fetching job details:', error);
      return null;
    }
  };

  const getMyApplications = async () => {
    try {
      const token = await AsyncStorage.getItem('sessionKey');
      
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

  useEffect(() => {
    const fetchApplicationsWithDetails = async () => {
      try {
        setLoading(true);
        const applicationsData = await getMyApplications();
        
        // Fetch job details for each application
        const applicationsWithDetails = await Promise.all(
          applicationsData.map(async (application) => {
            const jobDetails = await getJobDetails(application.job_id);
            return {
              ...application,
              jobDetails
            };
          })
        );

        setApplications(applicationsWithDetails);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationsWithDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Application History</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6cbba6" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Application History</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Application History</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {applications.map((application) => (
          <View key={application.id} style={styles.card}>
            <View style={styles.applicationHeader}>
              <Text style={styles.companyName}>
                {application.jobDetails?.company_name || 'Company Not Available'}
              </Text>
              <Text style={[
                styles.statusBadge,
                application.status === 'accepted' ? styles.statusAccepted : 
                application.status === 'under_review' ? styles.statusUnderReview :
                styles.statusRejected
              ]}>
                {application.status.replace('_', ' ').toUpperCase()}
              </Text>
            </View>

            <Text style={styles.jobTitle}>{application.jobDetails?.title || 'Position Not Available'}</Text>

            <View style={styles.applicationDetails}>
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailText}>
                {application.jobDetails?.location || 'N/A'} • {application.jobDetails?.job_type || 'N/A'}
              </Text>
            </View>

            <View style={styles.applicationDetails}>
              <Text style={styles.detailLabel}>Salary:</Text>
              <Text style={styles.detailText}>
                ₱{application.jobDetails?.min_salary || 0} - ₱{application.jobDetails?.max_salary || 0}
              </Text>
            </View>

            {application.jobDetails?.job_description && (
              <View style={styles.applicationDetails}>
                <Text style={styles.detailLabel}>Description:</Text>
                <Text style={styles.detailText} numberOfLines={2}>
                  {application.jobDetails.job_description}
                </Text>
              </View>
            )}

            <View style={styles.skillContainer}>
              {[
                application.jobDetails?.skill_1,
                application.jobDetails?.skill_2,
                application.jobDetails?.skill_3,
                application.jobDetails?.skill_4,
                application.jobDetails?.skill_5
              ].filter(Boolean).map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.applicationDate}>
              Applied on: {new Date(application.created_at).toLocaleDateString()}
            </Text>
          </View>
        ))}

        {applications.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 50, marginBottom: 20, textAlign: 'center' }}>📝</Text>
            <Text style={styles.emptyText}>No applications yet</Text>
            <Text style={[styles.emptyText, { fontSize: 14, marginTop: 10 }]}>
              Start applying to jobs to see your history here!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ApplicationHistory;
