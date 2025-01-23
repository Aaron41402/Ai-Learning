import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: "postgresql://AI%20study_owner:DkOpQg1urhT0@ep-hidden-wind-a6xs3214.us-west-2.aws.neon.tech/AI%20study?sslmode=require",
  }
});
