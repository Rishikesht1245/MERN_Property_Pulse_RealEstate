// creating custom errors

// usage : next(errorHandler(501, "Error from function")) === next(error)

export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
