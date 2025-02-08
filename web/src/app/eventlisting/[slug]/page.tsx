"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { events } from "@/components/data-event";
import Link from "next/link";
import Image from "next/image";

const EventDetailPage = () => {
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady && router.query.id) {
      const foundEvent = events.find(
        (event) => event.id === Number(router.query.id)
      );
      setEvent(foundEvent);
    }
    setLoading(false);
  }, [router.isReady, router.query]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return <p>Acara tidak ditemukan.</p>;
  }

  return (
    <section className="max-w-7xl mx-auto p-4">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg mb-5">
        <div className="relative h-48 w-full">
          <Image
            className="rounded-t-lg object-cover"
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, (min-width: 640px) 50vw, 33vw"
          />
        </div>
        <div className="p-5">
          <h1 className="text-gray-900 font-bold text-3xl tracking-tight mb-2">
            {event.title}
          </h1>
          <p className="font-normal text-gray-700 mb-3">{event.description}</p>
          <p className="text-sm text-gray-500 mb-3">
            Kategori: {event.category}
          </p>
          <p className="text-sm text-gray-500 mb-3">Lokasi: {event.location}</p>
          <p className="text-sm text-gray-500 mb-3">
            Tanggal: {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500 mb-3">
            Tiket Tersedia: {event.tickets}
          </p>
          <Link
            href="/"
            className="text-white bg-black hover:bg-gray-500 font-medium rounded text-xs px-3 py-1"
          >
            Kembali ke Daftar Acara
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventDetailPage;
