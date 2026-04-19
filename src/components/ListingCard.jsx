function ListingCard({ title, price, location, image, fbLink }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg font-bold text-gray-800 leading-snug mb-2">
          {title}
        </h2>

        <p className="text-2xl font-extrabold text-indigo-600 mb-2">
          ${price.toLocaleString()}
          <span className="text-sm font-normal text-gray-400">/mo</span>
        </p>

        <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
          <svg
            className="w-4 h-4 text-indigo-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {location}
        </p>

        <a
          href={fbLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto block text-center bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors duration-200"
        >
          View Facebook Post
        </a>
      </div>
    </div>
  )
}

export default ListingCard
