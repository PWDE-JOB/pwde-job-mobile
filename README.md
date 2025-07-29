# PWDE-JOB Mobile App

## Message System Implementation

### Overview
The messaging system follows an Indeed-like approach where:
- **Employers initiate conversations** by messaging employees about their job applications
- **Employees can only reply** once they receive a message from an employer
- Real-time messaging is implemented using WebSocket connections
- All messages are stored persistently in the database

### Technical Implementation

#### WebSocket Connection
- **Endpoint**: `ws://pwde-job-api.onrender.com/ws/chat/{user_id}?token={access_token}`
- **Authentication**: Uses session token from login
- **Auto-reconnection**: Automatically reconnects if connection drops

#### Message Format
```javascript
{
  "sender_id": "user_id_of_sender",
  "receiver_id": "user_id_of_receiver",
  "job_id": "related_job_id",
  "type": "text",
  "message": "Hello, this is a message!"
}
```

#### Key Features
1. **Real-time messaging** - Messages appear instantly for both parties
2. **Offline message storage** - Messages are stored when users are offline
3. **Connection status indicator** - Shows if user is connected or disconnected
4. **Message read receipts** - Tracks message delivery and read status
5. **Job context** - Each conversation is tied to a specific job application

### File Structure

#### Updated Files:
- `app/(tabs)/inbox.jsx` - Shows conversation list (employers who messaged you)
- `app/Chats.jsx` - Real-time chat interface with WebSocket
- `styles/inbox.styles.js` - Styles for inbox UI
- `styles/Chats.styles.js` - Styles for chat interface

#### Key Components:
- **Inbox Screen**: Lists all conversations initiated by employers
- **Chat Screen**: Real-time messaging interface
- **WebSocket Service**: Handles real-time communication
- **Message Components**: Chat bubbles with proper styling

### Usage Flow

1. **Employee applies for job** using the job application system
2. **Employer reviews application** and decides to message the employee
3. **Employer sends first message** via their dashboard (web interface)
4. **Employee receives notification** and can see the message in their inbox
5. **Employee can now reply** and have a full conversation about the job

### Environment Variables
- `EXPO_PUBLIC_API_BASE_URL`: Set to `https://pwde-job-api.onrender.com`

### Dependencies
- `@react-native-async-storage/async-storage`: For storing session tokens
- `expo-router`: For navigation between screens
- WebSocket (native): For real-time messaging

### Error Handling
- Connection errors with retry functionality
- Authentication errors with login redirection
- Message sending errors with user feedback
- Offline handling with message queuing

### Future Enhancements
- Push notifications for new messages
- File sharing capabilities
- Video call integration
- Message search functionality
- Typing indicators

---

## Installation & Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create .env file with:
EXPO_PUBLIC_API_BASE_URL=https://pwde-job-api.onrender.com
```

3. Run the app:
```bash
npm start
```

## Testing the Message System

1. **Login as employee** and apply for jobs
2. **Login as employer** (web interface) and message an employee
3. **Return to mobile app** and check the inbox
4. **Start chatting** in real-time!

The system is now ready for real-time messaging between employers and employees. 



Progresss right now. Sending recieveing