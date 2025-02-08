"use client";

import { useState, useEffect } from "react";
import { events } from "@/components/data-event";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((event) => event.category === categoryFilter);
    }

    if (locationFilter) {
      filtered = filtered.filter((event) => event.location === locationFilter);
    }

    setFilteredEvents(filtered);
    setCurrentPage(1); // Reset pagination when filters change
  }, [searchTerm, categoryFilter, locationFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Daftar Acara</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Cari acara..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded px-4 py-2 w-full md:w-64"
            />
          </div>
          <div className="flex space-x-4">
            <select
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Semua Kategori</option>
              <option value="Teknologi">Teknologi</option>
              <option value="Desain">Desain</option>
              <option value="Musik">Musik</option>
              {/* Tambahkan kategori lain sesuai kebutuhan */}
            </select>
            <select
              value={locationFilter}
              onChange={handleLocationChange}
              className="border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Semua Lokasi</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
              <option value="Surabaya">Surabaya</option>
              {/* Tambahkan lokasi lain sesuai kebutuhan */}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-md border border-gray-200 rounded-lg mb-5 flex flex-col transition-all duration-300 hover:scale-105"
          >
            <Link href={`/eventlisting/${event.id}`}>
              <div className="relative h-48 w-full">
                <Image
                  className="rounded-t-lg object-cover"
                  src={event.image}
                  alt="Featured Image"
                  fill
                  sizes="(max-width: 640px) 100vw, (min-width: 640px) 50vw, 33vw"
                />
              </div>
            </Link>
            <div className="p-5 flex-1">
              <Link href={`/events/${event.id}`}>
                <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                  {event.title}
                </h5>
              </Link>
              <p className="font-normal text-gray-700 mb-3">
                {event.description}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Kategori: {event.category}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Lokasi: {event.location}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Tanggal: {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Tiket Tersedia: {event.tickets}
              </p>
            </div>
            <div className="flex m-5">
              <Link
                href={`/eventlisting/${event.id}`}
                className="text-white bg-black hover:bg-gray-500 font-medium rounded text-xs px-3 py-1"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <nav className="inline-flex items-center -space-x-px">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`py-2 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === index + 1 ? "bg-gray-100 text-gray-700" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default HomePage;

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { AllEvent } from "@/types/blog";

// export default function BlogPage() {
//   const [events, setEvents] = useState<AllEvent[]>([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/v1/events");
//         const data = await response.json();
//         setEvents(data.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   console.log(events);

//   return (
//     <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {events.map((event: AllEvent, index: number) => (
//         <article
//           key={index}
//           className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
//         >
//           <div className="relative h-48 w-full">
//             <Image
//               src={event.image}
//               alt="Thumbnail image"
//               className="object-cover w-full h-full"
//               width={500}
//               height={500}
//               sizes="(max-width: 640px) 100vw, (min-width: 640px) 50vw, 33vw"
//             />
//           </div>
//           <div className="p-4">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               {event.title}
//             </h2>
//             <div className="flex flex-wrap gap-2 mb-4">
//               {event.categories.map((category, index) => (
//                 <span
//                   key={index}
//                   className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm"
//                 >
//                   {category}
//                 </span>
//               ))}
//             </div>
//             <p className="text-gray-600 text-sm">
//               {event.excerpt || "No excerpt available."}
//             </p>
//             <div className="flex justify-between mt-4">
//               <Link href={`/eventlisting/${event.id}`}>
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                   Detail
//                 </button>
//               </Link>
//               <button
//                 className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 onClick={() => alert(`Buying ${event.title}`)}
//               >
//                 Buy
//               </button>
//             </div>
//           </div>
//         </article>
//       ))}
//     </section>
//   );
// }
