import { useEffect, useState } from "react";
import { getListing } from "../apiRoutes/userRoutes";
import { Link, useParams } from "react-router-dom";
import Button from "../components/subcomponents/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const SingleListing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { listingId } = useParams();

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
      {loading && <p className="text-center m-auto text-2xl">Loading...</p>}
      {error && (
        <div className="self-center my-7">
          <p className="text-2xl">Something went wrong!</p>
          <Link to={"/"}>
            <Button type={"button"}>Back to Home</Button>
          </Link>
        </div>
      )}

      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((imageUrl) => {
              return (
                <SwiperSlide key={imageUrl}>
                  <img
                    src={imageUrl}
                    alt="images"
                    className="h-[450px] w-[100%] object-cover p-3"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}
    </main>
  );
};
export default SingleListing;
