import z from "zod";

const envSchema = z.object({
  MONGO_URI: z.url({ protocol: /^mongodb(\+srv)?$/ }),
  DB_NAME: z.string().default("test"),
  PORT: z.coerce.number().int().default(3000),
  MONGO_USERNAME: z.string().optional(),
  CLIENT_BASE_URL: z.url().default("http://localhost:5173"),
  JWT_SECRET: z
    .string({
      error: "JWT_SECRET is required and must be at least 10 characters long",
    })
    .min(10),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    z.prettifyError(parsedEnv.error),
  );
  process.exit(1);
}

export const {
  MONGO_URI,
  DB_NAME,
  PORT,
  MONGO_USERNAME,
  CLIENT_BASE_URL,
  JWT_SECRET,
} = parsedEnv.data;
