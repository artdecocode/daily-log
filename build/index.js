const { debuglog } = require('util');

const LOG = debuglog('daily-log')

/**
 * Description of work done each day.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */
               async function dailyLog(config = {}) {
  const {
    type,
  } = config
  LOG('daily-log called with %s', type)
  return type
}

/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */

module.exports = dailyLog
//# sourceMappingURL=index.js.map