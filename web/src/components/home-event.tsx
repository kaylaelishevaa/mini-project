export default function HomeEvent() {
  return (
    <div className="p-4">
      <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs mb-2">
        SHOWING
      </button>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600 text-sm">Rp.1.000.000</span>
        <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">
          Categori1
        </span>
      </div>
      <h2 className="text-xl font-bold mb-2">title1</h2>
      <div className="text-gray-600 text-sm mb-2">
        <p>date1</p>
        <p>location1</p>
      </div>
    </div>
  );
}
