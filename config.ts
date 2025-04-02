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
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      secret: process.env.CLOUDINARY_API_SECRET,
    },
  },
};
