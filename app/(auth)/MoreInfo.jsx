// MoreInfo.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import styles from '../../styles/MoreInfo.styles';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Import skills data
const SKILLS_DATA = [
  { id: 1, skill: "Troubleshooting", category: "Support" },
  { id: 2, skill: "AWS", category: "Digital Management" },
  { id: 3, skill: "Accessibility", category: "Support" },
  { id: 4, skill: "Accuracy", category: "Professional" },
  { id: 5, skill: "Analytics", category: "Digital Management" },
  { id: 6, skill: "Android", category: "Digital Coding" },
  { id: 7, skill: "Animal Handling", category: "Labor" },
  { id: 8, skill: "Attention to Detail", category: "Professional" },
  { id: 9, skill: "Basic Veterinary Knowledge", category: "Labor" },
  { id: 10, skill: "Blueprint Reading", category: "Mechanical" },
  { id: 11, skill: "Branding", category: "Marketing" },
  { id: 12, skill: "Bricklaying", category: "Manual" },
  { id: 13, skill: "Bug Reporting", category: "Support" },
  { id: 14, skill: "CRM", category: "Support" },
  { id: 15, skill: "Canva", category: "Creative Digital" },
  { id: 16, skill: "Cash Handling", category: "Support" },
  { id: 17, skill: "Circuit Design", category: "Mechanical" },
  { id: 18, skill: "Cleaning Techniques", category: "Labor" },
  { id: 19, skill: "Communication", category: "Support" },
  { id: 20, skill: "Content Editing", category: "Content Writing" },
  { id: 21, skill: "Content Planning", category: "Content Writing" },
  { id: 22, skill: "Copywriting", category: "Content Writing" },
  { id: 23, skill: "Customer Service", category: "Support" },
  { id: 24, skill: "Data Entry", category: "Support" },
  { id: 25, skill: "Data Science", category: "Digital Management" },
  { id: 26, skill: "Data Validation", category: "Administrative" },
  { id: 27, skill: "Detail Orientation", category: "Professional" },
  { id: 28, skill: "Documentation", category: "Content Writing" },
  { id: 29, skill: "Editorial Calendar", category: "Content Writing" },
  { id: 30, skill: "Email Management", category: "Administrative" },
  { id: 31, skill: "Engagement", category: "Marketing" },
  { id: 32, skill: "Equipment Operation", category: "Mechanical" },
  { id: 33, skill: "Excel", category: "Administrative" },
  { id: 34, skill: "Facebook Ads", category: "Marketing" },
  { id: 35, skill: "Feeding", category: "Labor" },
  { id: 36, skill: "Figma", category: "Creative Digital" },
  { id: 37, skill: "Firewalls", category: "Digital Management" },
  { id: 38, skill: "Fixture Installation", category: "Mechanical" },
  { id: 39, skill: "Food Preparation", category: "Labor" },
  { id: 40, skill: "Framing", category: "Mechanical" },
  { id: 41, skill: "Google Workspace", category: "Administrative" },
  { id: 42, skill: "Grammar", category: "Content Writing" },
  { id: 43, skill: "Grooming", category: "Manual" },
  { id: 44, skill: "HTML", category: "Digital Coding" },
  { id: 45, skill: "Hand Tools", category: "Manual" },
  { id: 46, skill: "Illustrator", category: "Creative Digital" },
  { id: 47, skill: "Incident Response", category: "Support" },
  { id: 48, skill: "Instagram", category: "Marketing" },
  { id: 49, skill: "Inventory Management", category: "Administrative" },
  { id: 50, skill: "Java", category: "Digital Coding" },
  { id: 51, skill: "Lesson Planning", category: "Professional" },
  { id: 52, skill: "Listening", category: "Creative Audio" },
  { id: 53, skill: "MIG Welding", category: "Manual" },
  { id: 54, skill: "MS Excel", category: "Professional" },
  { id: 55, skill: "Machine Learning", category: "Digital Coding" },
  { id: 56, skill: "Machine Operation", category: "Digital Coding" },
  { id: 57, skill: "Metal Fabrication", category: "Labor" },
  { id: 58, skill: "Microservices", category: "Creative Digital" },
  { id: 59, skill: "Mortar Mixing", category: "Labor" },
  { id: 60, skill: "Multitasking", category: "Support" },
  { id: 61, skill: "Networking", category: "Marketing" },
  { id: 62, skill: "Order Processing", category: "Transcription" },
  { id: 63, skill: "Organization", category: "Support" },
  { id: 64, skill: "POS Systems", category: "Transcription" },
  { id: 65, skill: "Pandas", category: "Digital Coding" },
  { id: 66, skill: "Patience", category: "Support" },
  { id: 67, skill: "Photoshop", category: "Creative Digital" },
  { id: 68, skill: "Pipe Fitting", category: "Manual" },
  { id: 69, skill: "Problem Solving", category: "Professional" },
  { id: 70, skill: "Product Listing", category: "Transcription" },
  { id: 71, skill: "Prototyping", category: "Manual" },
  { id: 72, skill: "Python", category: "Digital Coding" },
  { id: 73, skill: "Quality Control", category: "Manual" },
  { id: 74, skill: "Recipe Following", category: "Manual" },
  { id: 75, skill: "Record Keeping", category: "Transcription" },
  { id: 76, skill: "Remote Tools", category: "Manual" },
  { id: 77, skill: "Reporting", category: "Professional" },
  { id: 78, skill: "Research", category: "Professional" },
  { id: 79, skill: "Risk Assessment", category: "Administrative" },
  { id: 80, skill: "SEO", category: "Administrative" },
  { id: 81, skill: "SQL", category: "Digital Coding" },
  { id: 82, skill: "Safety Practices", category: "Manual" },
  { id: 83, skill: "Salesforce", category: "Marketing" },
  { id: 84, skill: "Scheduling", category: "Support" },
  { id: 85, skill: "Screen Reader", category: "Creative Audio" },
  { id: 86, skill: "Security", category: "Administrative" },
  { id: 87, skill: "Shopify", category: "Marketing" },
  { id: 88, skill: "Spring Boot", category: "Digital Coding" },
  { id: 89, skill: "Statistics", category: "Manual" },
  { id: 90, skill: "Stonework", category: "Labor" },
  { id: 91, skill: "Subject Expertise", category: "Professional" },
  { id: 92, skill: "System Installation", category: "Manual" },
  { id: 93, skill: "TIG Welding", category: "Labor" },
  { id: 94, skill: "Task Management", category: "Administrative" },
  { id: 95, skill: "Teamwork", category: "Support" },
  { id: 96, skill: "Testing Tools", category: "Support" },
  { id: 97, skill: "Time Management", category: "Manual" },
  { id: 98, skill: "Transcription Tools", category: "Transcription" },
  { id: 99, skill: "Troubleshooting", category: "Manual" },
  { id: 100, skill: "Typing", category: "Manual" }
].sort((a, b) => a.skill.localeCompare(b.skill)); // Sort alphabetically

