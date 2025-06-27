/**
 * DCC Bard character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

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
    static PARTS = {
        body: {
            template: 'modules/dcc-crawl-classes/templates/actor-sheet-bard.html'
        }
    }

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options)
        if (this.actor.system.details.sheetClass !== 'Bard') {
            await this.actor.update({
                'system.class.className': game.i18n.localize('Bard.Bard')
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
        return context
    }
}

export {
    ActorSheetBard
}
