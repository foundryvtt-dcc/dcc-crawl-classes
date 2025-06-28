/**
 * DCC HalflingBurglar character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for HalflingBurglar
 * @extends {DCCActorSheet}
 */
class ActorSheetHalflingBurglar extends DCCActorSheet {
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
        { id: 'halfling-burglar', group: 'sheet', label: 'HalflingBurglar.HalflingBurglar' },
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
    'halfling-burglar': { template: 'modules/dcc-crawl-classes/templates/actor-partial-halfling-burglar.html' },
    skills: { template: 'systems/dcc/templates/actor-partial-skills.html' },
    notes: { template: 'systems/dcc/templates/actor-partial-pc-notes.html' }
  }

  /** @inheritDoc */
  _getTabsConfig (group) {
    const tabs = foundry.utils.deepClone(super._getTabsConfig(group))

    if (!this.actor.system.config.showSpells) { tabs.tabs = tabs.tabs.filter(tab => tab.id !== 'spells') }

    return tabs
  }

  /** @override */
  async _prepareContext (options) {
    const context = await super._prepareContext(options)
    if (this.actor.system.details.sheetClass !== 'Halfling-Burglar') {
      await this.actor.update({
        'system.class.className': game.i18n.localize('HalflingBurglar.HalflingBurglar'),
        'system.config.showSkills' : true
      })
    }
    return context
  }
}

export {
  ActorSheetHalflingBurglar
}
