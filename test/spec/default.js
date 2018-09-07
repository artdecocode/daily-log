import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import dailyLog from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof dailyLog, 'function')
  },
  async 'calls package without error'() {
    await dailyLog()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await dailyLog({
      type: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T