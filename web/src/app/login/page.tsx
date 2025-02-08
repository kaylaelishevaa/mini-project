import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-8">Login Page</h1>
      <div className="flex space-x-8">
        <div className="text-center">
          <Link
            href="/login/eventorganizer"
            className=" w-48 h-48 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            Organizer
          </Link>
          <p className="mt-4 text-lg">Event Organizer</p>
        </div>
        <div className="text-center">
          <Link
            href="/login/participant"
            className="w-48 h-48 rounded-full bg-green-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            Participant
          </Link>
          <p className="mt-4 text-lg">Participant</p>
        </div>
      </div>
    </div>
  );
}
