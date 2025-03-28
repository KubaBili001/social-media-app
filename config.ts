export const config = {
  env: {
    redis: {
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REDIS_TOKEN,
    },
    resend: {
      api: process.env.RESEND_API_KEY,
    },
    auth: {
      secret: process.env.AUTH_SECRET,
    },
    cloudinary: {
      cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    },
  },
};
