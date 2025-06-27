import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  headerBar: {
    fontSize: 22,
    fontWeight: 'bold',
    
    marginBottom: 10,
    padding: 20,
    alignSelf: 'flex-start',
  },

  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#c5e5dc',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  backText: {

    fontWeight: 'bold',
    color: '#114640',
    fontSize: 14,
  },

  headerTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  chatScroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 80,
    backgroundColor: '#ddd'
  },

  chatRow: {
    flexDirection: 'row',
    marginVertical: 6,
backgroundColor: 'fff'
  },

  chatUserRight: {
    justifyContent: 'flex-end',
  },

  chatUserLeft: {
    justifyContent: 'flex-start',
  },

  chatBubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  userBubble: {
    backgroundColor: '#5ABDBD', // Lighter teal for employee
    alignSelf: 'flex-end',
  },

  employerBubble: {
    backgroundColor: '#0E3E3A', // Darker teal for employer
    alignSelf: 'flex-start',
  },

  chatText: {
    color: '#fff',
    fontSize: 15,
  },

  chatTime: {
    color: '#ddd',
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },

  inputSection: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 30,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f2f2',
    borderRadius: 30,
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    height: 44,
    fontSize: 15,
    color: '#333',
    marginTop: 15
  },

  sendButton: {
    marginLeft: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#3d9c9c',
    borderRadius: 20,
  },

  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  scrollView:
  {
flex: 1,
backgroundColor: '#fff',

  }
});

export default styles;
