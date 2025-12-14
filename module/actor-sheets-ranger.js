/* global foundry, game */
/**
 * DCC Ranger character sheet overrides
 */

import DCCActorSheet from '../../../../../../../systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for Ranger
 * @extends {DCCActorSheet}
 */
class ActorSheetRanger extends DCCActorSheet {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    position: {
      height: 640
    }
  }

  /** @inheritDoc */
  static CLASS_TABS = {
    sheet: {
      tabs: [
        { id: 'ranger', group: 'sheet', label: 'Ranger.Ranger' },
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
    ranger: { template: 'modules/dcc-crawl-classes/templates/actor-partial-ranger.html' },
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
    if (this.actor.system.details.sheetClass !== 'Ranger') {
      await this.actor.update({
        'system.class.className': game.i18n.localize('Ranger.Ranger'),
        'system.config.showSkills': true,
        'system.config.attackBonusMode': 'manual',
        'system.details.sheetClass': 'Ranger',
        'system.details.critRange': '20'
      })
    }
    // Initialize Ranger skills if missing
    if (!this.actor.system.skills?.climb) {
      await this.actor.update({
        'system.skills.climb': {
          label: 'Ranger.Climb',
          ability: 'agl',
          value: '+0',
          config: {
            useAbility: true,
            applyCheckPenalty: true,
            useLevel: true
          }
        }
      })
    }
    if (!this.actor.system.skills?.findTrap) {
      await this.actor.update({
        'system.skills.findTrap': {
          label: 'Ranger.FindTrap',
          ability: 'agl',
          value: '+0',
          config: {
            useAbility: true,
            useLevel: true
          }
        }
      })
    }
    if (!this.actor.system.skills?.sneak) {
      await this.actor.update({
        'system.skills.sneak': {
          label: 'Ranger.Sneak',
          ability: 'agl',
          value: '+0',
          config: {
            useAbility: true,
            applyCheckPenalty: true,
            useLevel: true
          }
        }
      })
    }
    if (!this.actor.system.skills?.strider) {
      await this.actor.update({
        'system.skills.strider': {
          label: 'Ranger.Strider',
          ability: 'agl',
          value: '+0',
          config: {
            useAbility: true,
            applyCheckPenalty: true,
            useLevel: true
          }
        }
      })
    }
    if (!this.actor.system.skills?.survival) {
      await this.actor.update({
        'system.skills.survival': {
          label: 'Ranger.Survival',
          ability: 'per',
          value: '+0',
          config: {
            useAbility: true,
            useLevel: true
          }
        }
      })
    }
    if (!this.actor.system.skills?.favoredEnemies) {
      await this.actor.update({
        'system.skills.favoredEnemies': {
          label: 'Ranger.FavoredEnemies',
          value: ''
        }
      })
    }

    return context
  }
}

export {
  ActorSheetRanger
}
