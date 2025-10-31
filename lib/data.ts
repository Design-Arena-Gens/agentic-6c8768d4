import { Course, DashboardStats, Activity, User, Enrollment } from './types';

// Mock current user
export const currentUser: User = {
  id: '1',
  name: 'John Instructor',
  email: 'john@example.com',
  role: 'instructor',
};

// Mock courses data
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. Perfect for beginners starting their coding journey.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
    instructorId: '1',
    instructorName: 'John Instructor',
    duration: 40,
    difficulty: 'beginner',
    tags: ['Web Development', 'HTML', 'CSS', 'JavaScript'],
    isPaid: false,
    enrolledStudents: 234,
    rating: 4.7,
    createdAt: '2024-01-15',
    published: true,
    modules: [
      {
        id: 'm1',
        title: 'Getting Started with HTML',
        description: 'Introduction to HTML basics and structure',
        order: 1,
        lessons: [
          {
            id: 'l1',
            title: 'What is HTML?',
            description: 'Understanding HTML and its role in web development',
            type: 'video',
            content: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            duration: 15,
            order: 1,
          },
          {
            id: 'l2',
            title: 'HTML Document Structure',
            description: 'Learn about the basic structure of an HTML document',
            type: 'video',
            content: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            duration: 20,
            order: 2,
          },
          {
            id: 'l3',
            title: 'HTML Elements Quiz',
            description: 'Test your knowledge of HTML elements',
            type: 'quiz',
            content: 'quiz-1',
            duration: 10,
            order: 3,
          },
        ],
      },
      {
        id: 'm2',
        title: 'CSS Fundamentals',
        description: 'Learn to style your web pages with CSS',
        order: 2,
        lessons: [
          {
            id: 'l4',
            title: 'Introduction to CSS',
            description: 'What is CSS and why we need it',
            type: 'video',
            content: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            duration: 18,
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Advanced React Development',
    description: 'Master React with hooks, context, and advanced patterns. Build production-ready applications.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    instructorId: '1',
    instructorName: 'John Instructor',
    duration: 60,
    difficulty: 'advanced',
    tags: ['React', 'JavaScript', 'Frontend'],
    isPaid: true,
    price: 99.99,
    enrolledStudents: 156,
    rating: 4.9,
    createdAt: '2024-02-20',
    published: true,
    modules: [
      {
        id: 'm3',
        title: 'React Hooks Deep Dive',
        description: 'Master React Hooks',
        order: 1,
        lessons: [
          {
            id: 'l5',
            title: 'useState and useEffect',
            description: 'Understanding the fundamental hooks',
            type: 'video',
            content: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            duration: 25,
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Python for Data Science',
    description: 'Complete Python course covering pandas, numpy, and data visualization for data science applications.',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop',
    instructorId: '1',
    instructorName: 'John Instructor',
    duration: 50,
    difficulty: 'intermediate',
    tags: ['Python', 'Data Science', 'Machine Learning'],
    isPaid: true,
    price: 79.99,
    enrolledStudents: 189,
    rating: 4.8,
    createdAt: '2024-03-10',
    published: true,
    modules: [],
  },
];

// Mock activities
export const mockActivities: Activity[] = [
  {
    id: 'a1',
    type: 'enrollment',
    userId: 'u1',
    userName: 'Alice Johnson',
    courseId: '1',
    courseName: 'Introduction to Web Development',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    description: 'enrolled in Introduction to Web Development',
  },
  {
    id: 'a2',
    type: 'completion',
    userId: 'u2',
    userName: 'Bob Smith',
    courseId: '2',
    courseName: 'Advanced React Development',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    description: 'completed Advanced React Development',
  },
  {
    id: 'a3',
    type: 'upload',
    userId: '1',
    userName: 'John Instructor',
    courseId: '3',
    courseName: 'Python for Data Science',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    description: 'uploaded new content to Python for Data Science',
  },
  {
    id: 'a4',
    type: 'enrollment',
    userId: 'u3',
    userName: 'Carol White',
    courseId: '3',
    courseName: 'Python for Data Science',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    description: 'enrolled in Python for Data Science',
  },
];

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalCourses: 3,
  activeStudents: 579,
  completionRate: 68,
  revenue: 15847.50,
  recentActivities: mockActivities,
};

// Storage functions
let courses = [...mockCourses];
let activities = [...mockActivities];

export const getCourses = (): Course[] => {
  return courses;
};

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(c => c.id === id);
};

export const addCourse = (course: Course): void => {
  courses.push(course);
};

export const updateCourse = (id: string, updates: Partial<Course>): void => {
  const index = courses.findIndex(c => c.id === id);
  if (index !== -1) {
    courses[index] = { ...courses[index], ...updates };
  }
};

export const deleteCourse = (id: string): void => {
  courses = courses.filter(c => c.id !== id);
};

export const getDashboardStats = (): DashboardStats => {
  return {
    ...mockDashboardStats,
    totalCourses: courses.length,
    recentActivities: activities,
  };
};

export const addActivity = (activity: Activity): void => {
  activities.unshift(activity);
  if (activities.length > 10) {
    activities = activities.slice(0, 10);
  }
};
