'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { addCourse, addActivity } from '@/lib/data';
import { Course, Module } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function CreateCoursePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    duration: 0,
    isPaid: false,
    price: 0,
    tags: '',
  });

  const [modules, setModules] = useState<Module[]>([]);
  const [currentModule, setCurrentModule] = useState({
    title: '',
    description: '',
    lessons: [] as any[],
  });

  const handleCourseDataChange = (field: string, value: any) => {
    setCourseData({ ...courseData, [field]: value });
  };

  const handleAddModule = () => {
    if (currentModule.title) {
      const newModule: Module = {
        id: `m${modules.length + 1}`,
        title: currentModule.title,
        description: currentModule.description,
        order: modules.length + 1,
        lessons: currentModule.lessons,
      };
      setModules([...modules, newModule]);
      setCurrentModule({ title: '', description: '', lessons: [] });
    }
  };

  const handleAddLesson = () => {
    const newLesson = {
      id: `l${currentModule.lessons.length + 1}`,
      title: 'New Lesson',
      description: 'Lesson description',
      type: 'video',
      content: '',
      duration: 10,
      order: currentModule.lessons.length + 1,
    };
    setCurrentModule({
      ...currentModule,
      lessons: [...currentModule.lessons, newLesson],
    });
  };

  const handleSubmit = () => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: courseData.title,
      description: courseData.description,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
      instructorId: '1',
      instructorName: 'John Instructor',
      duration: courseData.duration,
      difficulty: courseData.difficulty,
      tags: courseData.tags.split(',').map((t) => t.trim()).filter((t) => t),
      isPaid: courseData.isPaid,
      price: courseData.isPaid ? courseData.price : undefined,
      modules: modules,
      enrolledStudents: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
      published: false,
    };

    addCourse(newCourse);
    addActivity({
      id: `a${Date.now()}`,
      type: 'course_created',
      userId: '1',
      userName: 'John Instructor',
      courseId: newCourse.id,
      courseName: newCourse.title,
      timestamp: new Date().toISOString(),
      description: `created new course: ${newCourse.title}`,
    });

    router.push('/courses');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Course</h1>
          <p className="text-gray-600">Build and publish your course in a few simple steps</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <div className="ml-4">
                <p className="font-semibold text-gray-900">Basic Info</p>
              </div>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-full ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'} transition-all`} style={{ width: step >= 2 ? '100%' : '0%' }}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <div className="ml-4">
                <p className="font-semibold text-gray-900">Content</p>
              </div>
            </div>
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <div className={`h-full ${step >= 3 ? 'bg-primary-600' : 'bg-gray-200'} transition-all`} style={{ width: step >= 3 ? '100%' : '0%' }}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <div className="ml-4">
                <p className="font-semibold text-gray-900">Review</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={courseData.title}
                    onChange={(e) => handleCourseDataChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Introduction to Web Development"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={courseData.description}
                    onChange={(e) => handleCourseDataChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe what students will learn in this course..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level *
                    </label>
                    <select
                      value={courseData.difficulty}
                      onChange={(e) => handleCourseDataChange('difficulty', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (hours) *
                    </label>
                    <input
                      type="number"
                      value={courseData.duration}
                      onChange={(e) => handleCourseDataChange('duration', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., 40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={courseData.tags}
                    onChange={(e) => handleCourseDataChange('tags', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Web Development, HTML, CSS, JavaScript"
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={courseData.isPaid}
                      onChange={(e) => handleCourseDataChange('isPaid', e.target.checked)}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">This is a paid course</span>
                  </label>
                </div>
                {courseData.isPaid && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (USD) *
                    </label>
                    <input
                      type="number"
                      value={courseData.price}
                      onChange={(e) => handleCourseDataChange('price', parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., 99.99"
                      step="0.01"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>

              {/* Existing Modules */}
              {modules.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Added Modules</h3>
                  <div className="space-y-3">
                    {modules.map((module, index) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{module.title}</h4>
                            <p className="text-sm text-gray-600">{module.lessons.length} lessons</p>
                          </div>
                          <button
                            onClick={() => setModules(modules.filter((_, i) => i !== index))}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Module Form */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Module</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Module Title
                    </label>
                    <input
                      type="text"
                      value={currentModule.title}
                      onChange={(e) => setCurrentModule({ ...currentModule, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Introduction to HTML"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Module Description
                    </label>
                    <textarea
                      value={currentModule.description}
                      onChange={(e) => setCurrentModule({ ...currentModule, description: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Brief description of this module..."
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Lessons ({currentModule.lessons.length})
                      </label>
                      <button
                        onClick={handleAddLesson}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        + Add Lesson
                      </button>
                    </div>
                    {currentModule.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="bg-gray-50 p-3 rounded mb-2">
                        <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleAddModule}
                    disabled={!currentModule.title}
                    className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Module to Course
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> You can add more detailed lessons and upload content after creating the course.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Publish</h2>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Details</h3>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Title</dt>
                      <dd className="mt-1 text-sm text-gray-900">{courseData.title}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Difficulty</dt>
                      <dd className="mt-1 text-sm text-gray-900 capitalize">{courseData.difficulty}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Duration</dt>
                      <dd className="mt-1 text-sm text-gray-900">{courseData.duration} hours</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Pricing</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {courseData.isPaid ? `$${courseData.price}` : 'Free'}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-sm text-gray-700">{courseData.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Structure</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {modules.length} modules • {modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                  </p>
                  {modules.map((module) => (
                    <div key={module.id} className="bg-gray-50 p-4 rounded-lg mb-3">
                      <h4 className="font-semibold text-gray-900">{module.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{module.lessons.length} lessons</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && (!courseData.title || !courseData.description)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Create Course
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
