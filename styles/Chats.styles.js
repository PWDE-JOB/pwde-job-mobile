import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    // Remove position absolute - let it be normal flow
  },

  backButton: {
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

  headerInfo: {
    flex: 1,
    marginLeft: 8,
  },

  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },

  jobTitle: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '500',
    marginBottom: 6,
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  applicationStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },

  applicationStatusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },

  messagesContainer: {
    flex: 1, // Takes all available space between header and input
  },

  chatScroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#f5f5f5'
  },

  messagesContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },

  dateSeparator: {
    alignItems: 'center',
    marginVertical: 12,
  },

  dateText: {
    fontSize: 12,
    color: '#888',
    backgroundColor: '#e9e9e9',
    paddingHorizontal: 12,
    paddingVertical: 4, 
    borderRadius: 12,
    overflow: 'hidden',
  },

  chatRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },

  chatUserRight: {
    justifyContent: 'flex-end',
  },

  chatUserLeft: {
    justifyContent: 'flex-start',
  },

  chatBubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  userBubble: {
    backgroundColor: '#5ABDBD', // Lighter teal for employee
    alignSelf: 'flex-end',
    marginLeft: '25%',
  },

  employerBubble: {
    backgroundColor: '#0E3E3A', // Darker teal for employer
    alignSelf: 'flex-start',
    marginRight: '25%',
  },

  chatText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
  },

  linkText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
  },

  chatTime: {
    color: '#ddd',
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },

  messageType: {
    color: '#bbb',
    fontSize: 8,
    marginTop: 2,
    alignSelf: 'flex-end',
    fontStyle: 'italic',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: '#0066CC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  retryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  chatHeader: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },

  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  chatSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },

  emptyChatText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },

  inputSection: {
    // Remove absolute positioning and extra space
    paddingHorizontal: 16,
    paddingVertical: 12, // Reduced padding
    borderTopWidth: 1,
    borderColor: '#e9e9e9',
    backgroundColor: '#ffffff',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
    maxHeight: 120,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    paddingVertical: 8,
    maxHeight: 100,
    textAlignVertical: 'top',
  },

  sendButton: {
    marginLeft: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#3d9c9c',
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },

  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default styles;
