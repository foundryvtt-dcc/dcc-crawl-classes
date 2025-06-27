/**
 * DCC Orc character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for Orc
 * @extends {DCCActorSheet}
 */
class ActorSheetOrc extends DCCActorSheet {
    /** @inheritDoc */
    static DEFAULT_OPTIONS = {
        position: {
            height: 635
        }
    }

    /** @inheritDoc */
    static PARTS = {
        body: {
            template: 'modules/dcc-crawl-classes/templates/actor-sheet-orc.html'
        }
    }

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options)
        if (this.actor.system.details.sheetClass !== 'Orc') {
            await this.actor.update({
                'system.class.className': game.i18n.localize('orc.Orc')
            })
        }

        if (this.actor.system.details.sheetClass !== 'Orc') {
            await this.actor.update({
                'system.skills.rageDie': {
                    label: 'Orc.rageDie',
                    die: '1d3',
                    value: '1'
                }
            })
        }
        return context
    }
}

export {
    ActorSheetOrc
}
