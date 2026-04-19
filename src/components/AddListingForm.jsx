import { useState } from 'react'

const EMPTY_FORM = { title: '', price: '', location: '', image: '', fbLink: '' }
const EMPTY_ERRORS = { title: '', price: '', location: '', image: '', fbLink: '' }

const FB_PREFIXES = ['https://facebook.com', 'https://www.facebook.com', 'https://fb.com', 'https://www.fb.com']

function validate(form) {
  const errs = { ...EMPTY_ERRORS }
  if (!form.title.trim()) errs.title = 'Title is required.'
  if (!form.price) {
    errs.price = 'Price is required.'
  } else {
    const p = parseFloat(form.price)
    if (isNaN(p) || p <= 0) errs.price = 'Price must be a positive number.'
  }
  if (!form.location.trim()) errs.location = 'Location is required.'
  if (!form.image.trim()) errs.image = 'Image URL is required.'
  if (!form.fbLink.trim()) {
    errs.fbLink = 'Facebook post link is required.'
  } else if (!FB_PREFIXES.some((prefix) => form.fbLink.trim().startsWith(prefix))) {
    errs.fbLink = 'Link must start with https://facebook.com or https://fb.com.'
  }
  return errs
}

function hasErrors(errs) {
  return Object.values(errs).some(Boolean)
}

function AddListingForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState(EMPTY_ERRORS)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    const updated = { ...form, [name]: value }
    setForm(updated)
    if (submitted) {
      setErrors(validate(updated))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    const errs = validate(form)
    setErrors(errs)
    if (hasErrors(errs)) return
    const { title, price, location, image, fbLink } = form
    onAdd({ title: title.trim(), price: parseFloat(price), location: location.trim(), image: image.trim(), fbLink: fbLink.trim() })
    setForm(EMPTY_FORM)
    setErrors(EMPTY_ERRORS)
    setSubmitted(false)
  }

  function inputClass(field) {
    return [
      'w-full border rounded-xl px-4 py-2 text-sm text-gray-800 outline-none transition',
      errors[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400'
        : 'border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400',
    ].join(' ')
  }

  function FieldError({ field }) {
    if (!errors[field]) return null
    return <p className="mt-1 text-xs text-red-600">{errors[field]}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-5">Add a New Listing</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Cozy 2-Bedroom Apartment"
            className={inputClass('title')}
          />
          <FieldError field="title" />
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
            className={inputClass('price')}
          />
          <FieldError field="price" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Hanoi, Vietnam"
            className={inputClass('location')}
          />
          <FieldError field="location" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://..."
            className={inputClass('image')}
          />
          <FieldError field="image" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Facebook Post Link</label>
          <input
            type="url"
            name="fbLink"
            value={form.fbLink}
            onChange={handleChange}
            placeholder="https://www.facebook.com/..."
            className={inputClass('fbLink')}
          />
          <FieldError field="fbLink" />
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
