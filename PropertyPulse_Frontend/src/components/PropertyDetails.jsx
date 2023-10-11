import { Link } from "react-router-dom";
import Button from "./subcomponents/Button";

const PropertyDetails = ({ listing }) => {
  return (
    listing && (
      <>
        <Link to={`/listing/${listing._id}`}>
          <div className="flex flex-col items-center p-2 text-slate-600 font-semibold cursor-pointer mt-2">
            <img
              className="h-[full] w-[full] object-contain mx-4"
              src={`${listing.imageUrls[0]}`}
              alt="profile image"
            />
            <span className="text-lg mt-3 hover:underline line-clamp-8">
              {listing.name}
            </span>
          </div>
        </Link>
        <p className="text-sm text-slate-700 p-4">{listing.description}</p>
      </>
    )
  );
};
export default PropertyDetails;
