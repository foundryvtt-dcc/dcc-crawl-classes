/**
 * DCC ElvenRogue character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for ElvenRogue
 * @extends {DCCActorSheet}
 */
class ActorSheetElvenRogue extends DCCActorSheet {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    position: {
      height: 635
    }
  }

  /** @inheritDoc */
  static TABS = {
    sheet: {
      tabs: [
        { id: 'character', group: 'sheet', label: 'DCC.Character' },
        { id: 'equipment', group: 'sheet', label: 'DCC.Equipment' },
        { id: 'elven-rogue', group: 'sheet', label: 'ElvenRogue.ElvenRogue' },
        { id: 'spells', group: 'sheet', label: 'DCC.Spells' },
        { id: 'skills', group: 'sheet', label: 'DCC.Skills' },
        { id: 'notes', group: 'sheet', label: 'DCC.Notes' }
      ],
      initial: 'character'
    }
  }

  /** @inheritDoc */
  static PARTS = {
    tabs: { template: 'systems/dcc/templates/actor-partial-tabs.html' },
    character: { template: 'systems/dcc/templates/actor-partial-pc-common.html' },
    equipment: { template: 'systems/dcc/templates/actor-partial-pc-equipment.html' },
    'elven-rogue': { template: 'modules/dcc-crawl-classes/templates/actor-partial-elven-rogue.html' },
    spells: { template: 'systems/dcc/templates/actor-partial-wizard-spells.html' },
    skills: { template: 'systems/dcc/templates/actor-partial-skills.html' },
    notes: { template: 'systems/dcc/templates/actor-partial-pc-notes.html' }
  }

  /** @override */
  async _prepareContext (options) {
    const context = await super._prepareContext(options)
    if (this.actor.system.details.sheetClass !== 'Elven-Rogue') {
      await this.actor.update({
        'system.class.className': game.i18n.localize('ElvenRogue.ElvenRogue'),
        'system.config.showSkills' : true
      })
    }

    return context
  }
}

export {
  ActorSheetElvenRogue
}
