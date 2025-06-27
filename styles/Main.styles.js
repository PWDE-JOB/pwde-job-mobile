import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // General Layout
  container: {
    flex: 1,
    backgroundColor: '#f3f2ef',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  // Typography
  title: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: '#196262',
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
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    width: '85%',
    alignItems: 'center',
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
    width: 200
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 20,
  },

  // TextInput
  input: {
    backgroundColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  color: '#3d9c9c'
}
});

export default styles;
