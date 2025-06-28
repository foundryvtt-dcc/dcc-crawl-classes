/**
 * DCC HalflingChampion character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for HalflingChampion
 * @extends {DCCActorSheet}
 */
class ActorSheetHalflingChampion extends DCCActorSheet {
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
        { id: 'halfling-champion', group: 'sheet', label: 'HalflingChampion.HalflingChampion' },
        { id: 'clericSpells', group: 'sheet', label: 'DCC.Spells' },
        { id: 'skills', group: 'sheet', label: 'DCC.Skills' },
        { id: 'notes', group: 'sheet', label: 'DCC.Notes' }
      ],
      initial: 'character'
    }
  }

  /** @inheritDoc */
  static PARTS = {
    tabs: {
      template: 'systems/dcc/templates/actor-partial-tabs.html'
    },
    character: {
      template: 'systems/dcc/templates/actor-partial-pc-common.html'
    },
    equipment: {
      template: 'systems/dcc/templates/actor-partial-pc-equipment.html'
    },
    'halfling-champion': {
      template: 'modules/dcc-crawl-classes/templates/actor-partial-halfling-champion.html'
    },
    spells: {
      template: 'systems/dcc/templates/actor-partial-cleric-spells.html'
    },
    skills: {
      template: 'systems/dcc/templates/actor-partial-skills.html'
    },
    notes: {
      template: 'systems/dcc/templates/actor-partial-pc-notes.html'
    }
  }

  /** @override */
  async _prepareContext (options) {
    const context = await super._prepareContext(options)
    if (this.actor.system.details.sheetClass !== 'Halfling-Champion') {
      await this.actor.update({
        'system.class.className': game.i18n.localize('HalflingChampion.HalflingChampion'),
        'system.config.showSkills': true
      })
    }
    if (this.actor.system.details.sheetClass !== 'HalflingChampion') {
      await this.actor.update({
        'system.config.attackBonusMode': 'manual',
      })
    }

    return context
  }
}

export {
  ActorSheetHalflingChampion
}
