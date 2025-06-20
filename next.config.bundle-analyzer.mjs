// 📊 Bundle Analyzer Configuration
import { withBundleAnalyzer } from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

// Import the main config
import nextConfig from './next.config.mjs'

export default bundleAnalyzer(nextConfig)