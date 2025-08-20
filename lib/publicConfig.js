/**
 * Helper to read the public runtime configuration exposed by next.config.js.
 */
function loadPublicConfig() {
  const configModule = require('../next.config');
  const config =
    typeof configModule === 'function' ? configModule() : configModule;
  return config.publicRuntimeConfig || {};
}

module.exports = { loadPublicConfig };
