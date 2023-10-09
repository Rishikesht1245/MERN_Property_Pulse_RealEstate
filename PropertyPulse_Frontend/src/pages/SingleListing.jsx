import { useEffect, useState } from "react";
import { getListing } from "../apiRoutes/userRoutes";
import { Link, useParams } from "react-router-dom";
import Button from "../components/subcomponents/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

import { PiShareFatFill } from "react-icons/pi";
import {
  FaBath,
  FaBed,
  FaChair,
  FaHeart,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import Loading from "../components/subcomponents/Loading";

const SingleListing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const { listingId } = useParams();

  const { currentUser } = useSelector((state) => state.user);

  //fetching listing data for the single listing page
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await getListing(listingId);
        if (data.success === false) {
          setLoading(false);
          return setError(true);
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  return (
    <main>
      {loading && <Loading />}
      {error && (
        <div className="text-center flex gap-10 flex-col justify-center items-center h-[80vh]">
          <p className="text-2xl text-slate-700 text-bold">
            Something went wrong!
          </p>
          <Link to={"/"}>
            <Button type={"button"}>Back to Home</Button>
          </Link>
        </div>
      )}

      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[400px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* share button */}
          <div className="absolute top-[15%] right-[3%] bg-white p-3 rounded-full z-10 cursor-pointer">
            <PiShareFatFill
              className="text-xl text-gray-600"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {/* wishlist implementation pending */}
          <div className="absolute top-[25%] right-[3%] bg-white p-3 rounded-full z-10 cursor-pointer">
            <FaHeart className="text-lg text-gray-600" />
          </div>
          {/* copied message */}
          {copied && (
            <p className="fixed font-semibold top-[25%] right-[5%] z-10 rounded-md bg-slate-100 p-2 px-5">
              Link copied!
            </p>
          )}
          {/* details */}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4 tracking-wider">
            <p className="text-xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing?.discountPrice.toLocaleString("en-US")
                : listing?.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-2 gap-2 text-slate-600 font-semibold text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {" "}
                  ${+listing.regularPrice - listing.discountPrice} - Discount
                </p>
              )}
            </div>
            <p className="text-slate-700 text-md">
              <span className="text-black font-semibold tracking-normal">
                Description -{" "}
              </span>
              {listing.description}
            </p>
            <ul className=" text-green-900 text-md font-semibold flex items-center gap-5 sm:gap-8 flex-wrap">
              <li className="flex gap-2 items-center whitespace-nowrap">
                <FaBed className="text-2xl" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex gap-2 items-center whitespace-nowrap">
                <FaBath className="text-xl" />
                {listing.bedrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex gap-2 items-center whitespace-nowrap">
                <FaParking className="text-xl" />
                {listing.parking ? `Parking` : `No Parking`}
              </li>
              <li className="flex gap-2 items-center whitespace-nowrap">
                <FaChair className="text-xl" />
                {listing.furnished ? `Furnished` : `No Furnished`}
              </li>
            </ul>
            {currentUser &&
              listing.userRef._id !== currentUser._id &&
              !contact && (
                <Button className="my-5 px-5" onClick={() => setContact(true)}>
                  Contact Landlord
                </Button>
              )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
};
export default SingleListing;
