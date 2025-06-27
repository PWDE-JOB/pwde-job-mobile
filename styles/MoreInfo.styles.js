import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // General Layout
  container: {
    flex: 1,
    backgroundColor: '#b4d9d3',
    padding: 20,
  },

  // Typography
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: '#196262',
    marginBottom: 20,
  },
  subText: {
    marginTop: 10,
    marginBottom: 30,
    fontSize: 14,
    fontWeight: '400',
    color: '#444',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 1,
  },

  // Card
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    width: '100%',
  },

  innerBox: {
    width: 150,
    height: 180,
    backgroundColor: '#a3d9a5',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  // Button
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3d9c9c',
    backgroundColor: '#3d9c9c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    elevation: 3,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 20,
  },

  // TextInput
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
  },

  // Header/Footer
  header: {
    width: '100%',
    height: 30,
    backgroundColor: '#a3d9a5',
  },
  footer: {
    width: '100%',
    height: 30,
    backgroundColor: '#a3d9a5',
  },
    card1: 
    {
    width: 300,
    height: 180,
    backgroundColor: '#fffff',
    borderRadius: 20,
    margin:30,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,

  },
 container: {
    flex: 1,
    backgroundColor: '#b4d9d3', // updated from #f3f2ef
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  containerz: {
    alignItems: 'center',
    justifyContent: 'center',
  
},
skillzz:
{
flexDirection: 'row',
alignItems: 'center',
margin: 4,
backgroundColor: '#f0f0f0',
paddingHorizontal: 10,
paddingVertical: 6,
borderRadius: 20,
},
label: {
  fontWeight: 'bold',
  marginBottom: 6,
  marginTop: 15,
  color: '#3d9c9c',
},
skillsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 10,
  gap: 8,
  width: '100%',
},
skillChip: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#e0e0e0',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
  marginBottom: 4,
},
skillText: {
  fontSize: 14,
  marginRight: 6,
  color: '#333',
},
removeSkill: {
  color: '#ff4444',
  fontSize: 18,
  fontWeight: 'bold',
  padding: 4,
},
skillsCount: {
  fontSize: 14,
  color: '#666',
  marginBottom: 10,
  textAlign: 'right',
},
pickerContainer: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  marginBottom: 20,
  backgroundColor: '#fff',
  width: '100%',
  overflow: 'hidden',
},
picker: {
  width: '100%',
  height: Platform.OS === 'ios' ? 150 : 50,
  backgroundColor: '#fff',
},

// Image preview
imagePreview: {
  width: 100,
  height: 100,
  marginTop: 10,
  borderRadius: 10,
  alignSelf: 'center',
},

// PWD ID section
pwdContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 20,
  width: '100%',
},

pwdHalf: {
  flex: 1,
  alignItems: 'center',
},

// Resume section
resumeSelected: {
  marginTop: 5,
  color: 'green',
  fontSize: 12,
  textAlign: 'center',
},
});

export default styles;
