import { Link } from "react-router-dom";
import Button from "./subcomponents/Button";

const PropertyDetails = ({ listing }) => {
  return (
    listing && (
      <>
        <Link to={`/listing/${listing._id}`}>
          <div className="flex items-center p-2 text-slate-600 font-semibold cursor-pointer hover:bg-gray-200 mt-2">
            <img
              className="h-[60px] w-[60px] object-contain mr-4"
              src={`${listing.imageUrls[0]}`}
              alt="profile image"
            />
            <span className="text-lg">Green World Villas</span>
          </div>
        </Link>
        <p className="text-sm text-slate-700 p-4">{listing.description}</p>
        <Link
          to={`/listing/${listing._id}`}
          className="w-full flex item-center justify-center"
        >
          <Button>View Listing</Button>
        </Link>
      </>
    )
  );
};
export default PropertyDetails;
