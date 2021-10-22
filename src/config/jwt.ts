export default {
  secret: process.env.TOKEN_SECRET ?? "development",
  expiresIn: "15m",
};
