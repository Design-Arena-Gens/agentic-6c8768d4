'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getCourseById } from '@/lib/data';
import { Course, Lesson } from '@/lib/types';
import Link from 'next/link';

export default function CourseDetailPage() {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  useEffect(() => {
    const courseData = getCourseById(params.id as string);
    if (courseData) {
      setCourse(courseData);
      if (courseData.modules.length > 0) {
        setActiveModuleId(courseData.modules[0].id);
        if (courseData.modules[0].lessons.length > 0) {
          setSelectedLesson(courseData.modules[0].lessons[0]);
        }
      }
    }
  }, [params.id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
            <Link href="/courses" className="text-primary-600 hover:underline">
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Link
                  href="/courses"
                  className="text-primary-600 hover:text-primary-700 flex items-center"
                >
                  ← Back to Courses
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="mr-2">👤</span>
                  <span>{course.instructorName}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">⏱️</span>
                  <span>{course.duration} hours</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">⭐</span>
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">👥</span>
                  <span>{course.enrolledStudents} students</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              {course.isPaid ? (
                <div className="text-3xl font-bold text-green-600 mb-2">${course.price}</div>
              ) : (
                <div className="text-2xl font-bold text-blue-600 mb-2">FREE</div>
              )}
              <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium">
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Course Content */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div className="p-4 bg-primary-600 text-white">
                <h2 className="text-xl font-bold">Course Content</h2>
                <p className="text-sm text-primary-100 mt-1">
                  {course.modules.length} modules • {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                </p>
              </div>
              <div className="max-h-[600px] overflow-y-auto course-player-sidebar">
                {course.modules.map((module) => (
                  <div key={module.id} className="border-b border-gray-200">
                    <button
                      onClick={() => setActiveModuleId(activeModuleId === module.id ? null : module.id)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{module.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{module.lessons.length} lessons</p>
                        </div>
                        <span className="text-gray-400">
                          {activeModuleId === module.id ? '▼' : '▶'}
                        </span>
                      </div>
                    </button>
                    {activeModuleId === module.id && (
                      <div className="bg-gray-50">
                        {module.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => handleLessonSelect(lesson)}
                            className={`w-full p-3 pl-8 text-left hover:bg-gray-100 transition-colors border-l-4 ${
                              selectedLesson?.id === lesson.id
                                ? 'border-primary-600 bg-primary-50'
                                : 'border-transparent'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">
                                    {lesson.type === 'video' ? '▶️' : lesson.type === 'quiz' ? '❓' : '📄'}
                                  </span>
                                  <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                                </div>
                                <p className="text-xs text-gray-600 mt-1 ml-7">{lesson.duration} min</p>
                              </div>
                              {lesson.completed && <span className="text-green-600">✓</span>}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Player */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {selectedLesson.type === 'video' && (
                  <div className="aspect-video bg-black">
                    <video
                      src={selectedLesson.content}
                      controls
                      className="w-full h-full"
                      key={selectedLesson.id}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {selectedLesson.type === 'quiz' && (
                  <div className="aspect-video bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">❓</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Time!</h3>
                      <p className="text-gray-600">Test your knowledge</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedLesson.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedLesson.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="mr-2">⏱️</span>
                        <span>{selectedLesson.duration} minutes</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">📝</span>
                        <span className="capitalize">{selectedLesson.type}</span>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Mark as Complete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select a Lesson</h3>
                <p className="text-gray-600">Choose a lesson from the sidebar to get started</p>
              </div>
            )}

            {/* Course Info Tabs */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-6">
                  <button className="pb-3 px-1 border-b-2 border-primary-600 text-primary-600 font-medium">
                    Overview
                  </button>
                  <button className="pb-3 px-1 border-b-2 border-transparent text-gray-600 hover:text-gray-900">
                    Resources
                  </button>
                  <button className="pb-3 px-1 border-b-2 border-transparent text-gray-600 hover:text-gray-900">
                    Discussions
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">What you'll learn</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Master the fundamentals and advanced concepts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Build real-world projects from scratch</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Apply best practices and industry standards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">Get hands-on experience with practical exercises</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
