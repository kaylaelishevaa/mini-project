"use client"
import React, { useState } from 'react'

export default function RedeemPointsPage() {
  const [userId, setUserId] = useState('')
  const [ticketPrice, setTicketPrice] = useState<number | undefined>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [finalPrice, setFinalPrice] = useState<number | null>(null)

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketPrice) return

    setLoading(true)
    setMessage('')
    setFinalPrice(null)

    try {
      const response = await fetch('http://localhost:8000/api/v1/points/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ticketPrice }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Redeem failed')
      }

      setMessage(data.message)
      setFinalPrice(data.finalPrice)
    } catch (error: unknown) {
        if (error instanceof Error) {
            setMessage(error.message)
        }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded shadow p-6 w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Redeem Points</h1>
      <form onSubmit={handleRedeem} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">User ID</label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full p-2 focus:outline-blue-500"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Ticket Price</label>
          <input
            type="number"
            className="border border-gray-300 rounded w-full p-2 focus:outline-blue-500"
            value={ticketPrice ?? ''}
            onChange={(e) => setTicketPrice(Number(e.target.value))}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 w-full"
        >
          {loading ? 'Redeeming...' : 'Redeem'}
        </button>
      </form>

      {message && <p className="mt-4 text-red-600 font-semibold">{message}</p>}
      {finalPrice !== null && (
        <p className="mt-2 text-green-700 font-semibold">
          Final Price After Redemption: <strong>{finalPrice}</strong>
        </p>
      )}
    </div>
  )
}
