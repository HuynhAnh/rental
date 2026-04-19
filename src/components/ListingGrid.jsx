import allListings from '../data/listings.json'
import ListingCard from './ListingCard'

function ListingGrid({ listings = allListings }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
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
  )
}

export default ListingGrid
