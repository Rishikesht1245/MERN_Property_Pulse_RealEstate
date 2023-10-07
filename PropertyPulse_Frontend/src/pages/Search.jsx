import { Form, Formik } from "formik";
import Input from "../components/subcomponents/Input";
import CheckBox from "../components/subcomponents/CheckBox";
import { useEffect, useMemo, useRef, useState } from "react";
import SelectInput from "../components/subcomponents/SelectInput";
import Button from "../components/subcomponents/Button";
import { Link, useNavigate } from "react-router-dom";
import { getSearchedListings } from "../apiRoutes/userRoutes";
import Loading from "../components/subcomponents/Loading";
import ListingCard from "../components/ListingCard";

const Search = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(false);
  // for keeping already existing search from the main search bar
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get("searchTerm");
  let urlRef = useRef(urlParams.toString());

  const initialValues = {
    searchTerm: searchTermFromUrl || "",
    all: true,
    offer: false,
    rent: false,
    sale: false,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  };

  // options for select input (useMemo memoise the result of a function)
  const sortOptions = useMemo(
    () => [
      { text: "Price high to low", value: "regularPrice_desc" },
      { text: "Price low to high", value: "regularPrice_asc" },
      { text: "Latest", value: "createdAt_desc" },
      { text: "Oldest", value: "createdAt_asc" },
    ],
    []
  );

  // fetching listings based on query and dependency array window.location.search (location.search is now working)
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(false);
        const { data } = await getSearchedListings(urlRef.current);
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    fetchListings();
  }, [window.location.search]);

  const handleSubmit = (formData) => {
    console.log(formData);
    // getting existing information already in the url
    const urlParams = new URLSearchParams();

    //setting the type based on the user input
    if (
      formData.all === true ||
      (formData.rent === true && formData.sale === true)
    ) {
      formData.type = "all";
    } else if (formData.rent === true) {
      formData.type = "rent";
    } else if (formData.sale === true) {
      formData.type = "sale";
    }
    // setting up sort and order
    const sort = formData.sort.split("_")[0] || "createdAt";
    const order = formData.sort.split("_")[1] || "desc";
    // for keeping already existing search from the main search bar
    urlParams.set("searchTerm", formData.searchTerm);
    urlParams.set("type", formData.type);
    urlParams.set("parking", formData.parking);
    urlParams.set("furnished", formData.furnished);
    urlParams.set("offer", formData.offer);
    urlParams.set("sort", sort);
    urlParams.set("order", order);
    // for (let [params, value] of urlParams) {
    //   console.log(params + ":" + value);
    // }

    // navigate to the url
    const searchQuery = urlParams.toString();
    urlRef.current = searchQuery;
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="flex flex-col md:flex-row">
      {/* left side section */}
      <div className="p-7 border-b-2 sm:border-r-2 md:min-h-screen md:flex-0.5  md:max-w-sm">
        <Formik
          initialValues={initialValues}
          onSubmit={(formData, { setSubmitting }) => {
            handleSubmit(formData);
          }}
        >
          {({ isSumbmitting }) => (
            <Form className="flex flex-col gap-6">
              <Input
                type="text"
                placeholder="Search Term"
                name="searchTerm"
                required={false}
              />
              <div className="flex gap-1 flex-wrap">
                <label className="text-sm font-bold ml-1 tracking-widest text-slate-700">
                  Type :
                </label>{" "}
                <CheckBox
                  name="all"
                  placeholder={"Rent & Sale"}
                  className={"flex items-center justify-between"}
                />
                <CheckBox
                  name="rent"
                  placeholder={"Rent"}
                  className={"flex items-center justify-between"}
                />
                <CheckBox
                  name="sale"
                  placeholder={"Sale"}
                  className={"flex items-center justify-between"}
                />
                <CheckBox
                  name="offer"
                  placeholder={"Offer"}
                  className={"flex items-center justify-between"}
                />
              </div>
              <div className="flex gap-1 flex-wrap">
                <label className="text-sm font-bold ml-1 tracking-widest text-slate-700">
                  Amenities :
                </label>{" "}
                <CheckBox
                  name="parking"
                  placeholder={"Parking"}
                  className={"flex items-center justify-between"}
                />
                <CheckBox
                  name="furnished"
                  placeholder={"Furnished"}
                  className={"flex items-center justify-between"}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <SelectInput
                  className={"flex items-center"}
                  label={"Sort"}
                  options={sortOptions}
                  name="sort"
                />
              </div>
              <Button type={"submit"}>Search</Button>
            </Form>
          )}
        </Formik>
      </div>
      {/* right side section */}
      <div className="p-7 md:flex-1">
        <h1 className="uppercase tracking-widest text-center text-xl sm:text-3xl font-semibold my-2 border-b-2 p-3">
          Listing Results:
        </h1>
        <div className="flex items-center justify-center">
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
          {!loading && listings.length === 0 && (
            <div className="text-center flex gap-10 flex-col justify-center items-center h-[80vh]">
              <p className="text-2xl text-slate-700 text-bold">
                No listing found!
              </p>
              <Link to={"/"}>
                <Button type={"button"}>Back to Home</Button>
              </Link>
            </div>
          )}
          {!loading && listings?.length > 0 && (
            <div className="flex gap-5 justify-between flex-wrap">
              {listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Search;
