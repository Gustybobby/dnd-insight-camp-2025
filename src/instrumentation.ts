const REQUIRED_ENV = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
];

export function register() {
  console.info("checking required env variables");
  for (const variable of REQUIRED_ENV) {
    if (!process.env[variable]) {
      throw new Error(`env variable "${variable}" not found`);
    }
  }
  console.info("found all required env variables");
}
