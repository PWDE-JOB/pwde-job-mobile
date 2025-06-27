import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#b2d8d8',
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: '#6cbba6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32
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
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#114640',
    textAlign: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: '#d9e9e9',
    padding: 16,
    marginTop: 20,
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    color: '#114640',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  salaryInput: {
    flex: 1,
  },
  toText: {
    marginHorizontal: 5,
    fontSize: 16,
    color: '#114640',
  },
  imageButton: {
    backgroundColor: '#6cbba6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 180,
    marginTop: 10,
    borderRadius: 10,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 10,
  },
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c5e5dc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  skillRemove: {
    marginLeft: 6,
    color: '#d63031',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#114640',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
