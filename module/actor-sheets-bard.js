/* global foundry, game */
/**
 * DCC Bard character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

const { TextEditor } = foundry.applications.ux

/**
 * Extend the zero-level/NPC sheet for Bard
 * @extends {DCCActorSheet}
 */
class ActorSheetBard extends DCCActorSheet {
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
        { id: 'bard', group: 'sheet', label: 'Bard.Bard' },
        { id: 'wizardSpells', group: 'sheet', label: 'DCC.Spells' },
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
    bard: { template: 'modules/dcc-crawl-classes/templates/actor-partial-bard.html' },
    wizardSpells: { template: 'systems/dcc/templates/actor-partial-wizard-spells.html' },
    skills: { template: 'systems/dcc/templates/actor-partial-skills.html' },
    notes: { template: 'systems/dcc/templates/actor-partial-pc-notes.html' }
  }

  /** @override */
  async _prepareContext (options) {
    const context = await super._prepareContext(options)
    if (this.actor.system.details.sheetClass !== 'Bard') {
      await this.actor.update({
        'system.class.className': game.i18n.localize('Bard.Bard'),
        'system.config.showSkills': true
      })
    }

    // Add in Bard specific data if missing
    if (!this.actor.system.skills.talentDie) {
      await this.actor.update({
        'system.skills.talentDie': {
          label: 'Bard.TalentDie',
          die: '1d14'
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
  ActorSheetBard
}
