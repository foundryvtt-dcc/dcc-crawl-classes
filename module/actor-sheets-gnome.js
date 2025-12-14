/* global foundry, game */
/**
 * DCC Gnome character sheet overrides
 */

import DCCActorSheet from '../../../../../../../systems/dcc/module/actor-sheet.js'

const { TextEditor } = foundry.applications.ux

/**
 * Extend the zero-level/NPC sheet for Gnome
 * @extends {DCCActorSheet}
 */
class ActorSheetGnome extends DCCActorSheet {
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
        { id: 'gnome', group: 'sheet', label: 'Gnome.Gnome' },
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
    gnome: { template: 'modules/dcc-crawl-classes/templates/actor-partial-gnome.html' },
    wizardSpells: { template: 'systems/dcc/templates/actor-partial-wizard-spells.html' },
    skills: { template: 'systems/dcc/templates/actor-partial-skills.html' },
    notes: { template: 'systems/dcc/templates/actor-partial-pc-notes.html' }
  }

  /** @override */
  async _prepareContext (options) {
    const context = await super._prepareContext(options)
    if (this.actor.system.details.sheetClass !== 'Gnome') {
      await this.actor.update({
        'system.class.className': game.i18n.localize('Gnome.Gnome'),
        'system.config.showSkills': true,
        'system.details.sheetClass': 'Gnome',
        'system.details.critRange': '20',
        'system.class.spellCheckAbility': 'int'
      })
    }

    // Add in Gnome specific data if missing
    if (!this.actor.system.skills?.trickDie?.die) {
      await this.actor.update({
        'system.skills.trickDie': {
          label: 'Gnome.TrickDie',
          die: '1d3'
        }
      })
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
  ActorSheetGnome
}
