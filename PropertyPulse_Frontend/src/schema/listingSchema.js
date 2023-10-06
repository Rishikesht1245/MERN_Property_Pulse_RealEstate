import * as yup from "yup";

export const listingSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, "Name must contain at least 3 characters")
    .required("Name is required"),
  description: yup
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters")
    .required("Description is required"),
  address: yup
    .string()
    .trim()
    .min(3, "Address must contain at least 10 characters")
    .required("Address is required"),
  bedrooms: yup.number().min(1, "Minimum one Bedroom is required"),
  bathrooms: yup.number().min(1, "Minimum one Bathroom is required"),
  regularPrice: yup
    .number()
    .min(50, "Minimum allowed Price is 50 $")
    .max(5000000, "Maximum allowed price is 5000000 $"),
  discountedPrice: yup
    .number()
    .min(0, "Minimum allowed Price is 0 $")
    .max(5000000, "Maximum allowed price is 5000000 $"),
});
