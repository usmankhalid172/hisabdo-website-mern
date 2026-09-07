const apiProxy = process.env.API_PROXY_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

const nextConfig = {
	async rewrites() {
		return [
			{ source: '/api/ai/:path*', destination: `${apiProxy}/api/ai/:path*` },
			{ source: '/api/expenses/:path*', destination: `${apiProxy}/api/expenses/:path*` },
			{ source: '/api/customers/:path*', destination: `${apiProxy}/api/customers/:path*` },
		];
	},
};

export default nextConfig;
