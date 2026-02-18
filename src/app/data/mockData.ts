// Mock Data for Dr. Nishat Dental Clinic Management System

export interface Patient {
  id: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  address: string;
  medicalAlerts?: string[];
  referredBy?: string;
  registeredDate: string;
  totalVisits: number;
  outstandingDue: number;
  lastVisit?: string;
  notes?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: string[];
  status: 'Available' | 'On Leave' | 'Busy';
  image?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  visitType: string;
  status: 'Scheduled' | 'Checked-In' | 'Completed' | 'Cancelled' | 'No-Show';
  isWalkIn?: boolean;
  notes?: string;
}

export interface QueueItem {
  token: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  checkInTime: string;
  status: 'Waiting' | 'With Doctor' | 'Completed';
  estimatedWait: number;
}

export interface Treatment {
  id: string;
  patientId: string;
  treatmentName: string;
  tooth?: string;
  doctorId: string;
  doctorName: string;
  cost: number;
  status: 'Planned' | 'In Progress' | 'Completed';
  warranty?: string;
  date: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  gst: number;
  total: number;
  amountPaid: number;
  status: 'Paid' | 'Pending' | 'Partially Paid';
  paymentMethod?: string;
}

export interface InvoiceItem {
  treatmentName: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface TreatmentMaster {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  active: boolean;
}

export interface Document {
  id: string;
  patientId: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  url: string;
}

export interface FollowUp {
  id: string;
  patientId: string;
  patientName: string;
  nextVisitDate: string;
  reason: string;
  reminderStatus: 'Pending' | 'Sent' | 'Confirmed';
  notes?: string;
}

// Doctors
export const doctors: Doctor[] = [
  {
    id: 'D001',
    name: 'Dr. Nishat Ahmed',
    specialty: 'Orthodontist & Cosmetic Dentistry',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    status: 'Available',
  },
  {
    id: 'D002',
    name: 'Dr. Rohan Mehta',
    specialty: 'Endodontist & Root Canal Specialist',
    availability: ['Mon', 'Wed', 'Fri', 'Sat'],
    status: 'Available',
  },
  {
    id: 'D003',
    name: 'Dr. Ayesha Khan',
    specialty: 'Pediatric Dentistry',
    availability: ['Tue', 'Thu', 'Sat'],
    status: 'On Leave',
  },
];

// Patients
export const patients: Patient[] = [
  {
    id: 'P001',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    alternatePhone: '+91 98765 43211',
    age: 42,
    gender: 'Male',
    bloodGroup: 'O+',
    address: '45, MG Road, Bengaluru, Karnataka - 560001',
    medicalAlerts: ['Diabetes', 'Hypertension'],
    referredBy: 'Dr. Sharma',
    registeredDate: '2023-01-15',
    totalVisits: 18,
    outstandingDue: 5000,
    lastVisit: '2026-02-10',
    notes: 'Regular patient, prefers evening slots',
  },
  {
    id: 'P002',
    name: 'Priya Sharma',
    phone: '+91 99887 76543',
    age: 28,
    gender: 'Female',
    bloodGroup: 'A+',
    address: '12, Koramangala, Bengaluru, Karnataka - 560034',
    registeredDate: '2024-03-20',
    totalVisits: 12,
    outstandingDue: 0,
    lastVisit: '2026-02-12',
  },
  {
    id: 'P003',
    name: 'Amit Verma',
    phone: '+91 97654 32109',
    age: 35,
    gender: 'Male',
    bloodGroup: 'B+',
    address: '78, Indiranagar, Bengaluru, Karnataka - 560038',
    medicalAlerts: ['Allergic to Penicillin'],
    registeredDate: '2023-06-10',
    totalVisits: 15,
    outstandingDue: 3500,
    lastVisit: '2026-02-08',
  },
  {
    id: 'P004',
    name: 'Sneha Reddy',
    phone: '+91 96543 21098',
    age: 31,
    gender: 'Female',
    bloodGroup: 'AB+',
    address: '23, Jayanagar, Bengaluru, Karnataka - 560041',
    registeredDate: '2024-01-05',
    totalVisits: 8,
    outstandingDue: 2000,
    lastVisit: '2026-01-28',
  },
  {
    id: 'P005',
    name: 'Arjun Nair',
    phone: '+91 95432 10987',
    age: 45,
    gender: 'Male',
    bloodGroup: 'O-',
    address: '56, Whitefield, Bengaluru, Karnataka - 560066',
    medicalAlerts: ['Asthma'],
    registeredDate: '2023-09-12',
    totalVisits: 10,
    outstandingDue: 0,
    lastVisit: '2026-02-05',
  },
  {
    id: 'P006',
    name: 'Kavya Iyer',
    phone: '+91 94321 09876',
    age: 26,
    gender: 'Female',
    bloodGroup: 'A-',
    address: '89, HSR Layout, Bengaluru, Karnataka - 560102',
    registeredDate: '2024-05-18',
    totalVisits: 6,
    outstandingDue: 1500,
    lastVisit: '2026-02-01',
  },
  {
    id: 'P007',
    name: 'Vivek Patel',
    phone: '+91 93210 98765',
    age: 38,
    gender: 'Male',
    bloodGroup: 'B-',
    address: '34, Marathahalli, Bengaluru, Karnataka - 560037',
    registeredDate: '2023-11-22',
    totalVisits: 14,
    outstandingDue: 4200,
    lastVisit: '2026-02-11',
  },
  {
    id: 'P008',
    name: 'Neha Agarwal',
    phone: '+91 92109 87654',
    age: 29,
    gender: 'Female',
    bloodGroup: 'O+',
    address: '67, Electronic City, Bengaluru, Karnataka - 560100',
    registeredDate: '2024-02-14',
    totalVisits: 9,
    outstandingDue: 0,
    lastVisit: '2026-02-09',
  },
  {
    id: 'P009',
    name: 'Manish Yadav',
    phone: '+91 91098 76543',
    age: 33,
    gender: 'Male',
    bloodGroup: 'AB-',
    address: '45, BTM Layout, Bengaluru, Karnataka - 560076',
    medicalAlerts: ['High BP'],
    registeredDate: '2023-07-30',
    totalVisits: 11,
    outstandingDue: 2800,
    lastVisit: '2026-02-07',
  },
  {
    id: 'P010',
    name: 'Divya Krishnan',
    phone: '+91 90987 65432',
    age: 27,
    gender: 'Female',
    bloodGroup: 'A+',
    address: '12, JP Nagar, Bengaluru, Karnataka - 560078',
    registeredDate: '2024-04-08',
    totalVisits: 7,
    outstandingDue: 1000,
    lastVisit: '2026-01-30',
  },
  {
    id: 'P011',
    name: 'Sanjay Singh',
    phone: '+91 89876 54321',
    age: 50,
    gender: 'Male',
    bloodGroup: 'B+',
    address: '78, Yelahanka, Bengaluru, Karnataka - 560064',
    medicalAlerts: ['Diabetes'],
    registeredDate: '2023-02-18',
    totalVisits: 20,
    outstandingDue: 0,
    lastVisit: '2026-02-13',
  },
  {
    id: 'P012',
    name: 'Anjali Deshmukh',
    phone: '+91 88765 43210',
    age: 24,
    gender: 'Female',
    bloodGroup: 'O+',
    address: '23, Malleswaram, Bengaluru, Karnataka - 560003',
    registeredDate: '2024-06-25',
    totalVisits: 5,
    outstandingDue: 3000,
    lastVisit: '2026-02-06',
  },
  {
    id: 'P013',
    name: 'Rahul Gupta',
    phone: '+91 87654 32109',
    age: 40,
    gender: 'Male',
    bloodGroup: 'A-',
    address: '56, Rajajinagar, Bengaluru, Karnataka - 560010',
    registeredDate: '2023-08-14',
    totalVisits: 13,
    outstandingDue: 5500,
    lastVisit: '2026-02-04',
  },
  {
    id: 'P014',
    name: 'Lakshmi Menon',
    phone: '+91 86543 21098',
    age: 36,
    gender: 'Female',
    bloodGroup: 'B+',
    address: '89, Banashankari, Bengaluru, Karnataka - 560070',
    referredBy: 'Online Search',
    registeredDate: '2024-01-30',
    totalVisits: 9,
    outstandingDue: 0,
    lastVisit: '2026-02-03',
  },
  {
    id: 'P015',
    name: 'Vikram Joshi',
    phone: '+91 85432 10987',
    age: 44,
    gender: 'Male',
    bloodGroup: 'AB+',
    address: '34, RT Nagar, Bengaluru, Karnataka - 560032',
    medicalAlerts: ['Heart Disease'],
    registeredDate: '2023-04-22',
    totalVisits: 16,
    outstandingDue: 4500,
    lastVisit: '2026-02-02',
  },
  {
    id: 'P016',
    name: 'Pooja Saxena',
    phone: '+91 84321 09876',
    age: 30,
    gender: 'Female',
    bloodGroup: 'O-',
    address: '67, Hebbal, Bengaluru, Karnataka - 560024',
    registeredDate: '2024-07-12',
    totalVisits: 4,
    outstandingDue: 1800,
    lastVisit: '2026-01-29',
  },
  {
    id: 'P017',
    name: 'Karthik Raman',
    phone: '+91 83210 98765',
    age: 32,
    gender: 'Male',
    bloodGroup: 'A+',
    address: '12, Sarjapur Road, Bengaluru, Karnataka - 560035',
    registeredDate: '2023-10-05',
    totalVisits: 11,
    outstandingDue: 0,
    lastVisit: '2026-01-27',
  },
  {
    id: 'P018',
    name: 'Sunita Bhat',
    phone: '+91 82109 87654',
    age: 48,
    gender: 'Female',
    bloodGroup: 'B-',
    address: '45, Basavanagudi, Bengaluru, Karnataka - 560004',
    medicalAlerts: ['Thyroid'],
    registeredDate: '2024-03-16',
    totalVisits: 8,
    outstandingDue: 2500,
    lastVisit: '2026-01-26',
  },
  {
    id: 'P019',
    name: 'Aditya Kapoor',
    phone: '+91 81098 76543',
    age: 25,
    gender: 'Male',
    bloodGroup: 'O+',
    address: '78, Vijayanagar, Bengaluru, Karnataka - 560040',
    registeredDate: '2024-08-20',
    totalVisits: 3,
    outstandingDue: 4000,
    lastVisit: '2026-01-25',
  },
  {
    id: 'P020',
    name: 'Meera Pillai',
    phone: '+91 80987 65432',
    age: 37,
    gender: 'Female',
    bloodGroup: 'AB-',
    address: '23, CV Raman Nagar, Bengaluru, Karnataka - 560093',
    registeredDate: '2023-12-08',
    totalVisits: 10,
    outstandingDue: 0,
    lastVisit: '2026-01-24',
  },
  {
    id: 'P021',
    name: 'Rohit Chauhan',
    phone: '+91 79876 54321',
    age: 41,
    gender: 'Male',
    bloodGroup: 'A+',
    address: '56, Kengeri, Bengaluru, Karnataka - 560060',
    registeredDate: '2024-02-28',
    totalVisits: 7,
    outstandingDue: 3200,
    lastVisit: '2026-01-23',
  },
  {
    id: 'P022',
    name: 'Shruti Nambiar',
    phone: '+91 78765 43210',
    age: 28,
    gender: 'Female',
    bloodGroup: 'B+',
    address: '89, Bellandur, Bengaluru, Karnataka - 560103',
    registeredDate: '2024-09-15',
    totalVisits: 2,
    outstandingDue: 1200,
    lastVisit: '2026-01-22',
  },
  {
    id: 'P023',
    name: 'Harish Reddy',
    phone: '+91 77654 32109',
    age: 34,
    gender: 'Male',
    bloodGroup: 'O-',
    address: '34, Nagarbhavi, Bengaluru, Karnataka - 560072',
    medicalAlerts: ['Allergic to Sulfa'],
    registeredDate: '2023-05-19',
    totalVisits: 15,
    outstandingDue: 0,
    lastVisit: '2026-01-21',
  },
  {
    id: 'P024',
    name: 'Varsha Kulkarni',
    phone: '+91 76543 21098',
    age: 31,
    gender: 'Female',
    bloodGroup: 'A-',
    address: '67, Frazer Town, Bengaluru, Karnataka - 560005',
    registeredDate: '2024-04-03',
    totalVisits: 6,
    outstandingDue: 2700,
    lastVisit: '2026-01-20',
  },
  {
    id: 'P025',
    name: 'Nikhil Tiwari',
    phone: '+91 75432 10987',
    age: 39,
    gender: 'Male',
    bloodGroup: 'AB+',
    address: '12, Kammanahalli, Bengaluru, Karnataka - 560084',
    registeredDate: '2023-09-27',
    totalVisits: 12,
    outstandingDue: 5200,
    lastVisit: '2026-01-19',
  },
  {
    id: 'P026',
    name: 'Ananya Rao',
    phone: '+91 74321 09876',
    age: 26,
    gender: 'Female',
    bloodGroup: 'B-',
    address: '45, New BEL Road, Bengaluru, Karnataka - 560054',
    registeredDate: '2024-10-11',
    totalVisits: 1,
    outstandingDue: 800,
    lastVisit: '2026-01-18',
  },
  {
    id: 'P027',
    name: 'Suresh Babu',
    phone: '+91 73210 98765',
    age: 52,
    gender: 'Male',
    bloodGroup: 'O+',
    address: '78, Bannerghatta Road, Bengaluru, Karnataka - 560076',
    medicalAlerts: ['Diabetes', 'High Cholesterol'],
    registeredDate: '2023-03-14',
    totalVisits: 19,
    outstandingDue: 0,
    lastVisit: '2026-01-17',
  },
  {
    id: 'P028',
    name: 'Deepika Shah',
    phone: '+91 72109 87654',
    age: 29,
    gender: 'Female',
    bloodGroup: 'A+',
    address: '23, Yeshwanthpur, Bengaluru, Karnataka - 560022',
    registeredDate: '2024-05-07',
    totalVisits: 5,
    outstandingDue: 1600,
    lastVisit: '2026-01-16',
  },
  {
    id: 'P029',
    name: 'Prakash Mishra',
    phone: '+91 71098 76543',
    age: 46,
    gender: 'Male',
    bloodGroup: 'B+',
    address: '56, Sadashivanagar, Bengaluru, Karnataka - 560080',
    registeredDate: '2023-11-09',
    totalVisits: 13,
    outstandingDue: 3800,
    lastVisit: '2026-01-15',
  },
  {
    id: 'P030',
    name: 'Ritu Malhotra',
    phone: '+91 70987 65432',
    age: 33,
    gender: 'Female',
    bloodGroup: 'AB-',
    address: '89, Richmond Town, Bengaluru, Karnataka - 560025',
    registeredDate: '2024-06-19',
    totalVisits: 4,
    outstandingDue: 0,
    lastVisit: '2026-01-14',
  },
];

// Today's Appointments (February 14, 2026)
export const appointments: Appointment[] = [
  {
    id: 'A001',
    patientId: 'P001',
    patientName: 'Rajesh Kumar',
    doctorId: 'D001',
    doctorName: 'Dr. Nishat Ahmed',
    date: '2026-02-14',
    time: '09:00',
    visitType: 'Root Canal Follow-up',
    status: 'Completed',
  },
  {
    id: 'A002',
    patientId: 'P002',
    patientName: 'Priya Sharma',
    doctorId: 'D002',
    doctorName: 'Dr. Rohan Mehta',
    date: '2026-02-14',
    time: '09:30',
    visitType: 'Teeth Cleaning',
    status: 'Checked-In',
  },
  {
    id: 'A003',
    patientId: 'P003',
    patientName: 'Amit Verma',
    doctorId: 'D001',
    doctorName: 'Dr. Nishat Ahmed',
    date: '2026-02-14',
    time: '10:00',
    visitType: 'Braces Adjustment',
    status: 'Completed',
  },
  {
    id: 'A004',
    patientId: 'P004',
    patientName: 'Sneha Reddy',
    doctorId: 'D002',
    doctorName: 'Dr. Rohan Mehta',
    date: '2026-02-14',
    time: '10:30',
    visitType: 'Tooth Extraction',
    status: 'Checked-In',
    isWalkIn: false,
  },
  {
    id: 'A005',
    patientId: 'P005',
    patientName: 'Arjun Nair',
    doctorId: 'D001',
    doctorName: 'Dr. Nishat Ahmed',
    date: '2026-02-14',
    time: '11:00',
    visitType: 'Consultation',
    status: 'Checked-In',
    isWalkIn: true,
  },
  {
    id: 'A006',
    patientId: 'P007',
    patientName: 'Vivek Patel',
    doctorId: 'D002',
    doctorName: 'Dr. Rohan Mehta',
    date: '2026-02-14',
    time: '11:30',
    visitType: 'Root Canal - Session 2',
    status: 'Scheduled',
  },
  {
    id: 'A007',
    patientId: 'P008',
    patientName: 'Neha Agarwal',
    doctorId: 'D001',
    doctorName: 'Dr. Nishat Ahmed',
    date: '2026-02-14',
    time: '12:00',
    visitType: 'Teeth Whitening',
    status: 'Scheduled',
  },
  {
    id: 'A008',
    patientId: 'P009',
    patientName: 'Manish Yadav',
    doctorId: 'D002',
    doctorName: 'Dr. Rohan Mehta',
    date: '2026-02-14',
    time: '14:00',
    visitType: 'Cavity Filling',
    status: 'Scheduled',
  },
  {
    id: 'A009',
    patientId: 'P011',
    patientName: 'Sanjay Singh',
    doctorId: 'D001',
    doctorName: 'Dr. Nishat Ahmed',
    date: '2026-02-14',
    time: '14:30',
    visitType: 'Denture Fitting',
    status: 'Scheduled',
  },
  {
    id: 'A010',
    patientId: 'P012',
    patientName: 'Anjali Deshmukh',
    doctorId: 'D002',
    doctorName: 'Dr. Rohan Mehta',
    date: '2026-02-14',
    time: '15:00',
    visitType: 'Scaling & Polishing',
    status: 'Scheduled',
  },
  {
    id: 'A011',
    patientId: 'P013',
    patientName: 'Rahul Gupta',
    doctorId: 'D001',
    doctorName: 'Dr. Nishat Ahmed',
    date: '2026-02-14',
    time: '15:30',
    visitType: 'Crown Installation',
    status: 'Scheduled',
  },
  {
    id: 'A012',
    patientId: 'P015',
    patientName: 'Vikram Joshi',
    doctorId: 'D002',
    doctorName: 'Dr. Rohan Mehta',
    date: '2026-02-14',
    time: '16:00',
    visitType: 'General Checkup',
    status: 'Scheduled',
  },
  {
    id: 'A013',
    patientId: 'P016',
    patientName: 'Pooja Saxena',
    doctorId: 'D001',
    doctorName: 'Dr. Nishat Ahmed',
    date: '2026-02-14',
    time: '16:30',
    visitType: 'Wisdom Tooth Consultation',
    status: 'Scheduled',
  },
  {
    id: 'A014',
    patientId: 'P017',
    patientName: 'Karthik Raman',
    doctorId: 'D002',
    doctorName: 'Dr. Rohan Mehta',
    date: '2026-02-14',
    time: '17:00',
    visitType: 'Cavity Filling',
    status: 'Scheduled',
  },
  {
    id: 'A015',
    patientId: 'P019',
    patientName: 'Aditya Kapoor',
    doctorId: 'D001',
    doctorName: 'Dr. Nishat Ahmed',
    date: '2026-02-14',
    time: '17:30',
    visitType: 'Orthodontic Consultation',
    status: 'Scheduled',
  },
];

// Queue
export const queue: QueueItem[] = [
  {
    token: 'T-101',
    patientId: 'P002',
    patientName: 'Priya Sharma',
    doctorName: 'Dr. Rohan Mehta',
    checkInTime: '09:25',
    status: 'With Doctor',
    estimatedWait: 0,
  },
  {
    token: 'T-102',
    patientId: 'P004',
    patientName: 'Sneha Reddy',
    doctorName: 'Dr. Rohan Mehta',
    checkInTime: '10:20',
    status: 'Waiting',
    estimatedWait: 15,
  },
  {
    token: 'T-103',
    patientId: 'P005',
    patientName: 'Arjun Nair',
    doctorName: 'Dr. Nishat Ahmed',
    checkInTime: '10:55',
    status: 'Waiting',
    estimatedWait: 25,
  },
  {
    token: 'T-104',
    patientId: 'P007',
    patientName: 'Vivek Patel',
    doctorName: 'Dr. Rohan Mehta',
    checkInTime: '11:25',
    status: 'Waiting',
    estimatedWait: 35,
  },
  {
    token: 'T-105',
    patientId: 'P009',
    patientName: 'Manish Yadav',
    doctorName: 'Dr. Rohan Mehta',
    checkInTime: '11:28',
    status: 'Waiting',
    estimatedWait: 50,
  },
];

// Treatment Masters
export const treatmentMasters: TreatmentMaster[] = [
  { id: 'T001', name: 'General Consultation', category: 'Consultation', price: 500, duration: 15, active: true },
  { id: 'T002', name: 'Teeth Cleaning (Scaling)', category: 'Preventive', price: 1500, duration: 30, active: true },
  { id: 'T003', name: 'Teeth Whitening', category: 'Cosmetic', price: 8000, duration: 60, active: true },
  { id: 'T004', name: 'Cavity Filling (Composite)', category: 'Restorative', price: 2000, duration: 30, active: true },
  { id: 'T005', name: 'Root Canal Treatment', category: 'Endodontics', price: 8500, duration: 90, active: true },
  { id: 'T006', name: 'Tooth Extraction (Simple)', category: 'Oral Surgery', price: 1500, duration: 30, active: true },
  { id: 'T007', name: 'Tooth Extraction (Surgical)', category: 'Oral Surgery', price: 4000, duration: 60, active: true },
  { id: 'T008', name: 'Crown (Porcelain)', category: 'Restorative', price: 6500, duration: 45, active: true },
  { id: 'T009', name: 'Bridge (3 unit)', category: 'Restorative', price: 18000, duration: 90, active: true },
  { id: 'T010', name: 'Dentures (Partial)', category: 'Prosthetics', price: 12000, duration: 60, active: true },
  { id: 'T011', name: 'Dentures (Full)', category: 'Prosthetics', price: 25000, duration: 90, active: true },
  { id: 'T012', name: 'Braces (Metal)', category: 'Orthodontics', price: 45000, duration: 120, active: true },
  { id: 'T013', name: 'Braces (Ceramic)', category: 'Orthodontics', price: 65000, duration: 120, active: true },
  { id: 'T014', name: 'Invisalign', category: 'Orthodontics', price: 180000, duration: 120, active: true },
  { id: 'T015', name: 'Dental Implant', category: 'Implantology', price: 35000, duration: 120, active: true },
  { id: 'T016', name: 'Wisdom Tooth Removal', category: 'Oral Surgery', price: 5000, duration: 60, active: true },
  { id: 'T017', name: 'Gum Treatment (Deep Cleaning)', category: 'Periodontics', price: 3500, duration: 60, active: true },
  { id: 'T018', name: 'Fluoride Treatment', category: 'Preventive', price: 800, duration: 15, active: true },
  { id: 'T019', name: 'Sealants', category: 'Preventive', price: 1200, duration: 20, active: true },
  { id: 'T020', name: 'X-Ray (Single)', category: 'Diagnostics', price: 300, duration: 10, active: true },
  { id: 'T021', name: 'X-Ray (Full Mouth)', category: 'Diagnostics', price: 1200, duration: 15, active: true },
];

// Treatments (for patients)
export const treatments: Treatment[] = [
  {
    id: 'TR001',
    patientId: 'P001',
    treatmentName: 'Root Canal Treatment',
    tooth: '#16',
    doctorId: 'D002',
    doctorName: 'Dr. Rohan Mehta',
    cost: 8500,
    status: 'Completed',
    warranty: '1 Year',
    date: '2026-02-10',
    notes: 'Post-treatment checkup scheduled',
  },
  {
    id: 'TR002',
    patientId: 'P001',
    treatmentName: 'Crown (Porcelain)',
    tooth: '#16',
    doctorId: 'D002',
    doctorName: 'Dr. Rohan Mehta',
    cost: 6500,
    status: 'Planned',
    date: '2026-02-20',
    notes: 'To be done after RCT healing',
  },
  {
    id: 'TR003',
    patientId: 'P002',
    treatmentName: 'Teeth Cleaning (Scaling)',
    doctorId: 'D002',
    doctorName: 'Dr. Rohan Mehta',
    cost: 1500,
    status: 'In Progress',
    date: '2026-02-14',
  },
  {
    id: 'TR004',
    patientId: 'P003',
    treatmentName: 'Braces (Metal)',
    doctorId: 'D001',
    doctorName: 'Dr. Nishat Ahmed',
    cost: 45000,
    status: 'In Progress',
    warranty: '2 Years',
    date: '2025-06-15',
    notes: 'Monthly adjustments required',
  },
  {
    id: 'TR005',
    patientId: 'P007',
    treatmentName: 'Root Canal Treatment',
    tooth: '#36',
    doctorId: 'D002',
    doctorName: 'Dr. Rohan Mehta',
    cost: 8500,
    status: 'In Progress',
    date: '2026-02-07',
    notes: 'Second session today',
  },
  {
    id: 'TR006',
    patientId: 'P013',
    treatmentName: 'Dental Implant',
    tooth: '#46',
    doctorId: 'D001',
    doctorName: 'Dr. Nishat Ahmed',
    cost: 35000,
    status: 'Planned',
    warranty: '10 Years',
    date: '2026-03-01',
  },
];

// Invoices
export const invoices: Invoice[] = [
  {
    id: 'INV001',
    invoiceNumber: 'DN-2026-001',
    patientId: 'P001',
    patientName: 'Rajesh Kumar',
    date: '2026-02-10',
    items: [
      { treatmentName: 'Root Canal Treatment', quantity: 1, rate: 8500, amount: 8500 },
    ],
    subtotal: 8500,
    discount: 500,
    gst: 1440,
    total: 9440,
    amountPaid: 4440,
    status: 'Partially Paid',
    paymentMethod: 'UPI',
  },
  {
    id: 'INV002',
    invoiceNumber: 'DN-2026-002',
    patientId: 'P002',
    patientName: 'Priya Sharma',
    date: '2026-02-12',
    items: [
      { treatmentName: 'Teeth Whitening', quantity: 1, rate: 8000, amount: 8000 },
    ],
    subtotal: 8000,
    discount: 0,
    gst: 1440,
    total: 9440,
    amountPaid: 9440,
    status: 'Paid',
    paymentMethod: 'Card',
  },
  {
    id: 'INV003',
    invoiceNumber: 'DN-2026-003',
    patientId: 'P003',
    patientName: 'Amit Verma',
    date: '2026-02-08',
    items: [
      { treatmentName: 'Braces Adjustment', quantity: 1, rate: 2000, amount: 2000 },
    ],
    subtotal: 2000,
    discount: 0,
    gst: 360,
    total: 2360,
    amountPaid: 0,
    status: 'Pending',
  },
  {
    id: 'INV004',
    invoiceNumber: 'DN-2026-004',
    patientId: 'P004',
    patientName: 'Sneha Reddy',
    date: '2026-01-28',
    items: [
      { treatmentName: 'Cavity Filling (Composite)', quantity: 2, rate: 2000, amount: 4000 },
    ],
    subtotal: 4000,
    discount: 200,
    gst: 684,
    total: 4484,
    amountPaid: 2484,
    status: 'Partially Paid',
    paymentMethod: 'Cash',
  },
  {
    id: 'INV005',
    invoiceNumber: 'DN-2026-005',
    patientId: 'P007',
    patientName: 'Vivek Patel',
    date: '2026-02-11',
    items: [
      { treatmentName: 'Root Canal Treatment - Session 1', quantity: 1, rate: 4250, amount: 4250 },
    ],
    subtotal: 4250,
    discount: 0,
    gst: 765,
    total: 5015,
    amountPaid: 5015,
    status: 'Paid',
    paymentMethod: 'UPI',
  },
  {
    id: 'INV006',
    invoiceNumber: 'DN-2026-006',
    patientId: 'P011',
    patientName: 'Sanjay Singh',
    date: '2026-02-13',
    items: [
      { treatmentName: 'General Consultation', quantity: 1, rate: 500, amount: 500 },
      { treatmentName: 'X-Ray (Single)', quantity: 1, rate: 300, amount: 300 },
    ],
    subtotal: 800,
    discount: 0,
    gst: 144,
    total: 944,
    amountPaid: 944,
    status: 'Paid',
    paymentMethod: 'Cash',
  },
  {
    id: 'INV007',
    invoiceNumber: 'DN-2026-007',
    patientId: 'P008',
    patientName: 'Neha Agarwal',
    date: '2026-02-09',
    items: [
      { treatmentName: 'Teeth Cleaning (Scaling)', quantity: 1, rate: 1500, amount: 1500 },
      { treatmentName: 'Fluoride Treatment', quantity: 1, rate: 800, amount: 800 },
    ],
    subtotal: 2300,
    discount: 100,
    gst: 396,
    total: 2596,
    amountPaid: 2596,
    status: 'Paid',
    paymentMethod: 'UPI',
  },
  {
    id: 'INV008',
    invoiceNumber: 'DN-2026-008',
    patientId: 'P009',
    patientName: 'Manish Yadav',
    date: '2026-02-07',
    items: [
      { treatmentName: 'Tooth Extraction (Simple)', quantity: 1, rate: 1500, amount: 1500 },
    ],
    subtotal: 1500,
    discount: 0,
    gst: 270,
    total: 1770,
    amountPaid: 0,
    status: 'Pending',
  },
  {
    id: 'INV009',
    invoiceNumber: 'DN-2026-009',
    patientId: 'P012',
    patientName: 'Anjali Deshmukh',
    date: '2026-02-06',
    items: [
      { treatmentName: 'Wisdom Tooth Removal', quantity: 1, rate: 5000, amount: 5000 },
    ],
    subtotal: 5000,
    discount: 0,
    gst: 900,
    total: 5900,
    amountPaid: 2900,
    status: 'Partially Paid',
    paymentMethod: 'Card',
  },
  {
    id: 'INV010',
    invoiceNumber: 'DN-2026-010',
    patientId: 'P006',
    patientName: 'Kavya Iyer',
    date: '2026-02-01',
    items: [
      { treatmentName: 'Crown (Porcelain)', quantity: 1, rate: 6500, amount: 6500 },
    ],
    subtotal: 6500,
    discount: 500,
    gst: 1080,
    total: 7080,
    amountPaid: 5580,
    status: 'Partially Paid',
    paymentMethod: 'UPI',
  },
  {
    id: 'INV011',
    invoiceNumber: 'DN-2026-011',
    patientId: 'P013',
    patientName: 'Rahul Gupta',
    date: '2026-02-04',
    items: [
      { treatmentName: 'General Consultation', quantity: 1, rate: 500, amount: 500 },
      { treatmentName: 'X-Ray (Full Mouth)', quantity: 1, rate: 1200, amount: 1200 },
    ],
    subtotal: 1700,
    discount: 0,
    gst: 306,
    total: 2006,
    amountPaid: 0,
    status: 'Pending',
  },
  {
    id: 'INV012',
    invoiceNumber: 'DN-2026-012',
    patientId: 'P015',
    patientName: 'Vikram Joshi',
    date: '2026-02-02',
    items: [
      { treatmentName: 'Gum Treatment (Deep Cleaning)', quantity: 1, rate: 3500, amount: 3500 },
    ],
    subtotal: 3500,
    discount: 0,
    gst: 630,
    total: 4130,
    amountPaid: 0,
    status: 'Pending',
  },
];

// Follow-ups
export const followUps: FollowUp[] = [
  {
    id: 'F001',
    patientId: 'P001',
    patientName: 'Rajesh Kumar',
    nextVisitDate: '2026-02-20',
    reason: 'Crown Installation',
    reminderStatus: 'Pending',
    notes: 'Crown ready for installation',
  },
  {
    id: 'F002',
    patientId: 'P007',
    patientName: 'Vivek Patel',
    nextVisitDate: '2026-02-21',
    reason: 'Root Canal - Session 3',
    reminderStatus: 'Sent',
  },
  {
    id: 'F003',
    patientId: 'P003',
    patientName: 'Amit Verma',
    nextVisitDate: '2026-03-14',
    reason: 'Braces Adjustment',
    reminderStatus: 'Confirmed',
  },
  {
    id: 'F004',
    patientId: 'P013',
    patientName: 'Rahul Gupta',
    nextVisitDate: '2026-03-01',
    reason: 'Dental Implant Surgery',
    reminderStatus: 'Pending',
  },
  {
    id: 'F005',
    patientId: 'P012',
    patientName: 'Anjali Deshmukh',
    nextVisitDate: '2026-02-18',
    reason: 'Post-extraction checkup',
    reminderStatus: 'Pending',
  },
  {
    id: 'F006',
    patientId: 'P006',
    patientName: 'Kavya Iyer',
    nextVisitDate: '2026-02-15',
    reason: 'Crown fitting check',
    reminderStatus: 'Sent',
  },
  {
    id: 'F007',
    patientId: 'P004',
    patientName: 'Sneha Reddy',
    nextVisitDate: '2026-02-28',
    reason: 'Follow-up checkup',
    reminderStatus: 'Pending',
  },
  {
    id: 'F008',
    patientId: 'P015',
    patientName: 'Vikram Joshi',
    nextVisitDate: '2026-02-16',
    reason: 'Gum treatment follow-up',
    reminderStatus: 'Pending',
  },
  {
    id: 'F009',
    patientId: 'P009',
    patientName: 'Manish Yadav',
    nextVisitDate: '2026-02-17',
    reason: 'Post-extraction checkup',
    reminderStatus: 'Sent',
  },
];

// Documents
export const documents: Document[] = [
  {
    id: 'DOC001',
    patientId: 'P001',
    name: 'X-Ray - Tooth #16',
    type: 'X-Ray',
    uploadDate: '2026-02-10',
    size: '2.3 MB',
    url: '#',
  },
  {
    id: 'DOC002',
    patientId: 'P001',
    name: 'Prescription - Feb 10',
    type: 'Prescription',
    uploadDate: '2026-02-10',
    size: '156 KB',
    url: '#',
  },
  {
    id: 'DOC003',
    patientId: 'P001',
    name: 'Treatment Plan',
    type: 'Document',
    uploadDate: '2026-02-10',
    size: '450 KB',
    url: '#',
  },
  {
    id: 'DOC004',
    patientId: 'P003',
    name: 'Orthodontic Progress - Month 8',
    type: 'Photo',
    uploadDate: '2026-02-08',
    size: '3.1 MB',
    url: '#',
  },
  {
    id: 'DOC005',
    patientId: 'P003',
    name: 'Initial X-Ray',
    type: 'X-Ray',
    uploadDate: '2025-06-15',
    size: '2.5 MB',
    url: '#',
  },
];
