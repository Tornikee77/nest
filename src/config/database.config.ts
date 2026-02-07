import { registerAs } from "@nestjs/config";
export default registerAs("database", () => ({
  environment: process.env.NODE_ENV ?? "production",
  host: process.env.DATABASE_HOST ?? "localhost",
  port: parseInt(process.env.DATABASE_PORT ?? "5432", 10),
  user: process.env.DATABASE_USER ?? "",
  password: process.env.DATABASE_PASSWORD ?? "",
  name: process.env.DATABASE_NAME ?? "",
  synchronize: process.env.DATABASE_SYNC === "true",
  autoLoadEntities: process.env.DATABASE_AUTOLOAD === "true" ? true : false,
}));
