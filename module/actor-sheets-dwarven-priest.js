/* global foundry, game */
/**
 * DCC DwarvenPriest character sheet overrides
 */

import DCCActorSheet from '../../../../../../../systems/dcc/module/actor-sheet.js'
const { TextEditor } = foundry.applications.ux

/**
 * Extend the zero-level/NPC sheet for DwarvenPriest
 * @extends {DCCActorSheet}
 */
class ActorSheetDwarvenPriest extends DCCActorSheet {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    position: {
      height: 635,
      width: 628
    }
  }

  /** @inheritDoc */
  static CLASS_TABS = {
    sheet: {
      tabs: [
        { id: 'dwarven-priest', group: 'sheet', label: 'DwarvenPriest.DwarvenPriest' },
        { id: 'clericSpells', group: 'sheet', label: 'DCC.Spells' },
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
    'dwarven-priest': { template: 'modules/dcc-crawl-classes/templates/actor-partial-dwarven-priest.html' },
    clericSpells: { template: 'systems/dcc/templates/actor-partial-cleric-spells.html' },
    skills: { template: 'systems/dcc/templates/actor-partial-skills.html' },
    notes: { template: 'systems/dcc/templates/actor-partial-pc-notes.html' }
  }

  /** @override */
  async _prepareContext (options) {
    const context = await super._prepareContext(options)
    if (this.actor.system.details.sheetClass !== 'Dwarven-Priest') {
      await this.actor.update({
        'system.class.className': game.i18n.localize('DwarvenPriest.DwarvenPriest'),
        'system.class.mightyDeedsLink': await TextEditor.enrichHTML(game.i18n.localize('DCC.MightyDeedsLink')),
        'system.config.showSkills': true,
        'system.details.sheetClass': 'Dwarven-Priest',
        'system.details.critRange': 20,
        'system.class.spellCheckAbility': 'per',
        'system.config.attackBonusMode': 'manual'
      })
    }
    // Add in DwarvenPriest specific data if missing
    if (!this.actor.system.skills?.deedDie?.die) {
      await this.actor.update({
        'system.skills.deedDie': {
          label: 'DwarvenPriest.DeedDie',
          die: '1d3'
        }
      })
    }
    return context
  }
}

export {
  ActorSheetDwarvenPriest
}
