export type UserRole = 'admin' | 'instructor' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  isPaid: boolean;
  price?: number;
  modules: Module[];
  enrolledStudents: number;
  rating: number;
  createdAt: string;
  published: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'scorm' | 'pdf' | 'document' | 'quiz';
  content: string;
  duration: number;
  order: number;
  completed?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  passingScore: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | number;
  points: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
  completed: boolean;
  completedAt?: string;
}

export interface Activity {
  id: string;
  type: 'upload' | 'enrollment' | 'completion' | 'course_created';
  userId: string;
  userName: string;
  courseId?: string;
  courseName?: string;
  timestamp: string;
  description: string;
}

export interface DashboardStats {
  totalCourses: number;
  activeStudents: number;
  completionRate: number;
  revenue: number;
  recentActivities: Activity[];
}
