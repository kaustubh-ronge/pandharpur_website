/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./lib/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_DATABASE_URL,
    }
  };