/* global foundry, game */
/**
 * DCC HalflingBurglar character sheet overrides
 */

import DCCActorSheet from '../../../../../../../systems/dcc/module/actor-sheet.js'

const { TextEditor } = foundry.applications.ux

/**
 * Extend the zero-level/NPC sheet for HalflingBurglar
 * @extends {DCCActorSheet}
 */
class ActorSheetHalflingBurglar extends DCCActorSheet {
  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    position: {
      height: 635,
      width: 648
    }
  }

  /** @inheritDoc */
  static CLASS_TABS = {
    sheet: {
      tabs: [
        { id: 'halfling-burglar', group: 'sheet', label: 'HalflingBurglar.HalflingBurglar' },
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
        'system.config.showSkills': true,
        'system.details.sheetClass': 'Halfling-Burglar',
        'system.details.critRange': 20,
        'system.class.spellCheckAbility': 'int'
      })
    }
    // Initialize thief skills if missing
    const thiefSkills = [
      { key: 'sneakSilently', label: 'DCC.SneakSilently' },
      { key: 'hideInShadows', label: 'DCC.HideInShadows' },
      { key: 'pickPocket', label: 'DCC.PickPocket' },
      { key: 'climbSheerSurfaces', label: 'DCC.ClimbSheerSurfaces' },
      { key: 'pickLock', label: 'DCC.PickLock' },
      { key: 'findTrap', label: 'DCC.FindTrap' },
      { key: 'disableTrap', label: 'DCC.DisableTrap' },
      { key: 'forgeDocument', label: 'DCC.ForgeDocument' },
      { key: 'disguiseSelf', label: 'DCC.DisguiseSelf' },
      { key: 'readLanguages', label: 'DCC.ReadLanguages' },
      { key: 'handlePoison', label: 'DCC.HandlePoison' },
      { key: 'castSpellFromScroll', label: 'DCC.CastSpellFromScroll' }
    ]
    for (const skill of thiefSkills) {
      if (!this.actor.system.skills?.[skill.key]) {
        await this.actor.update({
          [`system.skills.${skill.key}`]: {
            label: skill.label,
            value: '+0'
          }
        })
      }
    }

    // Enrich corruption content for display
    context.corruptionHTML = await TextEditor.implementation.enrichHTML(
      this.actor.system.class.corruption,
      {
        secrets: this.actor.isOwner,
        relativeTo: this.actor
      }
    )

    return context
  }
}

export {
  ActorSheetHalflingBurglar
}
