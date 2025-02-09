"use client"
import React, { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include', // if using cookie-based auth
        body: JSON.stringify({ emailOrUsername, password }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      setMessage('Login successful!')
    } catch (error: unknown) {
        if (error instanceof Error) {
            setMessage(error.message)
        }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded shadow p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Email or Username</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2 focus:outline-green-500"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded w-full p-2 focus:outline-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-red-600 font-semibold">{message}</p>
        )}

        <p className="mt-6 text-sm text-center text-gray-600">
          Haven’t made an account yet?{' '}
          <Link href="/register" className="text-green-600 hover:underline">
            Please sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
