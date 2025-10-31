'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { getCourses, deleteCourse } from '@/lib/data';
import { Course } from '@/lib/types';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    const allCourses = getCourses();
    setCourses(allCourses);
  };

  const handleDelete = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      deleteCourse(courseId);
      loadCourses();
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'published' && course.published) ||
      (filter === 'draft' && !course.published);

    const matchesSearch =
      searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Library</h1>
          <p className="text-gray-600">Manage and organize your courses</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Courses ({courses.length})
              </button>
              <button
                onClick={() => setFilter('published')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'published'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Published ({courses.filter((c) => c.published).length})
              </button>
              <button
                onClick={() => setFilter('draft')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'draft'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Drafts ({courses.filter((c) => !c.published).length})
              </button>
            </div>
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                showActions={true}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? 'Try adjusting your search criteria'
                : 'Get started by creating your first course'}
            </p>
            <a
              href="/create-course"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Create New Course
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
