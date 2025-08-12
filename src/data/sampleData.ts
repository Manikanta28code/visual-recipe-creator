// Sample data for testing without backend
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'parent' | 'student';
  phone?: string;
  address?: string;
  joinDate: string;
  status: 'active' | 'inactive';
  children?: string[]; // For parents - list of student IDs
}

export interface Student {
  id: string;
  name: string;
  email?: string;
  class: string;
  section: string;
  rollNumber: string;
  parentId: string;
  academicYear: string;
  dateOfBirth: string;
  status: 'active' | 'inactive';
}

export interface Invoice {
  id: string;
  studentId: string;
  studentName: string;
  academicYear: string;
  term: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'overdue' | 'pending';
  createdDate: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  amount: number;
  category: 'tuition' | 'library' | 'transport' | 'activity' | 'exam' | 'miscellaneous';
}

export interface FeeStructure {
  id: string;
  academicYear: string;
  class: string;
  term: string;
  fees: FeeItem[];
  isActive: boolean;
  createdDate: string;
}

export interface FeeItem {
  id: string;
  category: 'tuition' | 'library' | 'transport' | 'activity' | 'exam' | 'miscellaneous';
  description: string;
  amount: number;
  isOptional: boolean;
}

export interface PaymentSchedule {
  id: string;
  academicYear: string;
  term: string;
  dueDate: string;
  reminderDate: string;
  description: string;
  isActive: boolean;
}

// Sample Users
export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@school.edu',
    role: 'admin',
    phone: '+1234567890',
    address: '123 School St',
    joinDate: '2023-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Teacher',
    email: 'jane.teacher@school.edu',
    role: 'staff',
    phone: '+1234567891',
    address: '456 Teacher Ave',
    joinDate: '2023-02-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Robert Parent',
    email: 'robert.parent@email.com',
    role: 'parent',
    phone: '+1234567892',
    address: '789 Parent Rd',
    joinDate: '2023-03-10',
    status: 'active',
    children: ['s1', 's2']
  },
  {
    id: '4',
    name: 'Mary Parent',
    email: 'mary.parent@email.com',
    role: 'parent',
    phone: '+1234567893',
    address: '321 Family St',
    joinDate: '2023-03-15',
    status: 'active',
    children: ['s3']
  }
];

// Sample Students
export const sampleStudents: Student[] = [
  {
    id: 's1',
    name: 'Alice Smith',
    email: 'alice.student@school.edu',
    class: '10',
    section: 'A',
    rollNumber: '10A01',
    parentId: '3',
    academicYear: '2024-25',
    dateOfBirth: '2008-05-15',
    status: 'active'
  },
  {
    id: 's2',
    name: 'Bob Smith',
    email: 'bob.student@school.edu',
    class: '8',
    section: 'B',
    rollNumber: '8B05',
    parentId: '3',
    academicYear: '2024-25',
    dateOfBirth: '2010-08-22',
    status: 'active'
  },
  {
    id: 's3',
    name: 'Carol Johnson',
    class: '9',
    section: 'A',
    rollNumber: '9A12',
    parentId: '4',
    academicYear: '2024-25',
    dateOfBirth: '2009-12-03',
    status: 'active'
  }
];

