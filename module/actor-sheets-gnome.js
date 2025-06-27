/**
 * DCC Gnome character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

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
    static PARTS = {
        body: {
            template: 'modules/dcc-crawl-classes/templates/actor-sheet-gnome.html'
        }
    }

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options)
        if (this.actor.system.details.sheetClass !== 'Gnome') {
            await this.actor.update({
                'system.class.className': game.i18n.localize('gnome.Gnome')
            })
        }


        // Add in Gnome specific data if missing
        if (!this.actor.system.skills.trickDie) {
            await this.actor.update({
                'system.skills.trickDie': {
                    label: 'Gnome.TrickDie',
                    die: 'd3'
                }
            })
        }
        return context
    }
}

export {
    ActorSheetGnome
}
