/**
 * DCC Bard character sheet — parts/tabs/defaults come from the DCC
 * extension-API registries (see `crawl-class-data.js`).
 */

import { DCCSheet } from '../../../../../../../systems/dcc/module/actor-sheets-dcc.js'

/**
 * @extends {DCCSheet}
 */
class ActorSheetBard extends DCCSheet {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    position: { height: 635 }
  }

  /** @inheritDoc */
  static CLASS_ID = 'bard'
}

export {
  ActorSheetBard
}
