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
      height: 635,
      width: 595
    }
  }

  /** @inheritDoc */
  static CLASS_TABS = {
    sheet: {
      tabs: [
        { id: 'elven-rogue', group: 'sheet', label: 'ElvenRogue.ElvenRogue' },
        { id: 'spells', group: 'sheet', label: 'DCC.Spells' },
        { id: 'skills', group: 'sheet', label: 'DCC.Skills' }
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
    wizardSpells: { template: 'systems/dcc/templates/actor-partial-wizard-spells.html' },
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
