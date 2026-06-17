/**
 * DCC Dwarven Priest character sheet — parts/tabs/defaults come from the
 * DCC extension-API registries (see `crawl-class-data.js`).
 */

import { DCCSheet } from '../../../../../../../systems/dcc/module/actor-sheets-dcc.js'

/**
 * @extends {DCCSheet}
 */
class ActorSheetDwarvenPriest extends DCCSheet {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    position: { height: 635, width: 628 }
  }

  /** @inheritDoc */
  static CLASS_ID = 'dwarven-priest'
}

export {
  ActorSheetDwarvenPriest
}
