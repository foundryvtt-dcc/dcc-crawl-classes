/* global game */
/**
 * DCC Paladin character sheet overrides
 */

import DCCActorSheet from '../../../../../../../systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for Paladin
 * @extends {DCCActorSheet}
 */
class ActorSheetPaladin extends DCCActorSheet {
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
        { id: 'paladin', group: 'sheet', label: 'Paladin.Paladin' },
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
    paladin: { template: 'modules/dcc-crawl-classes/templates/actor-partial-paladin.html' },
    clericSpells: { template: 'systems/dcc/templates/actor-partial-cleric-spells.html' },
    skills: { template: 'systems/dcc/templates/actor-partial-skills.html' },
    notes: { template: 'systems/dcc/templates/actor-partial-pc-notes.html' }
  }

  /** @override */
  async _prepareContext (options) {
    const context = await super._prepareContext(options)
    if (this.actor.system.details.sheetClass !== 'Paladin') {
      await this.actor.update({
        'system.class.className': game.i18n.localize('Paladin.Paladin'),
        'system.config.showSkills': true,
        'system.details.sheetClass': 'Paladin',
        'system.details.critRange': '20',
        'system.class.spellCheckAbility': 'per',
        'system.config.attackBonusMode': 'manual'
      })
    }

    // Add in Paladin specific data if missing
    if (!this.actor.system.skills?.smiteDie?.die) {
      await this.actor.update({
        'system.skills.smiteDie': {
          label: 'Paladin.SmiteDie',
          die: '1d3'
        }
      })
    }
    if (!this.actor.system.skills?.holyDeeds) {
      await this.actor.update({
        'system.skills.holyDeeds': {
          label: 'Paladin.HolyDeeds',
          value: '+1'
        }
      })
    }
    return context
  }
}

export {
  ActorSheetPaladin
}
