const isProd = process.env.NODE_ENV === "production"
export const API_BASE_URL = isProd 
    ? process.env.NEXT_PUBLIC_PROD_API_BASE_URL 
    : process.env.NEXT_PUBLIC_DEV_API_BASE_URL