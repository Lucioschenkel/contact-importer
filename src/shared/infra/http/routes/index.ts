import { Router } from "express";

import contactsRoutes from "@modules/contacts/infra/http/routes/contacts.routes";
import failuresRoutes from "@modules/contacts/infra/http/routes/failures.routes";
import importsRoutes from "@modules/contacts/infra/http/routes/imports.routes";
import authRoutes from "@modules/users/infra/http/routes/auth.routes";
import usersRoutes from "@modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/authenticate", authRoutes);
routes.use("/contacts", contactsRoutes);
routes.use("/imports", importsRoutes);
routes.use("/failures", failuresRoutes);

export default routes;