const MAX_SKILLS = 5;

const EmployeeInfoForm = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
  
  // Check if API_BASE_URL is configured
  if (!API_BASE_URL) {
    console.error('API_BASE_URL is not configured in .env file');
    alert('Server configuration error. Please contact support.');
    return null;
  }

  // State variables for images and skill input
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [pwdFront, setPwdFront] = useState(null);
  const [pwdBack, setPwdBack] = useState(null);
  const [resume, setResume] = useState(null);

  // Form input state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    address: '',
    contactNumber: '',
    education: '',
    bio: '',
    expectedSalaryMin: '',
    expectedSalaryMax: '',
    disabilityType: '',
  });

  // Populate form data from params when component mounts
  useEffect(() => {
    const name = params?.name;
    const email = params?.email;
    const password = params?.password;
    
    if (name || email || password) {
      setFormData(prev => {
        if (prev.fullName === name && 
            prev.email === email && 
            prev.password === password) {
          return prev;
        }
        return {
          ...prev,
          fullName: name || prev.fullName,
          email: email || prev.email,
          password: password || prev.password,
        };
      });
    }
  }, []); // Run only once on mount

  // Handle form field updates
  const handleChange = (key, value) => setFormData({ ...formData, [key]: value });

  // Handle skill selection
  const handleSkillSelect = (value) => {
    if (value && !skills.includes(value)) {
      if (skills.length >= MAX_SKILLS) {
        Alert.alert('Skills Limit', `You can only select ${MAX_SKILLS} skills. Remove a skill to add a new one.`);
        return;
      }
      setSkills([...skills, value]);
      setSelectedSkill('');
    }
  };

  // Remove skill
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Pick resume file
  const pickResume = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets[0]) {
        const file = result.assets[0];
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          Alert.alert('Error', 'Resume file size must be less than 5MB');
          return;
        }
        setResume(file);
      }
    } catch (err) {
      console.error('Error picking resume:', err);
    }
  };

  // Open camera or gallery to upload image
  const pickImage = async (setImage, maxSize = 5 * 1024 * 1024) => {
    Alert.alert(
      'Select Image Source',
      'Choose where to get the image from:',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
            if (!cameraPerm.granted) {
              alert('Camera permission is required.');
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              quality: 1,
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
            });
            if (!result.canceled && result.assets?.length > 0) {
              const asset = result.assets[0];
              if (asset.fileSize && asset.fileSize > maxSize) {
                Alert.alert('Error', 'Image size must be less than 5MB');
                return;
              }
              setImage(asset);
            }
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
            if (!result.canceled && result.assets?.length > 0) {
              const asset = result.assets[0];
              if (asset.fileSize && asset.fileSize > maxSize) {
                Alert.alert('Error', 'Image size must be less than 5MB');
                return;
              }
              setImage(asset);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.password) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      // Validate exactly 5 skills
      if (skills.length !== MAX_SKILLS) {
        Alert.alert('Skills Required', `Please select exactly ${MAX_SKILLS} skills`);
        return;
      }

      // Create FormData object
      const data = new FormData();
      
      // Required fields
      data.append('full_name', formData.fullName.trim());
      data.append('email', formData.email.trim());
      data.append('password', formData.password);
      
      // Optional fields - ensure they're strings
      data.append('address', (formData.address || '').trim());
      data.append('phone_number', (formData.contactNumber || '').trim());
      data.append('short_bio', (formData.bio || '').trim());
      data.append('disability', (formData.disabilityType || '').trim());
      data.append('skills', skills.join(',').trim());

      // File fields with proper React Native FormData format
      if (resume) {
        data.append('resume', {
          uri: Platform.OS === 'ios' ? resume.uri.replace('file://', '') : resume.uri,
          type: 'application/pdf',
          name: resume.name || 'resume.pdf'
        });
      }

      if (profileImage) {
        data.append('profile_pic', {
          uri: Platform.OS === 'ios' ? profileImage.uri.replace('file://', '') : profileImage.uri,
          type: 'image/jpeg',
          name: 'profile_pic.jpg'
        });
      }

      if (pwdFront) {
        data.append('pwd_id_front', {
          uri: Platform.OS === 'ios' ? pwdFront.uri.replace('file://', '') : pwdFront.uri,
          type: 'image/jpeg',
          name: 'pwd_front.jpg'
        });
      }

      if (pwdBack) {
        data.append('pwd_id_back', {
          uri: Platform.OS === 'ios' ? pwdBack.uri.replace('file://', '') : pwdBack.uri,
          type: 'image/jpeg',
          name: 'pwd_back.jpg'
        });
      }

      // console.log('Attempting to send form data to:', `${API_BASE_URL}/signupEmployee`); <------FOR CHECKING CONECTION OF API
      
      // Make API call without Content-Type header
      const response = await fetch(`${API_BASE_URL}/employee/signup`, {
        method: 'POST',
        body: data
      });

      // Get the response text first to see what's coming back
      const responseText = await response.text();
      // console.log('Raw response:', responseText); <---------for debiuginggg raw response checking

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        // console.error('Failed to parse response as JSON:', responseText);
        // throw new Error('Invalid JSON response from server'); < --------FOR DEBUGINGGG ERROR LOG CATCHING
      }

      if (!response.ok) {
        // console.error('Server response:', {
        //   status: response.status,
        //   statusText: response.statusText,
        //   headers: Object.fromEntries(response.headers.entries()),
        //   body: result
        // }); < --------FOR DEBUGINGGG ERROR LOG CATCHING

        throw new Error(
          result.message || 
          result.error || 
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      if (result.Status === 'Successfull' || result.status === 'successfull') {
        Alert.alert('Success', 'Registration successful!', [
          { text: 'OK', onPress: () => { router.push('/LoginPage');}}
        ]);
      } else {
        Alert.alert('Error', result.Message || result.message || 'Registration failed');
      }
    } catch (error) {
      // console.error('Error during registration:', {
      //   message: error.message,
      //   stack: error.stack,
      //   url: `${API_BASE_URL}/signupEmployee`
      // }); < --------FOR DEBUGINGGG ERROR LOG CATCHING
      
      if (error.message.includes('Network request failed')) {
        Alert.alert(
          'Connection Error',
          'Unable to connect to the server. Please check your internet connection and make sure the API server is running.'
        );
      } else {
        Alert.alert(
          'Registration Error',
          `Failed to register: ${error.message}\n\nPlease check the console for more details.`
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>More Information</Text>

            {/* Full Name Input */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              placeholder="Enter full name"
              value={formData.fullName}
              onChangeText={(text) => handleChange('fullName', text)}
              style={styles.input}
            />

            {/* Profile Image Upload */}
            <Text style={styles.label}>Profile Image</Text>
            <TouchableOpacity onPress={() => pickImage(setProfileImage)} style={styles.button}>
              <Text style={styles.buttonText}>Upload or Take a Photo</Text>
            </TouchableOpacity>
            {profileImage && (
              <Image source={{ uri: profileImage.uri }} style={styles.imagePreview} />
            )}

            {/* Resume Upload */}
            <Text style={styles.label}>Resume (PDF, max 5MB)</Text>
            <TouchableOpacity onPress={pickResume} style={styles.button}>
              <Text style={styles.buttonText}>Upload Resume</Text>
            </TouchableOpacity>
            {resume && (
              <Text style={styles.resumeSelected}>
                Selected: {resume.name}
              </Text>
            )}

            {/* Dynamic Form Inputs */}
            {[
              { label: 'Address', key: 'address' },
              { label: 'Contact Number', key: 'contactNumber' },
              { label: 'Educational Background', key: 'education' },
            ].map((input) => (
              <View key={input.key}>
                <Text style={styles.label}>{input.label}</Text>
                <TextInput
                  placeholder={`Enter ${input.label.toLowerCase()}`}
                  value={formData[input.key]}
                  onChangeText={(text) => handleChange(input.key, text)}
                  style={styles.input}
                />
              </View>
            ))}

            {/* Short Bio */}
            <Text style={styles.label}>Short Bio</Text>
            <TextInput
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChangeText={(text) => handleChange('bio', text)}
              multiline
              numberOfLines={4}
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            />

            {/* PWD ID Uploads */}
            <Text style={styles.label}>PWD ID (Front and Back)</Text>
            <View style={styles.pwdContainer}>
              {/* Front */}
              <View style={styles.pwdHalf}>
                <TouchableOpacity onPress={() => pickImage(setPwdFront)} style={[styles.button, { marginBottom: 10 }]}>
                  <Text style={styles.buttonText}>Front</Text>
                </TouchableOpacity>
                {pwdFront && (
                  <Image
                    source={{ uri: pwdFront.uri }}
                    style={styles.imagePreview}
                  />
                )}
              </View>

              {/* Back */}
              <View style={styles.pwdHalf}>
                <TouchableOpacity onPress={() => pickImage(setPwdBack)} style={[styles.button, { marginBottom: 10 }]}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                {pwdBack && (
                  <Image
                    source={{ uri: pwdBack.uri }}
                    style={styles.imagePreview}
                  />
                )}
              </View>
            </View>

            {/* Disability Type */}
            <Text style={styles.label}>Type of Disability</Text>
            <TextInput
              placeholder="e.g., Visual, Hearing, Physical"
              value={formData.disabilityType}
              onChangeText={(text) => handleChange('disabilityType', text)}
              style={styles.input}
            />

            {/* Skills Selection */}
            <Text style={[styles.label, { marginTop: 20 }]}>Skills (Select exactly 5)</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillChip}>
                  <Text style={styles.skillText}>{skill}</Text>
                  <TouchableOpacity onPress={() => removeSkill(skill)}>
                    <Text style={styles.removeSkill}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            
            <Text style={styles.skillsCount}>
              Selected: {skills.length}/{MAX_SKILLS} skills
            </Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedSkill}
                onValueChange={handleSkillSelect}
                enabled={skills.length < MAX_SKILLS}
                style={styles.picker}
              >
                <Picker.Item label="Select a skill..." value="" />
                {SKILLS_DATA.map((item) => (
                  <Picker.Item 
                    key={item.id} 
                    label={`${item.skill} (${item.category})`} 
                    value={item.skill}
                    enabled={!skills.includes(item.skill)}
                  />
                ))}
              </Picker>
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              style={[styles.button, { marginTop: 20 }]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EmployeeInfoForm;
