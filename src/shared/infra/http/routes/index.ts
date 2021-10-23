import { Router } from "express";

import authRoutes from "@modules/users/infra/http/routes/auth.routes";
import usersRoutes from "@modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/authenticate", authRoutes);

export default routes;
