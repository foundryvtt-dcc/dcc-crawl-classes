/**
 * DCC Gnome character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for Gnome
 * @extends {DCCActorSheet}
 */
class ActorSheetGnome extends DCCActorSheet {
  /** @override */
  getData () {
    const data = super.getData()
    this.options.template = 'modules/dcc-crawl-classes/templates/actor-sheet-gnome.html'
    if (data.data.details.sheetClass !== 'Gnome') {
      this.actor.update({
        'data.class.className': game.i18n.localize('gnome.Gnome')
      })
    }


    // Add in Gnome specific data if missing
    if (!data.data.skills.trickDie) {
      this.actor.update({
        'data.skills.trickDie': {
          label: 'Gnome.TrickDie',
          die: 'd3'
        }
      })
    }
    return data
  }
}

export {
  ActorSheetGnome
}
