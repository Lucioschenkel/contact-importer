import { Router } from "express";

import contactsRoutes from "@modules/contacts/infra/http/routes/contacts.routes";
import failuresRoutes from "@modules/contacts/infra/http/routes/failures.routes";
import importsRoutes from "@modules/contacts/infra/http/routes/imports.routes";
import authRoutes from "@modules/users/infra/http/routes/auth.routes";
import usersRoutes from "@modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.use("/api/users", usersRoutes);
routes.use("/api/authenticate", authRoutes);
routes.use("/api/contacts", contactsRoutes);
routes.use("/api/imports", importsRoutes);
routes.use("/api/failures", failuresRoutes);

export default routes;
