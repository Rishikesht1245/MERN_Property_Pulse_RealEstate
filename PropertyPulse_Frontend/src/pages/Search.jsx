import { Form, Formik } from "formik";
import Input from "../components/subcomponents/Input";
import CheckBox from "../components/subcomponents/CheckBox";
import { useMemo } from "react";
import SelectInput from "../components/subcomponents/SelectInput";
import Button from "../components/subcomponents/Button";

const Search = () => {
  // options for select input (useMemo memoise the result of a function)
  const sortOptions = useMemo(
    () => [
      { text: "Price high to low", value: "desc" },
      { text: "Price low to high", value: "asc" },
      { text: "Latest", value: "latest" },
      { text: "Oldest", value: "oldest" },
    ],
    []
  );
  return (
    <div className="flex flex-col md:flex-row">
      {/* left side section */}
      <div className="p-7 border-b-2 sm:border-r-2 md:min-h-screen md:flex-0.5  md:max-w-sm">
        <Formik initialValues={{ searchTerm: "" }}>
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
                  defaultValue={" -- Select Sort --"}
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
      </div>
    </div>
  );
};
export default Search;
