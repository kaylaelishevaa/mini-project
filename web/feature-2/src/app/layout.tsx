// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'My Event Management App',
  description: 'Next.js + Express + Prisma + Tailwind (Responsive)',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 min-h-screen">
        {/* Navbar */}
        <nav className="w-full bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="text-xl font-bold">Event Management</div>
            {/* Desktop Nav */}
            <div className="hidden sm:flex space-x-4">
              <a href="/register" className="text-blue-600 hover:underline">
                Register
              </a>
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
              <a href="/logout" className="text-blue-600 hover:underline">
                Logout
              </a>
            </div>

            <div className="sm:hidden">
              <a href="/register" className="mr-3 text-blue-600 hover:underline">
                Register
              </a>
              <a href="/login" className="mr-3 text-blue-600 hover:underline">
                Login
              </a>
              <a href="/logout" className="text-blue-600 hover:underline">
                Logout
              </a>
            </div>
          </div>
        </nav>

        <main className="max-w-2xl mx-auto mt-10 px-4 w-full">{children}</main>
      </body>
    </html>
  )
}