// Sample Invoices
export const sampleInvoices: Invoice[] = [
  {
    id: 'inv-001',
    studentId: 's1',
    studentName: 'Alice Smith',
    academicYear: '2024-25',
    term: 'Term 1',
    totalAmount: 15000,
    paidAmount: 10000,
    dueAmount: 5000,
    dueDate: '2024-09-30',
    status: 'partial',
    createdDate: '2024-08-01',
    items: [
      { id: 'item-1', description: 'Tuition Fee', amount: 12000, category: 'tuition' },
      { id: 'item-2', description: 'Library Fee', amount: 1500, category: 'library' },
      { id: 'item-3', description: 'Activity Fee', amount: 1500, category: 'activity' }
    ]
  },
  {
    id: 'inv-002',
    studentId: 's2',
    studentName: 'Bob Smith',
    academicYear: '2024-25',
    term: 'Term 1',
    totalAmount: 12000,
    paidAmount: 12000,
    dueAmount: 0,
    dueDate: '2024-09-30',
    status: 'paid',
    createdDate: '2024-08-01',
    items: [
      { id: 'item-4', description: 'Tuition Fee', amount: 10000, category: 'tuition' },
      { id: 'item-5', description: 'Library Fee', amount: 1000, category: 'library' },
      { id: 'item-6', description: 'Activity Fee', amount: 1000, category: 'activity' }
    ]
  },
  {
    id: 'inv-003',
    studentId: 's3',
    studentName: 'Carol Johnson',
    academicYear: '2024-25',
    term: 'Term 1',
    totalAmount: 13000,
    paidAmount: 0,
    dueAmount: 13000,
    dueDate: '2024-08-15',
    status: 'overdue',
    createdDate: '2024-08-01',
    items: [
      { id: 'item-7', description: 'Tuition Fee', amount: 11000, category: 'tuition' },
      { id: 'item-8', description: 'Library Fee', amount: 1000, category: 'library' },
      { id: 'item-9', description: 'Transport Fee', amount: 1000, category: 'transport' }
    ]
  }
];

// Sample Fee Structures
export const sampleFeeStructures: FeeStructure[] = [
  {
    id: 'fee-struct-1',
    academicYear: '2024-25',
    class: '10',
    term: 'Term 1',
    isActive: true,
    createdDate: '2024-07-01',
    fees: [
      { id: 'fee-1', category: 'tuition', description: 'Tuition Fee', amount: 12000, isOptional: false },
      { id: 'fee-2', category: 'library', description: 'Library Fee', amount: 1500, isOptional: false },
      { id: 'fee-3', category: 'activity', description: 'Activity Fee', amount: 1500, isOptional: true },
      { id: 'fee-4', category: 'transport', description: 'Transport Fee', amount: 2000, isOptional: true }
    ]
  },
  {
    id: 'fee-struct-2',
    academicYear: '2024-25',
    class: '9',
    term: 'Term 1',
    isActive: true,
    createdDate: '2024-07-01',
    fees: [
      { id: 'fee-5', category: 'tuition', description: 'Tuition Fee', amount: 11000, isOptional: false },
      { id: 'fee-6', category: 'library', description: 'Library Fee', amount: 1000, isOptional: false },
      { id: 'fee-7', category: 'activity', description: 'Activity Fee', amount: 1000, isOptional: true },
      { id: 'fee-8', category: 'transport', description: 'Transport Fee', amount: 2000, isOptional: true }
    ]
  },
  {
    id: 'fee-struct-3',
    academicYear: '2023-24',
    class: '10',
    term: 'Term 1',
    isActive: false,
    createdDate: '2023-07-01',
    fees: [
      { id: 'fee-9', category: 'tuition', description: 'Tuition Fee', amount: 11000, isOptional: false },
      { id: 'fee-10', category: 'library', description: 'Library Fee', amount: 1200, isOptional: false },
      { id: 'fee-11', category: 'activity', description: 'Activity Fee', amount: 1000, isOptional: true }
    ]
  }
];

// Sample Payment Schedules
export const samplePaymentSchedules: PaymentSchedule[] = [
  {
    id: 'schedule-1',
    academicYear: '2024-25',
    term: 'Term 1',
    dueDate: '2024-09-30',
    reminderDate: '2024-09-15',
    description: 'First Term Fee Payment',
    isActive: true
  },
  {
    id: 'schedule-2',
    academicYear: '2024-25',
    term: 'Term 2',
    dueDate: '2024-12-31',
    reminderDate: '2024-12-15',
    description: 'Second Term Fee Payment',
    isActive: true
  },
  {
    id: 'schedule-3',
    academicYear: '2024-25',
    term: 'Term 3',
    dueDate: '2025-03-31',
    reminderDate: '2025-03-15',
    description: 'Third Term Fee Payment',
    isActive: true
  }
];