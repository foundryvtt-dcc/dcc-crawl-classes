/**
 * DCC Halfling Burglar character sheet — parts/tabs/defaults come from
 * the DCC extension-API registries (see `crawl-class-data.js`). The
 * thief skill block is inherited from the DCC `thief` mixin on the
 * shared Player schema.
 */

import { DCCSheet } from '../../../../../../../systems/dcc/module/actor-sheets-dcc.js'

/**
 * @extends {DCCSheet}
 */
class ActorSheetHalflingBurglar extends DCCSheet {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    position: { height: 635, width: 648 }
  }

  /** @inheritDoc */
  static CLASS_ID = 'halfling-burglar'
}

export {
  ActorSheetHalflingBurglar
}
