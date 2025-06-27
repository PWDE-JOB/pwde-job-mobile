import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#acd5d0',
    paddingTop: 20,
  },
  cardWrapper: {
    width: SCREEN_WIDTH - 32,
    alignSelf: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: '#e2eeec',
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: SCREEN_HEIGHT * 0.8,
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 24,
    color: 'black',
    marginBottom: 8,
    fontWeight: '600',
  },
  location: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
  },
  salary: {
    fontSize: 18,
    color: '#025306',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  skillsLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#96c0b3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  skillText: {
    color: '#21332a',
    fontSize: 14,
  },
  basicInfoLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  matchScore: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 40,
  },
  circleButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#6cbba6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 35,
    marginBottom: -1,
  },
  navItem: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f4fdfb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 20,
    color: '#333',
  }
});
