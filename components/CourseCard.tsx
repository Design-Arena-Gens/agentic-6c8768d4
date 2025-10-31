import Link from 'next/link';
import { Course } from '@/lib/types';

interface CourseCardProps {
  course: Course;
  onEdit?: (course: Course) => void;
  onDelete?: (courseId: string) => void;
  showActions?: boolean;
}

export default function CourseCard({ course, onEdit, onDelete, showActions = false }: CourseCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 bg-gradient-to-r from-primary-400 to-primary-600">
        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl">
          📚
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {course.isPaid ? (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
              ${course.price}
            </span>
          ) : (
            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
              FREE
            </span>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty.toUpperCase()}
          </span>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-1">⭐</span>
            <span className="font-semibold">{course.rating}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <span className="mr-1">👤</span>
            <span>{course.instructorName}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">⏱️</span>
            <span>{course.duration}h</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <span className="mr-1">👥</span>
            <span>{course.enrolledStudents} students</span>
          </div>
          <div className="flex items-center">
            <span className={`w-2 h-2 rounded-full mr-2 ${course.published ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            <span>{course.published ? 'Published' : 'Draft'}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Link
            href={`/courses/${course.id}`}
            className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            View Course
          </Link>
          {showActions && (
            <>
              <button
                onClick={() => onEdit?.(course)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete?.(course.id)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
