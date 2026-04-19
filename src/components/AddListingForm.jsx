import { useState } from 'react'

const EMPTY_FORM = { title: '', price: '', location: '', image: '', fbLink: '' }

function AddListingForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { title, price, location, image, fbLink } = form
    if (!title.trim() || !price || !location.trim() || !image.trim() || !fbLink.trim()) {
      setError('Please fill in all fields.')
      return
    }
    const parsedPrice = parseFloat(price)
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Price must be a positive number.')
      return
    }
    setError('')
    onAdd({ title: title.trim(), price: parsedPrice, location: location.trim(), image: image.trim(), fbLink: fbLink.trim() })
    setForm(EMPTY_FORM)
  }

  const inputClass =
    'w-full border border-gray-300 rounded-xl px-4 py-2 text-sm text-gray-800 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400 transition'

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-5">Add a New Listing</h2>

      {error && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Cozy 2-Bedroom Apartment"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Price (million / month)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 3.5"
            min="0"
            step="0.1"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Hanoi, Vietnam"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Facebook Post Link</label>
          <input
            type="url"
            name="fbLink"
            value={form.fbLink}
            onChange={handleChange}
            placeholder="https://www.facebook.com/..."
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors duration-200"
      >
        Add Listing
      </button>
    </form>
  )
}

export default AddListingForm
