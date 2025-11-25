'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardNavbar() {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const userId = payload.userId;
          
          const res = await fetch(`http://localhost:8000/api/auth/user/${userId}`);
          if (res.ok) {
            const user = await res.json();
            setUserName(user.name);
            localStorage.setItem('userName', user.name);
          } else {
            // Fallback to localStorage
            const name = localStorage.getItem('userName');
            if (name) setUserName(name);
          }
        }
      } catch (err) {
        // Fallback to localStorage
        const name = localStorage.getItem('userName');
        if (name) setUserName(name);
      }
    };
    
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 h-16 fixed top-0 left-0 right-0 z-10">
      <div className="h-full px-4 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-blue-600">Workin</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">{userName}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
