'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    // If no role is stored, default to candidate and force re-login
    if (!role) {
      localStorage.clear();
      window.location.href = '/login';
      return;
    }
    setUserRole(role);
  }, []);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-16">
      <nav className="p-4 space-y-2">
        <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-lg transition-colors">
          Dashboard
        </Link>
        {userRole === 'candidate' ? (
          <>
            <Link href="/dashboard/jobs" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-lg transition-colors">
              Jobs
            </Link>
            <Link href="/dashboard/applications" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-lg transition-colors">
              My Applications
            </Link>
            <Link href="/dashboard/profile" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-lg transition-colors">
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard/manage-jobs" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-lg transition-colors">
              Manage Jobs
            </Link>
            <Link href="/dashboard/create-job" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-lg transition-colors">
              Create Job
            </Link>
            <Link href="/dashboard/hr-applications" className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white rounded-lg transition-colors">
              Applications
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
