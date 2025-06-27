import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f6f6',
    paddingTop: 40,
  },
  header: {
    backgroundColor: '#6cbba6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#c5e5dc',
    borderRadius: 8,
    marginRight: 12,
  },
  backText: {
    fontWeight: 'bold',
    color: '#114640',
    fontSize: 14,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#114640',
    marginBottom: 10,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  themeButton: {
    padding: 20,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  themeLabel: {
    fontWeight: 'bold',
    color: '#114640',
  },
  textSizeButton: {
    backgroundColor: '#d9e9e9',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    elevation: 3,
  },
  textSizeSmall: {
    fontSize: 12,
    color: '#114640',
  },
  textSizeMedium: {
    fontSize: 18,
    color: '#114640',
  },
  textSizeLarge: {
    fontSize: 24,
    color: '#114640',
  },
});
