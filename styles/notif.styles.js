// notif.styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2d8d8',
    paddingTop: 40,
  },
  header: {
    backgroundColor: '#6cbba6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
    marginRight: 30, // To offset for the back button space
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9e9e9',
    marginVertical: 5,
    marginHorizontal: 8,
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  messageTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  previewText: {
    fontSize: 12,
    color: '#555',
  },
  backButton: {
    backgroundColor: '#c5e5dc',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
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
});
