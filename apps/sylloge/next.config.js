/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
                'localhost:3000', // localhost
                'super-cod-3000.app.github.dev', // Codespaces
            ],
        },
    },
    // Multi-zone configuration
    assetPrefix: process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000',
    basePath: process.env.BASE_PATH || '',
    // Define this app as a zone
    async rewrites() {
        return {
            // These rewrites are checked after both pages/public files
            // and dynamic routes are checked
            beforeFiles: [
                // Rewrite to poiesis app when path starts with /poiesis
                {
                    source: '/research/:path*',
                    destination: 'http://localhost:3001/:path*', // Poiesis app running at port 3001
                },
            ],
        };
    },
};

export default nextConfig;
