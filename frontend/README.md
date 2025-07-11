📅 Doctor & Patient Appointment Management System

🧩 Features
✅ Patient Side:
View upcoming and past appointments

Book new appointments via a calendar modal

Suggested time slots based on doctor availability

Conflict detection for overlapping appointments

Automatically updates appointment status (e.g., Confirmed → Completed after date passes)

🩺 Doctor Side:
View appointment requests

Approve, reject, or edit appointments

Filter/search by date, status, patient/doctor name

Smart UI with color-coded status tags and notes

appointment-system/
│
├── frontend/                                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── PatientAppointmentSection.jsx     # Main UI logic for listing & managing appointments for patient
│   │   │   ├── DoctorAppointmentSection.jsx      # Main UI logic for listing & managing appointments for doctor
│   │   │   └── SuggestedTimes.jsx                # Time slot suggestion component
│   │   ├── assets/
│   │   │   └── user.jpg                          # Default patient avatar
│   │   └── App.jsx                               # Entry point
│   └── package.json
│
├── server/                    # Backend
│   ├── controllers/
│   │   └── appointmentController.js              # Handles CRUD operations for appointments
│   ├── models/
│   │   └── Appointment.js                        # Mongoose schema/model for appointments
│   ├── routes/
│   │   └── appointments.js                       # API routes for appointments
│   ├── server.js                                 # Express app entry point
│   └── .env                                      # MongoDB URI & server port
│
└── README.md


📄 File Descriptions
🔧 Backend
File	Purpose
server.js -	Bootstraps Express app and connects to MongoDB
models/Appointment.js -	Defines appointment schema using Mongoose
routes/appointments.js -	REST API routes (GET, POST, PUT, DELETE)
controllers/appointmentController.js -	CRUD logic and business rules for appointments

💻 Frontend
File	Purpose
PatientAppointmentSection.jsx -	Displays list of appointments with filters and modal for patient
DoctorAppointmentSection.jsx -	Displays list of appointments with filters and modal for doctor
SuggestedTimes.jsx -	Generates and highlights available time slots
App.jsx	Main - React component
user.jpg -	Default avatar for appointments



⚙️ Technologies Used
Layer	Tech Stack
Frontend	React.js, Tailwind CSS, React Datepicker, Axios, React Hot Toast
Backend	Node.js, Express.js
Database	MongoDB (Mongoose)


🗃️ Appointment Fields
Each appointment record contains:

patient: Name of the patient

p_id: Auto-generated patient ID

doctor: Name of the doctor

specialty: Doctor's specialty

date: Appointment date (YYYY-MM-DD)

time: Appointment time (e.g., "3:30 PM")

status: One of Pending, Confirmed, Completed, Rejected

notes: Extra information or purpose

patientAvatar: patient image/avatar


🌐 API Routes
Base: /api/appointments
Method	Route	Description
GET	/	Fetch all appointments
POST	/	Create a new appointment
PUT	/:id	Update appointment (frontend uses this for edit)
DELETE	/:id	Delete appointment
PUT	/:id/status	Update only the status (e.g., Confirm, Reject)



🔄 Status Lifecycle
Status	Meaning
Pending	Requested by patient, waiting for doctor reply
Confirmed	Approved by doctor
Rejected	Rejected by doctor
Completed	Auto-marked after date has passed

