/**
 * DCC Orc character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for Orc
 * @extends {DCCActorSheet}
 */
class ActorSheetOrc extends DCCActorSheet {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    position: {
      height: 635
    }
  }

  /** @inheritDoc */
  static CLASS_TABS = {
    sheet: {
      tabs: [
        { id: 'orc', group: 'sheet', label: 'Orc.Orc' },
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
    orc: { template: 'modules/dcc-crawl-classes/templates/actor-partial-orc.html' },
    skills: { template: 'systems/dcc/templates/actor-partial-skills.html' },
    notes: { template: 'systems/dcc/templates/actor-partial-pc-notes.html' }
  }

  /** @override */
  async _prepareContext (options) {
    const context = await super._prepareContext(options)
    if (this.actor.system.details.sheetClass !== 'Orc') {
      await this.actor.update({
        'system.class.className': game.i18n.localize('orc.Orc'),
        'system.config.showSkills' : true
      })
    }

    if (this.actor.system.details.sheetClass !== 'Orc') {
      await this.actor.update({
        'system.skills.rageDie': {
          label: 'Orc.rageDie',
          die: '1d3',
          value: '1'
        }
      })
    }
    return context
  }
}

export {
  ActorSheetOrc
}
