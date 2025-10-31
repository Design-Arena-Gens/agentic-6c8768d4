'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { currentUser } from '@/lib/data';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/courses', label: 'Courses', icon: '📚' },
    { href: '/create-course', label: 'Create Course', icon: '➕' },
    { href: '/students', label: 'Students', icon: '👥' },
    { href: '/analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                🎓 My Learning Hub
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{currentUser.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{currentUser.role}</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                  {currentUser.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
