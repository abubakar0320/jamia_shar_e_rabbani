export interface FeeConfig {
  admissionFee: number;
  registrationFee: number;
  session: string;
  totalFee?: number;
  totalLateFee?: number;
}

export interface Admission {
  id: number;
  studentName: string;
  fatherName: string;
  dob?: string;
  cnic?: string;
  mobile: string;
  whatsapp?: string;
  sectionType: string;
  classProgram: string;
  takhassusType?: string;
  challanNo: string;
  applicationNo: string;
  date: string;
  fees: FeeConfig;
  status?: string;
  rejectionReason?: string;
  documents?: Record<string, { name: string; size: string; type: string; url?: string; data?: string }>;
}

export interface Student extends Admission {
  studentId: string;
  rollNo: string;
  studentStatus?: string; // Active, Inactive, Graduated, Suspended
}

export interface Faculty {
  id: number;
  facultyId: string;
  name: string;
  designation: string;
  department: string;
  specialization?: string;
  qualification?: string;
  university?: string;
  researchAreas?: string;
  teachingExperience?: string;
  contactNumber: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  joinDate?: string;
  employmentStatus?: string;
  subjectsTaught?: string[];
  responsibilities?: string;
  status: string; // Active, Inactive, Retired, Visiting
  photo?: string;
  documents?: Record<string, { name: string; size: string; type: string; url?: string; data?: string }>;
  attendance?: { present: number; absent: number };
  publications?: { title: string; type: string; year: string; file?: string }[];
  isLeadership?: boolean;
}

export interface Course {
  id: number;
  courseId?: string;
  title: string;
  level?: string;
  duration: string;
  desc?: string;
  fullDescription?: string;
  eligibility?: string;
  learningOutcomes?: string[];
  status?: string;
  featured?: boolean;
  image?: string;
  syllabus?: { title: string; file: string }[];
  playlists?: { id: string; title: string; listId?: string; videoId?: string; url?: string; description?: string }[];
  curriculum?: { semester: string; subjects: string[] }[];
  seo?: { metaTitle: string; metaDesc: string; keywords: string; slug: string };
  enrollmentStats?: { total: number; tulba: number; talibat: number };
}

export interface SubjectMark {
  subject: string;
  obtained: number;
  total: number;
}

export interface Result {
  id: number;
  resultId: string;
  studentId: string;
  rollNo: string;
  studentName: string;
  fatherName: string;
  classProgram: string;
  session: string;
  sectionType: string;
  subjects: SubjectMark[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  position?: string;
  status: string;
  outcome: string;
}

export interface FeeStructure {
  id: number;
  sectionType: string;
  classProgram: string;
  admissionFee: number;
  registrationFee: number;
}

export interface FeeCategory {
  id: number;
  name: string;
  amount: number;
  description: string;
  status: 'Active' | 'Inactive';
  dateCreated: string;
}

export interface Challan {
  id: number;
  challanNo: string;
  studentId: string;
  rollNo: string;
  studentName: string;
  fatherName: string;
  classProgram: string;
  session: string;
  feeDetails: { type: string; amount: number }[];
  totalAmount: number;
  issueDate: string;
  dueDate: string;
  status: string; // Paid, Unpaid, Partially Paid, Pending Verification
  paidAmount: number;
  paymentDate?: string;
  paymentMethod?: string;
  transactionId?: string;
  senderPhone?: string;
  paymentProofUrl?: string;
  paymentSubmittedAt?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface InternshipApplication {
  id?: number;
  applicationNo: string;
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  education: string;
  fieldOfInterest: string;
  date: string;
  status?: string;
}

export interface CertProfile {
  id: number;
  name: string;
  slug: string;
  domain: string;
  cnic?: string;
  phone?: string;
  university?: string;
  issueDate?: string;
  documents?: any;
}

export const OFFICIAL_CLASSES = [
  "Amma Part One", "Amma Part Two", "Khasa Part One", "Khasa Part Two",
  "Aliya Part One", "Aliya Part Two", "Almiya Part One", "Almiya Part Two",
  "Amma Khasusi", "Khasa Khasusi", "Almiya Khasusi Part One", "Almiya Khasusi Part Two",
  "Hifz-ul-Quran", "Tajweed-o-Qira'at", "Takhassus"
];

