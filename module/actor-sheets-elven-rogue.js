/**
 * DCC Elven Rogue character sheet — parts/tabs/defaults come from the DCC
 * extension-API registries (see `crawl-class-data.js`).
 */

import { DCCSheet } from '../../../../../../../systems/dcc/module/actor-sheets-dcc.js'

/**
 * @extends {DCCSheet}
 */
class ActorSheetElvenRogue extends DCCSheet {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    position: { height: 635, width: 600 }
  }

  /** @inheritDoc */
  static CLASS_ID = 'elven-rogue'
}

export {
  ActorSheetElvenRogue
}
