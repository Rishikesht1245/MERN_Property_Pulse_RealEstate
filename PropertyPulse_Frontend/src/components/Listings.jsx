import { Link } from "react-router-dom";

const Listings = ({ userListings }) => {
  return (
    <div className="flex flex-col gap-2 mt-10">
      <h1 className="text-xl tracking-widest text-center font-bold my-5 uppercase">
        Your Listings
      </h1>
      {userListings.map((listing, index) => (
        <div
          className="border rounded-lg p-3 shadow-sm flex justify-between items-center flex-wrap gap-5"
          key={listing._id}
        >
          <Link
            to={`/listing/${listing._id}`}
            className="flex items-center justify-between gap-5"
          >
            <img
              src={listing.imageUrls[0]}
              alt="Listing cover"
              className="h-[75px] w-[120px] object-cover"
            />
            <p className="text-slate-700 font-semibold hover:underline truncate">
              {listing.name}
            </p>
          </Link>
          <div className="flex gap-5 items-center">
            <button className="text-green-700 text-sm font-semibold uppercase">
              Edit
            </button>
            <button className="text-red-600 text-sm font-semibold uppercase">
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Listings;
