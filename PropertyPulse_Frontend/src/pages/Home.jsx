import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSearchedListings } from "../apiRoutes/userRoutes";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import ListingCard from "../components/ListingCard";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  // fetching listings - calling three functions one by one
  useEffect(() => {
    // listings with offer
    const fetOfferListings = async () => {
      try {
        // search api is used for fetching based n query params
        const { data } = await getSearchedListings("offer=true&limit=4");
        setOfferListings(data);
        // calling the function to fetch rent listings (step by step) -- better loading
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        // search api is used for fetching based n query params
        const { data } = await getSearchedListings("type=rent&limit=4");
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const { data } = await getSearchedListings("type=sale&limit=4");
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-24 px-5 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold tracking-wider text-3xl lg:text-6xl leading-10 lg:leading-[70px]">
          Discover the perfect <span className="text-slate-500">property</span>{" "}
          <br />
          with <span className="text-slate-500">PropertyPulse</span>
        </h1>
        <div className="text-gray-500 font-semibold text-sm sm:text-lg w-[80%]">
          Property Pulse is your all-in-one real estate solution. Whether you're
          searching for your dream home, looking to sell your property, or
          wanting to invest in real estate, we've got you covered.
        </div>
        <Link
          to={"/search"}
          className="font-bold text-blue-700 hover:underline text-lg"
        >
          Let's get started...
        </Link>
      </div>
      {/* top end */}

      {/* Swipers */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => {
            return (
              <SwiperSlide>
                <div
                  className="h-[400px]"
                  key={listing._id}
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            );
          })}
      </Swiper>

      {/* listing results for offer rent and sale */}
      <div className="max-w-6xl w-full mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl text-slate-600 font-semibold my-1">
                Recent offers
              </h2>

              <Link
                to={`/search/?offer=true`}
                className="font-bold text-blue-700 hover:underline text-[16px]"
              >
                Show more offers...
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {offerListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl text-slate-600 font-semibold my-1">
                Recent places for rent
              </h2>

              <Link
                to={`/search/?type=rent`}
                className="font-bold text-blue-700 hover:underline text-[16px]"
              >
                Show more places for rent...
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl text-slate-600 font-semibold my-1">
                Recent places for sale
              </h2>

              <Link
                to={`/search/?type=sale`}
                className="font-bold text-blue-700 hover:underline text-[16px]"
              >
                Show more places for sale...
              </Link>
            </div>
            <div className="flex gap-4 flex-wrap">
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
