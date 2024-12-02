module.exports = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.us-east-1.amazonaws.com',
                pathname: 'jacobpowell.dev-assets/jacob-powell-dev-images/**',
            }
        ],
        domains: [ "s3.us-east-1.amazonaws.com" ]
    }
}