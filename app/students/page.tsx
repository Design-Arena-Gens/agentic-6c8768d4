'use client';

import Navbar from '@/components/Navbar';

export default function StudentsPage() {
  const students = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', enrolledCourses: 3, progress: 75, joinedDate: '2024-01-15' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', enrolledCourses: 5, progress: 90, joinedDate: '2024-02-20' },
    { id: '3', name: 'Carol White', email: 'carol@example.com', enrolledCourses: 2, progress: 45, joinedDate: '2024-03-10' },
    { id: '4', name: 'David Brown', email: 'david@example.com', enrolledCourses: 4, progress: 60, joinedDate: '2024-01-25' },
    { id: '5', name: 'Emma Davis', email: 'emma@example.com', enrolledCourses: 6, progress: 85, joinedDate: '2024-02-05' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Management</h1>
          <p className="text-gray-600">View and manage enrolled students</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">579</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
                👥
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active This Week</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">423</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl">
                ✅
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">68%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl">
                📊
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">47</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white text-2xl">
                ⭐
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search students..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>All Students</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
              Export Data
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrolled Courses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.enrolledCourses}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 max-w-xs">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-3 text-sm text-gray-900">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(student.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-4">View</button>
                    <button className="text-gray-600 hover:text-gray-900">Message</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
