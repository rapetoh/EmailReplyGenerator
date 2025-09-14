# AI Reply by Roch - Gmail Extension

A Chrome extension that adds an "AI reply by Roch" button to Gmail's compose interface, powered by your Spring Boot backend with Gemini AI.

## 🚀 Features

- **Automatic Detection**: Automatically detects Gmail's reply interface
- **AI-Powered Replies**: Generates contextual email replies using Gemini AI
- **Seamless Integration**: Button appears naturally in Gmail's interface
- **Loading States**: Visual feedback during AI generation
- **Fallback Support**: Works even if backend is unavailable
- **Draggable Button**: Move the button to your preferred position
- **Tone Selection**: Choose from 5 different reply tones
- **Signature Preservation**: Keeps your email signature intact

## 📋 Prerequisites

1. **Chrome Browser** (or Chromium-based browser)
2. **Spring Boot Backend** running on `http://localhost:8081`
3. **Gmail Account** (the extension works with Gmail web interface)

## 🛠️ Installation

1. **Load the Extension**:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `Hello Word Extension` folder

2. **Start Your Backend**:
   - Navigate to your Spring Boot project directory
   - Run: `./mvnw spring-boot:run` (or `mvn spring-boot:run`)
   - Ensure it's running on port 8081

3. **Configure Environment Variables** (for backend):
   ```bash
   export GEMINI_URL="your_gemini_api_url"
   export GEMINI_KEY="your_gemini_api_key"
   ```

## 🎯 How to Use

1. **Open Gmail** in your Chrome browser
2. **Click Reply** on any email
3. **Look for the "AI reply by Roch" button** in the top-right corner
4. **Select a tone** from the dropdown (Professional, Friendly, Formal, Casual, Polite)
5. **Drag the button** to your preferred position (optional)
6. **Click the button** to generate an AI-powered reply
7. **Review and send** the generated reply

## 🔧 Technical Details

### Backend Integration
- **Endpoint**: `POST http://localhost:8081/api/email/generate`
- **Request Body**:
  ```json
  {
    "emailContent": "Original email content",
    "tone": "professional"
  }
  ```
- **Response**: Generated email reply as plain text

### Extension Architecture
- **Content Script**: Injects button and handles Gmail interaction
- **MutationObserver**: Watches for Gmail's DOM changes
- **CSS Styling**: Modern, responsive button design
- **Error Handling**: Graceful fallbacks and user feedback

## 🎨 Button Features

- **Draggable**: Click and drag to move anywhere on screen
- **Tone Selection**: 5 different reply tones available
- **Loading Animation**: Spinning icon during AI generation
- **Success/Error States**: Visual feedback for different states
- **Position Memory**: Remembers where you placed the button

## 🎨 Button States

- **Default**: Purple gradient with robot icon
- **Loading**: Gray with spinning icon (during AI generation)
- **Success**: Green (after successful generation)
- **Error**: Red (if generation fails)

## 🔍 Troubleshooting

### Button Not Appearing
- Ensure you're on Gmail's web interface (not mobile)
- Check browser console for errors
- Try refreshing the Gmail page

### AI Generation Not Working
- Verify your Spring Boot backend is running on port 8081
- Check backend logs for errors
- Ensure GEMINI_URL and GEMINI_KEY are set correctly

### CORS Issues
- The backend has `@CrossOrigin(origins = {"http://localhost:5173", "https://mail.google.com"})` configured
- You may need to add additional origins if needed

## 📁 File Structure

```
Hello Word Extension/
├── manifest.json          # Extension configuration
├── content.js            # Main extension logic
├── content.css           # Button styling
├── hello.html            # Popup page (unused in this implementation)
├── hello_extensions.png  # Extension icon
└── README.md            # This file
```

## 🔮 Future Enhancements

- [ ] Custom prompt templates
- [ ] Reply history and favorites
- [ ] Multi-language support
- [ ] Integration with other email providers
- [ ] Advanced tone customization

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Created by Roch** 🤖
