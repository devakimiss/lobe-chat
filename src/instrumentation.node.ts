// Skip OpenTelemetry registration during build time
if (
  (process.env.NODE_ENV !== 'production' || process.env.VERCEL) && // Only register if not in build mode
  (!process.env.NEXT_PHASE || process.env.NEXT_PHASE !== 'phase-production-build')
) {
  try {
    const { register } = require('@lobechat/observability-otel/node');
    const { version } = require('../package.json');
    register({ version });
  } catch (error) {
    // Ignore errors during build time
    console.warn('OpenTelemetry registration failed:', error);
  }
}

export {};
