module.exports = {
  publicRuntimeConfig: {
    /**
     * Base URL for public API calls.
     * Exposed to the browser via Next.js runtime configuration.
     */
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || ''
  }
};
