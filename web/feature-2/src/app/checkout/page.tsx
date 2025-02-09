"use client"
import React, { useState } from 'react'

export default function CheckoutTicketPage() {
  const [userId, setUserId] = useState('')
  const [ticketPrice, setTicketPrice] = useState<number | undefined>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [originalPrice, setOriginalPrice] = useState<number | null>(null)
  const [discount, setDiscount] = useState<number | null>(null)
  const [finalPrice, setFinalPrice] = useState<number | null>(null)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketPrice) return

    setLoading(true)
    setMessage('')
    setOriginalPrice(null)
    setDiscount(null)
    setFinalPrice(null)

    try {
      const response = await fetch('http://localhost:8000/api/v1/checkout/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ticketPrice }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Checkout failed')
      }

      setMessage('Checkout successful!')
      setOriginalPrice(data.originalPrice)
      setDiscount(data.discount)
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
      <h1 className="text-2xl font-bold mb-4">Checkout Ticket</h1>
      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">User ID</label>
          <input
            type="text"
            className="border border-gray-300 rounded w-full p-2 focus:outline-purple-500"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Ticket Price</label>
          <input
            type="number"
            className="border border-gray-300 rounded w-full p-2 focus:outline-purple-500"
            value={ticketPrice ?? ''}
            onChange={(e) => setTicketPrice(Number(e.target.value))}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50 w-full"
        >
          {loading ? 'Processing...' : 'Checkout'}
        </button>
      </form>

      {message && <p className="mt-4 text-blue-700 font-semibold">{message}</p>}

      {originalPrice !== null && (
        <div className="mt-2 space-y-2">
          <p>Original Price: {originalPrice}</p>
          <p>Discount (Points + Coupon): {discount}</p>
          <p className="font-bold">Final Price: {finalPrice}</p>
        </div>
      )}
    </div>
  )
}
