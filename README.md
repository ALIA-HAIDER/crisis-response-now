# Crisis Response Now

A modern, GenZ-focused emergency assistance web app for real-time crisis management, resource sharing, and public-government collaboration.

---

## Table of Contents
- [About](#about)
- [Portals & Views](#portals--views)
  - [Public Portal](#public-portal)
  - [Government Portal](#government-portal)
  - [Index (Landing) Page](#index-landing-page)
  - [Authentication & Protected Routes](#authentication--protected-routes)
- [API Endpoints & Examples](#api-endpoints--examples)
- [Tech Stack](#tech-stack)
- [UI/UX Highlights](#uiux-highlights)
- [Accessibility & Design](#accessibility--design)
- [How to Run](#how-to-run)
- [Development & Testing](#development--testing)
- [Troubleshooting](#troubleshooting)
- [Folder Structure](#folder-structure)
- [Credits](#credits)
- [License](#license)

---

## About
Crisis Response Now is a web application designed to streamline emergency response, resource sharing, and public-government collaboration during crises. It features real-time dashboards, chatbots, AI-powered verification, and role-based portals for both citizens and government officials.

---

## Portals & Views

### Public Portal (`/public`)
A comprehensive hub for citizens to request help, share resources, and access emergency information.

#### Functionalities:
- **Emergency Resources Dashboard**
  - View real-time status of resources: Medical/Oxygen, Medicine, Food, Water, Shelter, Electricity, Ambulance, Hospital.
  - Status indicators: available, limited, unavailable.
  - Location and quantity details for each resource.
- **Alerts & Updates**
  - Live feed of emergency alerts (medical, water, power, etc.)
  - Priority-based color coding and icons.
  - Timestamp and description for each alert.
- **Local Requests**
  - List of requests from nearby users.
  - Details: requester name, type, urgency, status, location, description, time submitted.
  - Connect button to initiate contact.
- **Request Help**
  - Form to submit emergency requests:
    - Location
    - Requirement type (medical, ambulance, water, shelter, food, power)
    - Urgency (low, medium, high, critical)
    - Description
    - Optional image upload for verification
  - Submit button with loading and error states.
  - Requests tracked in "My Requests" with status updates.
- **Share Your Spare 💡**
  - Form to share resources:
    - Resource type
    - Location
    - Description
    - Contact number
    - Optional image upload (with preview)
  - AI verification via `/detect` API; feedback on claim correctness and reason.
  - Shared resources listed with verification status, image preview, and details.
- **Shared by Locals**
  - List of all resources shared by users.
  - Shows verification status, image, description, location, contact, and time.
- **Emergency Contacts**
  - Quick-access buttons for Ambulance (108), Medical Helpline (104), Crisis Helpline (112).
- **Emergency Chatbot**
  - Floating button opens modal chatbot.
  - Real-time advice via `/chat` API.
  - Session-based chat history, loading/error states, and accessibility features.

### Government Portal (`/government`)
A dashboard for officials to review, manage, and export public requests.

#### Functionalities:
- **Aggregated Public Requests**
  - Table of all requests submitted by citizens.
  - Columns: ID, requester, type, urgency, status, location, description, time.
  - Filter by type, status, urgency; search by keyword.
  - Sort by urgency, type, time, requirement.
- **Status Management**
  - Approve, reject, or mark requests as pending.
  - Update status directly from dashboard.
- **CSV Export**
  - Export current view of requests to CSV for offline review or reporting.
- **Request Details**
  - View full details of any request, including images if provided.

### Index (Landing) Page (`/`)
The entry point for all users, introducing the app and guiding them to the appropriate portal.

#### Functionalities:
- **Animated Headings & Icons**
  - Modern, gradient-styled headings and animated Lucide icons.
- **Portal Navigation**
  - Buttons to access Public and Government portals.
- **App Overview**
  - Brief description of features and benefits.
- **Accessibility**
  - High-contrast, keyboard-friendly design.

### Authentication & Protected Routes
- **Role-Based Access**
  - Government and public users see different features and dashboards.
  - Protected routes for sensitive actions (government review, status updates).
- **Login Pages**
  - Government login and authentication (if enabled).

---

## API Endpoints & Examples

### `POST /chat`
- **Purpose:** Get real-time emergency advice from the chatbot.
- **Request:**
  ```json
  {
    "session_id": "1",
    "message": "I am having a bleed in my right arm"
  }
  ```
- **Response:**
  ```json
  {
    "session_id": "1",
    "response": "Step-by-step instructions for controlling bleeding..."
  }
  ```

### `POST /detect`
- **Purpose:** Verify resource claim via image upload.
- **Request:**
  - FormData with fields:
    - `images`: image file
    - `claim`: description of resource
- **Response:**
  ```json
  {
    "claim_correct": true,
    "reason": "Image matches claim."
  }
  ```

---

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Icons:** Lucide
- **API Integration:** Axios for all backend calls
- **Backend (API):** Flask (Python) for `/chat` and `/detect`

---

## UI/UX Highlights
- Modern gradients, shadows, and animated feedback.
- Responsive layouts for mobile and desktop.
- High-contrast, accessible color palette.
- Keyboard navigation and focus states.
- Floating chatbot button for instant help.
- Image previews and verification status in resource sharing.
- Animated icons and elegant transitions.

---

## Accessibility & Design
- All UI elements are keyboard accessible and use high-contrast colors.
- Responsive layouts for mobile and desktop.
- ARIA labels and semantic HTML for screen readers.
- Focus indicators and skip links for navigation.

---

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the frontend:**
   ```bash
   npm run dev
   ```
3. **Start the backend (Flask):**
   ```bash
   # In backend folder
   flask run
   ```
4. **Open in browser:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## Development & Testing
- **Linting:**
  ```bash
  npm run lint
  ```
- **Formatting:**
  ```bash
  npm run format
  ```
- **Hot Reload:**
  All changes are reflected instantly in development mode.
- **Testing:**
  Add your tests in the `src/__tests__` folder and run with your preferred test runner.

## Contribution
- Fork the repo and create a feature branch.
- Submit pull requests with clear descriptions.
- Open issues for bugs or feature requests.

---

## Troubleshooting
- **API not responding:** Ensure Flask backend is running and accessible at `http://127.0.0.1:5000`.
- **Image upload fails:** Check file size and format. Backend must support multipart uploads.
- **CORS issues:** Make sure backend allows requests from frontend origin.
- **UI glitches:** Run `npm run lint` and check browser console for errors.

---

## Folder Structure
```
crisis-response-now-1/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── Public.tsx
│   │   ├── Index.tsx
│   │   └── ...
│   └── App.tsx
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

---

## Credits
- UI/UX: Tailwind CSS, Lucide Icons
- API: Flask (Python)
- Design & Development: Your Team

## License
MIT

---
For feedback, issues, or feature requests, open an issue or contact the maintainers.
