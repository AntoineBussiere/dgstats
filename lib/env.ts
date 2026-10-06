const env =
    process.env.NEXT_PUBLIC_VERCEL_ENV ||
    "development";
    
export const redisSuffix = env === 'production' ? '' : env === 'preview' ? '-PREVIEW' : '-DEV';
