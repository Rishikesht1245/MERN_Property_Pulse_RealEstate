import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingCard = ({ listing }) => {
  return (
    <div className="mx-auto bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-lg w-full sm:w-[270px]">
      <Link className="flex flex-col gap-4" to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />

        <div className="p-4 flex flex-col gap-2 w-full tracking-wide">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="w-5 h-5 text-green-700" />
            <p className="text-sm text-gray-600 truncate font-semibold w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 text-semibold">
            {listing.description}
          </p>
          <p className="text-slate-500 font-semibold mt-2 flex items-center">
            ${" "}
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && " / Month"}
          </p>

          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-sm">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className="font-bold text-sm">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ListingCard;
