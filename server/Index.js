import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import models, { sequelize } from "./models/IndexModel";
import routes from "./routes/IndexRoute";
import Middleware from "./helpers/Middleware";

// declare port
const port = process.env.PORT || 1337;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());

// load models dan simpan di req.context
app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

//call AuthJWT
app.use(process.env.URL_DOMAIN + "/auth", routes.AuthRoute);

//call route
app.use(process.env.URL_AUTH + "/users", routes.UserRoute);
app.use(process.env.URL_API + "/hosted", routes.HostedRoute);
app.use(process.env.URL_API + "/houses", routes.HousesRoute);
app.use(process.env.URL_API + "/address", routes.AddressRoute);
app.use(process.env.URL_API + "/images", routes.HouseImagesRoute);
app.use(process.env.URL_API + "/reviews", routes.HouseReviewsRoute);
app.use(process.env.URL_API + "/bedroom", routes.HousesBedroomsRoute);
app.use(process.env.URL_API + "/reserve", routes.HousesReserveRoute);
app.use(process.env.URL_API + "/orders", routes.OrdersRoute);
app.use(process.env.URL_API + "/lines", routes.HousesReserveLinesRoute);
app.use(process.env.URL_API + "/cart", routes.CartRoute);

//use middleware to handle error
app.use(Middleware.handleError);
app.use(Middleware.notFound);

// set to false agar tidak di drop tables yang ada didatabaseconst dropDatabaseSync = false;
const dropDatabaseSync = false;
sequelize.sync({ force: dropDatabaseSync }).then(async () => {
  if (dropDatabaseSync) {
    console.log("Database do not drop");
  }

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

export default app;
