'use client';

import Navbar from '@/components/Navbar';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track performance metrics and insights</p>
        </div>

        {/* Time Range Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium">
                Last 7 Days
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                Last 30 Days
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                Last 90 Days
              </button>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Enrollments</h3>
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">1,247</p>
            <div className="flex items-center text-sm text-green-600">
              <span className="mr-1">↑</span>
              <span>18.2%</span>
              <span className="text-gray-500 ml-1">vs last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Course Completions</h3>
              <span className="text-2xl">🎓</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">843</p>
            <div className="flex items-center text-sm text-green-600">
              <span className="mr-1">↑</span>
              <span>12.5%</span>
              <span className="text-gray-500 ml-1">vs last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Avg. Watch Time</h3>
              <span className="text-2xl">⏱️</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">4.2h</p>
            <div className="flex items-center text-sm text-green-600">
              <span className="mr-1">↑</span>
              <span>8.3%</span>
              <span className="text-gray-500 ml-1">vs last period</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Student Satisfaction</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">4.8/5</p>
            <div className="flex items-center text-sm text-green-600">
              <span className="mr-1">↑</span>
              <span>2.1%</span>
              <span className="text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Enrollment Trends */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Enrollment Trends</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[65, 75, 85, 70, 90, 95, 100].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-primary-500 rounded-t hover:bg-primary-600 transition-colors cursor-pointer"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">Day {index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Performance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Courses</h2>
            <div className="space-y-4">
              {[
                { name: 'Web Development', enrollments: 234, completion: 85, color: 'bg-blue-500' },
                { name: 'React Development', enrollments: 156, completion: 90, color: 'bg-green-500' },
                { name: 'Python Data Science', enrollments: 189, completion: 78, color: 'bg-purple-500' },
                { name: 'UI/UX Design', enrollments: 142, completion: 72, color: 'bg-yellow-500' },
              ].map((course, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{course.name}</span>
                    <span className="text-sm text-gray-600">{course.enrollments} students</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${course.color} h-3 rounded-full flex items-center justify-end pr-2`}
                      style={{ width: `${course.completion}%` }}
                    >
                      <span className="text-xs text-white font-semibold">{course.completion}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-r border-gray-200 pr-6">
              <p className="text-sm font-medium text-gray-600 mb-2">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">$15,847.50</p>
              <p className="text-sm text-green-600">↑ $2,134 this month</p>
            </div>
            <div className="border-r border-gray-200 pr-6">
              <p className="text-sm font-medium text-gray-600 mb-2">Avg. Revenue per Student</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">$27.36</p>
              <p className="text-sm text-green-600">↑ 5.2% increase</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Projected Monthly</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">$18,200</p>
              <p className="text-sm text-gray-500">Based on current trends</p>
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Student Engagement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-4">Activity by Day</h3>
              <div className="space-y-3">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                  const activity = [85, 92, 88, 90, 87, 65, 58][index];
                  return (
                    <div key={day}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{day}</span>
                        <span className="text-sm font-semibold text-gray-900">{activity}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${activity}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-4">Content Type Preferences</h3>
              <div className="space-y-4">
                {[
                  { type: 'Video Lessons', percentage: 65, color: 'bg-blue-500' },
                  { type: 'Interactive Quizzes', percentage: 20, color: 'bg-green-500' },
                  { type: 'Reading Materials', percentage: 10, color: 'bg-purple-500' },
                  { type: 'Assignments', percentage: 5, color: 'bg-yellow-500' },
                ].map((item) => (
                  <div key={item.type}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">{item.type}</span>
                      <span className="text-sm font-semibold text-gray-900">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${item.color} h-3 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
