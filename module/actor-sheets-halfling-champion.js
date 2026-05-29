/**
 * DCC Halfling Champion character sheet — parts/tabs/defaults come from
 * the DCC extension-API registries (see `crawl-class-data.js`).
 */

import { DCCSheet } from '../../../../../../../systems/dcc/module/actor-sheets-dcc.js'

/**
 * @extends {DCCSheet}
 */
class ActorSheetHalflingChampion extends DCCSheet {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    position: { height: 635, width: 648 }
  }

  /** @inheritDoc */
  static CLASS_ID = 'halfling-champion'
}

export {
  ActorSheetHalflingChampion
}
