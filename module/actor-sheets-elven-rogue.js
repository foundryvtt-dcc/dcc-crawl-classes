/**
 * DCC ElvenRogue character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for ElvenRogue
 * @extends {DCCActorSheet}
 */
class ActorSheetElvenRogue extends DCCActorSheet {
    /** @inheritDoc */
    static DEFAULT_OPTIONS = {
        position: {
            height: 635
        }
    }

    /** @inheritDoc */
    static PARTS = {
        body: {
            template: 'modules/dcc-crawl-classes/templates/actor-sheet-elven-rogue.html'
        }
    }

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options)
        if (this.actor.system.details.sheetClass !== 'Elven-Rogue') {
            await this.actor.update({
                'system.class.className': game.i18n.localize('ElvenRogue.ElvenRogue')
            })
        }

        return context
    }
}

export {
    ActorSheetElvenRogue
}
