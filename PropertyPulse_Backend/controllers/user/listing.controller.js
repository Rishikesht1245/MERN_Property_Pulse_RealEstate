import { error } from "console";
import Listing from "../../models/listing.model.js";
import { errorHandler } from "../../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    console.log("error in create listing : ", error);
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found!"));

    // checking if user is the owner of listing
    if (req.user.id !== listing.userRef)
      return next(errorHandler(401, "You can only delete your own listing!"));

    // deleting the listing
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    console.log("error in deleting the listing :", error);
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("userRef");
    // making the password empty as don't want to see it in the client side.
    listing.userRef.password = "";

    if (!listing) return next(errorHandler(404, "Listing not found!"));

    res.status(200).json(listing);
  } catch (error) {
    console.log("Error in get Listing :", error);
    next(error);
  }
};

// search sort and filter single function
export const getListings = async (req, res, next) => {
  console.log("reached");
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    //if user didn't selected on offer check box we need to show properties which are having offer and not
    // undefined is for search from the main page. no offer query is added in url
    let offer = req.query.offer;
    if (offer === undefined || offer === false) {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === false) {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === false) {
      parking = { $in: [false, true] };
    }

    // for type default is undefined and if rent and sale is selected all will be attached in query
    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";
    //sorting default order is created At and descending which means latest first
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listing = await Listing.find({
      // //regex for used for searching, i case insensitive
      name: { $regex: searchTerm, $options: "i" },
      // // below variable will be replaced with $in or the query
      offer,
      furnished,
      parking,
      type,
      // // [ ] is used to convert sort string to key
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(listing);
  } catch (error) {
    console.log("Error in Get Listing");
    next(error);
  }
};
