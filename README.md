# NASA Space Calendar

An interactive calendar app that displays NASA's Astronomy Picture of the Day (APOD) using FullCalendar, with image previews and detail pages.

## Features

- Calendar view with daily APOD entries
- Image preview on hover
- Detailed view with explanation and full image
- Caching to reduce redundant API calls

## Technologies

- React (Frontend)
- Node.js + Express (Backend)
- NASA APOD API
- FullCalendar, Axios
- Hosted on Vercel (frontend) and Render (backend)

## Setup Instructions (Local Development)

### Prerequisites

- Node.js and npm installed

### 1. Clone the Repository

git clone https://github.com/your-username/nasa-space-calendar.git
cd nasa-space-calendar

### 2. Backend Setup
cd backend
npm install

Create a .env file with the following content:
-> NASA_API_KEY=your_nasa_api_key_here

npm start (By default, this should run on http://localhost:5000)

### 3. Frontend Setup
cd ../frontend
npm install

Create a .env file with the following content:
-> REACT_APP_API_URL=http://localhost:5000

npm start (Visit the app in your browser at: http://localhost:3000)


## Future Work

- Restore the calendar to the correct month when returning from a detail view  
- Add next/previous navigation in the detail view to enable a gallery-like browsing experience  
- Implement a date-based search to quickly locate specific APOD entries 
