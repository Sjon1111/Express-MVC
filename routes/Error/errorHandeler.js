
export const errorMiddleware = ((err, req, res, next) => {

  console.error("Global Error in backend");

  // Set the response status code
  res.status(err.status || 500);

})