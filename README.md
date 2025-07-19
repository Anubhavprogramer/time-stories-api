# Time Stories API

A web application that fetches and displays the latest top stories from Time Magazine with a beautiful, responsive user interface.

## 📖 Overview

This project consists of:
- A Node.js backend server that scrapes Time Magazine for top stories


## 🛠️ Tech Stack

- **Backend**: Node.js with native HTTP/HTTPS modules
- **Data**: Web scraping using regex patterns

## 📁 Project Structure

```
time-stories-api/
├── server.js           # Node.js server with API endpoints
├── utils/
│   ├── extractTopArticles.js  # Article extraction logic
│   ├── fetchHTML.js           # HTML fetching utility
│   └── extractFullData.js     # Additional data extraction utilities
└── README.md           # Project documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- A modern web browser

### Installation

1. **Clone the repository** (if using Git):
   ```bash
   git clone <repository-url>
   cd time-stories-api
   ```

2. **No additional dependencies** required - the project uses only Node.js built-in modules!

### Running the Application

1. **Start the server**:
   ```bash
   node server.js
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

3. **Click the "Get Latest Stories" button** to fetch and display the latest Time Magazine stories!

## 🔌 API Endpoints

### GET `/`
- **Description**: Server status and welcome message
- **Response**: JSON with server status and timestamp

### GET `/getTimeStories`
- **Description**: Fetches the latest top stories from Time Magazine
- **Response**: JSON array with story objects
- **Story Object Structure**:
  ```json
  {
    "title": "Story Title",
    "link": "https://time.com/article-url"
  }
  ```

##  How It Works

1. **Web Scraping**: The server fetches HTML from Time.com
2. **Data Extraction**: Regex patterns extract article titles and links
3. **API Response**: Server returns structured JSON data
4. **Frontend Display**: JavaScript dynamically creates and displays story cards
5. **User Interaction**: Smooth animations and responsive feedback

##  Usage Examples

### Fetching Stories Programmatically

```javascript
// Fetch stories using the API
fetch('/getTimeStories')
  .then(response => response.json())
  .then(stories => {
    console.log('Latest stories:', stories);
  });
```

### Example Response

```json
[
  {
    "title": "Breaking News: Latest Updates",
    "link": "https://time.com/breaking-news-updates"
  },
  {
    "title": "Technology Trends in 2025",
    "link": "https://time.com/tech-trends-2025"
  }
]
```

## 🔍 Troubleshooting

### Common Issues

1. **Server won't start**:
   - Check if port 3000 is available
   - Ensure Node.js is installed properly

2. **No stories displayed**:
   - Check browser console for errors
   - Verify server is running on http://localhost:3000

3. **Stories not loading**:
   - Check internet connection
   - Verify Time.com is accessible

### Error Messages

- **"Failed to fetch stories"**: Server connection issue
- **"No stories found"**: Parsing issue or Time.com structure changed
