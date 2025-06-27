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
    static PARTS = {
        body: {
            template: 'modules/dcc-crawl-classes/templates/actor-sheet-halfling-burglar.html'
        }
    }

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options)
        if (this.actor.system.details.sheetClass !== 'Halfling-Burglar') {
            await this.actor.update({
                'system.class.className': game.i18n.localize('HalflingBurglar.HalflingBurglar')
            })
        }
        return context
    }
}

export {
    ActorSheetHalflingBurglar
}
