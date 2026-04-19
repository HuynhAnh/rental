import { useState, useMemo } from 'react'
import listings from '../data/listings.json'
import ListingCard from '../components/ListingCard'

const ALL_TYPES = ['All', ...new Set(listings.map((l) => l.type))]

function Home() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [onlyAvailable, setOnlyAvailable] = useState(false)

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchesSearch =
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.location.toLowerCase().includes(search.toLowerCase())
      const matchesType = selectedType === 'All' || l.type === selectedType
      const matchesAvailability = !onlyAvailable || l.available
      return matchesSearch && matchesType && matchesAvailability
    })
  }, [search, selectedType, onlyAvailable])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / Header */}
      <header className="bg-indigo-700 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">
            Find Your Perfect Rental
          </h1>
          <p className="text-indigo-200 text-lg mb-8">
            Browse hundreds of hand-picked listings — no broker fees, no hassle.
          </p>

          {/* Search bar */}
          <div className="flex items-center max-w-xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <svg
              className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by title or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 py-3 px-3 text-gray-800 text-sm outline-none"
            />
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-gray-600">Filter:</span>

        {ALL_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
              selectedType === type
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
            }`}
          >
            {type}
          </button>
        ))}

        <label className="ml-auto flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            className="accent-indigo-600 w-4 h-4"
          />
          Available only
        </label>
      </section>

      {/* Results count */}
      <div className="max-w-5xl mx-auto px-4 pb-2">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> listing{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Listings grid */}
      <main className="max-w-5xl mx-auto px-4 pb-16">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filtered.map((listing) => (
              <ListingCard
                key={listing.id}
                title={listing.title}
                price={listing.price}
                location={listing.location}
                image={listing.image}
                fbLink={listing.fbLink}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <p className="text-lg font-semibold">No listings found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center text-sm py-6">
        © {new Date().getFullYear()} RentEasy. All rights reserved.
      </footer>
    </div>
  )
}

export default Home
