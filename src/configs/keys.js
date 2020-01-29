// export default {
//   mongoURI: process.env.MONGO_URI,
// };
require("dotenv").config()

export const dbConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.PROD_DATABASE_URL;
  } else if (process.env.NODE_ENV === 'test') {
    return process.env.TEST_MONGO_URI;
  } else {
    return process.env.MONGO_URI;
  }
}