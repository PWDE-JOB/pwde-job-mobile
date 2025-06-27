// settings.styles.js
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
    marginRight: 30,
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
  scrollArea: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#114640',
  },
  settingItem: {
    backgroundColor: '#d9e9e9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  settingItemRow: {
    backgroundColor: '#d9e9e9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 14,
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#ff6961',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
