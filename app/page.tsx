'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import StatCard from '@/components/StatCard';
import ActivityFeed from '@/components/ActivityFeed';
import { getDashboardStats } from '@/lib/data';
import { DashboardStats } from '@/lib/types';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const data = getDashboardStats();
    setStats(data);
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your courses.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon="📚"
            trend={{ value: 12, isPositive: true }}
            colorClass="bg-blue-500"
          />
          <StatCard
            title="Active Students"
            value={stats.activeStudents.toLocaleString()}
            icon="👥"
            trend={{ value: 8, isPositive: true }}
            colorClass="bg-green-500"
          />
          <StatCard
            title="Completion Rate"
            value={`${stats.completionRate}%`}
            icon="✅"
            trend={{ value: 5, isPositive: true }}
            colorClass="bg-purple-500"
          />
          <StatCard
            title="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            icon="💰"
            trend={{ value: 15, isPositive: true }}
            colorClass="bg-yellow-500"
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Enrollment Trends</h2>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary-50 to-purple-50 rounded-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-gray-600">Enrollment trending upward</p>
                <p className="text-3xl font-bold text-primary-600 mt-2">+23%</p>
                <p className="text-sm text-gray-500 mt-1">This month</p>
              </div>
            </div>
          </div>
          <ActivityFeed activities={stats.recentActivities} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/create-course"
              className="flex items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white text-2xl mr-4 group-hover:scale-110 transition-transform">
                ➕
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Create New Course</h3>
                <p className="text-sm text-gray-600">Start building a new course</p>
              </div>
            </a>
            <a
              href="/courses"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl mr-4 group-hover:scale-110 transition-transform">
                📚
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View All Courses</h3>
                <p className="text-sm text-gray-600">Manage your course library</p>
              </div>
            </a>
            <a
              href="/analytics"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl mr-4 group-hover:scale-110 transition-transform">
                📊
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View Analytics</h3>
                <p className="text-sm text-gray-600">Track performance metrics</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
