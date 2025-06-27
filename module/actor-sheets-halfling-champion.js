/**
 * DCC HalflingChampion character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for HalflingChampion
 * @extends {DCCActorSheet}
 */
class ActorSheetHalflingChampion extends DCCActorSheet {
    /** @inheritDoc */
    static DEFAULT_OPTIONS = {
        position: {
            height: 635
        }
    }

    /** @inheritDoc */
    static PARTS = {
        body: {
            template: 'modules/dcc-crawl-classes/templates/actor-sheet-halfling-champion.html'
        }
    }

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options)
        if (this.actor.system.details.sheetClass !== 'Halfling-Champion') {
            await this.actor.update({
                'system.class.className': game.i18n.localize('HalflingChampion.HalflingChampion')
            })
        }
        if (this.actor.system.details.sheetClass !== 'HalflingChampion') {
            await this.actor.update({
                'system.config.attackBonusMode': 'manual',
            })
        }

        return context
    }
}

export {
    ActorSheetHalflingChampion
}
