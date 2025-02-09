"use client"
import React, { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'CUSTOMERS' | 'ORGANIZERS'>('CUSTOMERS')
  const [referralCode, setReferralCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, email, password, role, referralCode }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      setMessage('Registration successful! Check your email to confirm.')
      setName('')
      setUsername('')
      setEmail('')
      setPassword('')
      setRole('CUSTOMERS')
      setReferralCode('')
    } catch (error: unknown) {
        if (error instanceof Error
        ) {
            setMessage(error.message)
        }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded shadow p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2 focus:outline-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Username</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2 focus:outline-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded w-full p-2 focus:outline-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded w-full p-2 focus:outline-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Role</label>
            <select
              className="border border-gray-300 rounded w-full p-2 focus:outline-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value as 'CUSTOMERS' | 'ORGANIZERS')}
              required
            >
              <option value="CUSTOMERS">CUSTOMERS</option>
              <option value="ORGANIZERS">ORGANIZERS</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Referral Code (Optional)</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2 focus:outline-blue-500"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 w-full"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-red-600 font-semibold">{message}</p>
        )}

        <p className="mt-6 text-sm text-center text-gray-600">
          Already registered?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Please log in
          </Link>
        </p>
      </div>
    </div>
  )
}
