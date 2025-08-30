# Crisis Response Now

A modern, GenZ-focused emergency assistance web app for real-time crisis management, resource sharing, and public-government collaboration.

## Features

### 🚀 Public Portal
- **Emergency Resources Dashboard:** Real-time availability of medical, food, water, shelter, electricity, ambulance, and hospital resources near you.
- **Alerts & Updates:** Live alerts for medical emergencies, water distribution, power outages, and more.
- **Local Requests:** See and connect with requests from people nearby for urgent needs.
- **Request Help:** Submit your own emergency request with location, type, urgency, and description. Optionally upload verification images.
- **Share Your Spare 💡:** Share resources (food, water, medicine, shelter, ambulance, etc.) with the community. Upload images for AI verification via `/detect` API. See verification status and reason.
- **Shared by Locals:** Browse resources shared by others, including verification status and image preview.
- **Emergency Contacts:** Quick access to emergency service numbers (Ambulance, Medical Helpline, Crisis Helpline).
- **Modern, Accessible UI:** All sections use Tailwind CSS, gradients, and app color tokens for a beautiful, consistent look.

### 🤖 Emergency Chatbot
- **Floating Chatbot Button:** Instantly open a modal chatbot for emergency FAQs and advice.
- **Real-Time API Integration:** Chatbot connects to `/chat` API for dynamic, context-aware emergency answers.
- **Loading/Error States:** User-friendly feedback while waiting for advice or if the API is unavailable.
- **Session Support:** Each chat uses a session ID for continuity.

### 🏛️ Government Portal (if enabled)
- **Aggregated Public Requests:** View, filter, sort, and export requests from the public for review and action.
- **Status Management:** Approve, reject, or mark requests as pending.
- **CSV Export:** Download filtered requests for offline review.

### 🛡️ Protected Routes
- **Role-Based Access:** Government and public users see different features and dashboards.

### 🧩 UI Components
- **Reusable Design System:** Cards, buttons, badges, inputs, modals, accordions, tables, alerts, and more, all styled for accessibility and consistency.
- **Animated Icons:** Lucide icons for visual clarity and engagement.

### 🖼️ Image Verification
- **AI-Powered Verification:** Uploaded images for resource sharing are sent to `/detect` API for claim validation. Results shown to user and in shared list.

### ⚡ Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Icons:** Lucide
- **API Integration:** Axios for all backend calls
- **Backend (API):** `/chat` for chatbot, `/detect` for image verification (local Flask server)

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

## API Endpoints

- `POST /chat` — Emergency chatbot (expects `{ session_id, message }`)
- `POST /detect` — Image verification for resource sharing (expects image and claim)

## Accessibility & Design
- All UI elements are keyboard accessible and use high-contrast colors.
- Responsive layouts for mobile and desktop.
- Modern gradients, shadows, and animated feedback.

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

## Credits
- UI/UX: Tailwind CSS, Lucide Icons
- API: Flask (Python)
- Design & Development: Your Team

## License
MIT

---
For feedback, issues, or feature requests, open an issue or contact the maintainers.
