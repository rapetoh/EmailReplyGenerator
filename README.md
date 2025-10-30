# 🤖 AI Email Reply Generator
<img width="1120" height="480" alt="Design sans titre (11)" src="https://github.com/user-attachments/assets/dee163cd-0fbc-41cd-9a25-b286695aa377" />

<div align="center">

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue?style=for-the-badge&logo=google-chrome)
![Spring Boot](https://img.shields.io/badge/Spring-Boot-green?style=for-the-badge&logo=spring)
![AI Powered](https://img.shields.io/badge/AI-Powered-orange?style=for-the-badge&logo=openai)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Intelligent Gmail integration that generates contextual email replies using AI**

[🚀 Quick-Start](#-quick-start) • [📖 Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [📸 Demo](#-demo) • [🔧 Installation](#-installation)

</div>

---

## 🎯 Overview

Transform your Gmail experience with AI-powered email replies. This project combines a **Chrome Extension** with a **Spring Boot backend** to provide intelligent, context-aware email responses directly within Gmail's interface.

### ✨ What Makes This Special

- **🎨 Seamless Gmail Integration** - Appears naturally in Gmail's compose interface
- **🧠 AI-Powered Intelligence** - Uses Google's Gemini API for contextual responses
- **🎛️ Customizable Tones** - Professional, Friendly, Formal, Casual, or Polite
- **📱 Smart UI Design** - Draggable, expandable button with intuitive controls
- **🔄 Fallback System** - Works even when backend is unavailable
- **⚡ Real-time Processing** - Instant AI generation with loading states

---

## 🚀 Quick Start

### Prerequisites
- **Chrome Browser** (or Chromium-based)
- **Java 17+** and **Maven**
- **Google Gemini API Key**

### 1️⃣ Clone & Setup Backend
```bash
git clone https://github.com/yourusername/Email_Reply_Generator.git
cd Email_Reply_Generator/Email_Reply_Generator

# Set environment variables
export GEMINI_URL="your_gemini_api_url"
export GEMINI_KEY="your_gemini_api_key"

# Start the backend
./mvnw spring-boot:run
```

### 2️⃣ Install Chrome Extension
1. Open Chrome → `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** → Select `Email_Reply_Generator_Ext/` folder
4. Extension is now active! 🎉

### 3️⃣ Test It Out
1. Open Gmail in Chrome
2. Click **Reply** on any email
3. Look for the purple **"AI Reply by Roch"** button
4. Select your preferred tone and click to generate!

---

## 📖 Features

### 🎨 **Intelligent UI Design**
- **Drag Handle** - Dedicated area for repositioning (no accidental clicks)
- **Expand/Collapse** - Minimize to icon-only mode to save space
- **Tone Selector** - 5 different response styles
- **Visual Feedback** - Loading spinners, success/error states

### 🧠 **AI-Powered Responses**
- **Context Awareness** - Analyzes original email content
- **Tone Customization** - Professional, Friendly, Formal, Casual, Polite
- **Signature Preservation** - Keeps your email signature intact
- **Smart Formatting** - Proper line breaks and email structure

### 🔧 **Developer-Friendly**
- **RESTful API** - Clean Spring Boot backend
- **CORS Configured** - Ready for production deployment
- **Error Handling** - Graceful fallbacks and user feedback
- **Modular Architecture** - Easy to extend and customize

---

## 🛠️ Tech Stack

### **Frontend (Chrome Extension)**
- **JavaScript ES6+** - Modern async/await patterns
- **DOM Manipulation** - Gmail interface integration
- **MutationObserver** - Dynamic UI detection
- **CSS3** - Responsive design with animations

### **Backend (Spring Boot)**
- **Spring Boot 3.x** - RESTful API framework
- **Maven** - Dependency management
- **Google Gemini API** - AI text generation
- **CORS Support** - Cross-origin request handling

### **Architecture**
```
┌─────────────────┐    HTTP POST    ┌──────────────────┐    API Call    ┌─────────────┐
│   Gmail Web     │ ──────────────► │  Spring Boot     │ ──────────────► │   Gemini    │
│   (Extension)   │                 │   Backend        │                 │     AI      │
└─────────────────┘                 └──────────────────┘                 └─────────────┘
```

---

## 📸 Demo

### **Gmail Integration**
![Gmail Integration](https://via.placeholder.com/800x400/667eea/ffffff?text=Gmail+AI+Reply+Button)

### **Tone Selection**
![Tone Selection](https://via.placeholder.com/600x300/764ba2/ffffff?text=Professional+Friendly+Formal+Casual+Polite)

### **Drag & Drop Interface**
![Drag Interface](https://via.placeholder.com/600x300/34a853/ffffff?text=Draggable+Expandable+Button)

---

## 🔧 Installation

### **Option 1: Local Development**
```bash
# Backend
git clone https://github.com/yourusername/Email_Reply_Generator.git
cd Email_Reply_Generator/Email_Reply_Generator
./mvnw spring-boot:run

# Extension
# Load Email_Reply_Generator_Ext/ in Chrome extensions
```

### **Option 2: Docker (Coming Soon)**
```bash
docker-compose up -d
```

### **Option 3: Chrome Web Store **
- Professional distribution
- Automatic updates
- Enterprise deployment

---

## 📁 Project Structure

```
Email_Reply_Generator/
├── 📁 Email_Reply_Generator/          # Spring Boot Backend
│   ├── 📁 src/main/java/             # Java source code
│   ├── 📁 src/main/resources/        # Configuration files
│   ├── 📄 pom.xml                    # Maven dependencies
│   └── 📄 Dockerfile                 # Container configuration
├── 📁 Email_Reply_Generator_Ext/      # Chrome Extension
│   ├── 📄 manifest.json              # Extension configuration
│   ├── 📄 content.js                 # Main extension logic
│   ├── 📄 content.css                # Styling
│   ├── 📄 Aireply.png                # Extension icon
│   └── 📄 README.md                  # Extension documentation
├── 📁 Email_Reply_Generator_React/    # React Frontend (Unused)
│   ├── 📁 src/                       # React source code
│   ├── 📁 public/                    # Static assets
│   ├── 📄 package.json               # Node.js dependencies
│   ├── 📄 vite.config.js             # Vite configuration
│   └── 📄 README.md                  # React app documentation
├── 📄 .gitignore                     # Git ignore rules
├── 📄 mvnw                           # Maven wrapper (Unix)
├── 📄 mvnw.cmd                       # Maven wrapper (Windows)
├── 📄 pom.xml                        # Root Maven configuration
└── 📄 README.md                      # This file
```

---

## 🚀 API Documentation

### **Generate Email Reply**
```http
POST /api/email/generate
Content-Type: application/json

{
  "emailContent": "Original email content here...",
  "tone": "professional"
}
```

**Response:**
```json
{
  "reply": "Generated AI reply with proper formatting..."
}
```

**Tone Options:**
- `professional` - Business-appropriate language
- `friendly` - Warm and approachable
- `formal` - Traditional business correspondence
- `casual` - Relaxed and conversational
- `polite` - Courteous and respectful

---

## 🧪 Testing

### **Backend Testing**
```bash
# Unit tests
./mvnw test

# Integration tests
./mvnw verify

# API testing with Postman
# Import the provided Postman collection
```

### **Extension Testing**
1. Load extension in Chrome
2. Open Gmail
3. Test reply generation
4. Verify tone selection
5. Test drag & drop functionality

---

## 🔒 Security & Privacy

- **No Data Storage** - Emails are processed in real-time only
- **Local Processing** - Your data stays on your machine
- **API Key Security** - Environment variable configuration
- **CORS Protection** - Configured for specific origins

---

## 🛣️ Roadmap

### **Phase 1: Core Features** ✅
- [x] Gmail integration
- [x] AI reply generation
- [x] Tone selection
- [x] Drag & drop interface

### **Phase 2: Enhancement** 🚧
- [ ] Custom prompt templates
- [ ] Reply history and favorites
- [ ] Multi-language support
- [ ] Advanced tone customization

### **Phase 3: Distribution** 📋
- [ ] Chrome Web Store publication
- [ ] Enterprise deployment options
- [ ] Mobile app integration
- [ ] API rate limiting and monitoring

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Setup**
```bash
# Fork the repository
git clone https://github.com/yourusername/Email_Reply_Generator.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and test
./mvnw test

# Commit and push
git commit -m "Add amazing feature"
git push origin feature/amazing-feature

# Open Pull Request
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini** - AI text generation
- **Spring Boot** - Backend framework
- **Chrome Extensions API** - Browser integration
- **Gmail** - Email platform integration

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

[🔝 Back to Top](#-ai-email-reply-generator)

</div>
