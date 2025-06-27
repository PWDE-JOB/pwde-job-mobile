import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/updateProf.styles';
import { useRouter } from 'expo-router';

const UpdateProfile = () => {
  const router = useRouter();

  const [skills, setSkills] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [pwdFront, setPwdFront] = useState(null);
  const [pwdBack, setPwdBack] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    contactNumber: '',
    email: '',
    education: '',
    experience: '',
    bio: '',
    expectedSalaryMin: '',
    expectedSalaryMax: '',
    disabilityType: '',
  });

  const handleChange = (key, value) => setFormData({ ...formData, [key]: value });

  const handleSkillSubmit = (e) => {
    const newSkill = e.nativeEvent.text.trim();
    if (newSkill !== '' && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
  };

  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  const pickImage = async (setImage) => {
    Alert.alert('Select Image Source', 'Choose where to get the image from:', [
      {
        text: 'Camera',
        onPress: async () => {
          const permission = await ImagePicker.requestCameraPermissionsAsync();
          if (!permission.granted) return alert('Permission denied.');
          const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 1 });
          if (!result.canceled && result.assets?.length > 0) setImage(result.assets[0].uri);
        },
      },
      {
        text: 'Gallery',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
          if (!result.canceled && result.assets?.length > 0) setImage(result.assets[0].uri);
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleUpdate = () => {
    const updatedData = {
      ...formData,
      skills,
      images: {
        profileImage,
        pwdFront,
        pwdBack,
      },
    };

    console.log('Updated profile:', updatedData);
    router.push('/profile');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        {/* Spacer for symmetrical layout */}
        <View style={{ width: 60 }} />
      </View>

      {/* Scrollable Form */}
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={formData.fullName} onChangeText={(text) => handleChange('fullName', text)} placeholder="Enter full name" />

            <Text style={styles.label}>Profile Image</Text>
            <TouchableOpacity style={styles.imageButton} onPress={() => pickImage(setProfileImage)}>
              <Text style={styles.imageButtonText}>Upload Profile Picture</Text>
            </TouchableOpacity>
            {profileImage && <Image source={{ uri: profileImage }} style={styles.imagePreview} />}

            {["address", "contactNumber", "email", "education", "experience"].map((field) => (
              <View key={field}>
                <Text style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</Text>
                <TextInput
                  style={styles.input}
                  value={formData[field]}
                  onChangeText={(text) => handleChange(field, text)}
                  placeholder={`Enter ${field}`}
                />
              </View>
            ))}

            <Text style={styles.label}>Short Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              value={formData.bio}
              onChangeText={(text) => handleChange('bio', text)}
              placeholder="Tell something about yourself"
            />

          

            <Text style={styles.label}>Disability Type</Text>
            <TextInput
              style={styles.input}
              value={formData.disabilityType}
              onChangeText={(text) => handleChange('disabilityType', text)}
              placeholder="e.g., Visual, Hearing, Physical"
            />

            <Text style={styles.label}>PWD ID (Front)</Text>
            <TouchableOpacity style={styles.imageButton} onPress={() => pickImage(setPwdFront)}>
              <Text style={styles.imageButtonText}>Upload Front ID</Text>
            </TouchableOpacity>
            {pwdFront && <Image source={{ uri: pwdFront }} style={styles.imagePreview} />}

            <Text style={styles.label}>PWD ID (Back)</Text>
            <TouchableOpacity style={styles.imageButton} onPress={() => pickImage(setPwdBack)}>
              <Text style={styles.imageButtonText}>Upload Back ID</Text>
            </TouchableOpacity>
            {pwdBack && <Image source={{ uri: pwdBack }} style={styles.imagePreview} />}

            <Text style={styles.label}>Skills</Text>
            <View style={styles.skillContainer}>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillChip}>
                  <Text>{skill}</Text>
                  <TouchableOpacity onPress={() => removeSkill(index)}>
                    <Text style={styles.skillRemove}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Add a skill and press enter"
              onSubmitEditing={handleSkillSubmit}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleUpdate}>
              <Text style={styles.submitButtonText}>SAVE CHANGES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateProfile;
