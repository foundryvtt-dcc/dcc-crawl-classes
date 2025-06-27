/*
 * DCC DwarvenPriest character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for DwarvenPriest
 * @extends {DCCActorSheet}
 */
class ActorSheetDwarvenPriest extends DCCActorSheet {
    /** @inheritDoc */
    static DEFAULT_OPTIONS = {
        position: {
            height: 635
        }
    }

    /** @inheritDoc */
    static PARTS = {
        body: {
            template: 'modules/dcc-crawl-classes/templates/actor-sheet-dwarven-priest.html'
        }
    }


    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options)
        if (this.actor.system.details.sheetClass !== 'Dwarven-Priest') {
            await this.actor.update({
                'system.class.className': game.i18n.localize('DwarvenPriest.DwarvenPriest')
            })
        }
        // Add in DwarvenPriest specific data if missing
        if (!this.actor.system.skills.deedDie) {
            await this.actor.update({
                'system.skills.deedDie': {
                    label: 'DwarvenPriest.DeedDie',
                    die: ''
                }
            })
        }
        if (this.actor.system.details.sheetClass !== 'DwarvenPriest') {
            await this.actor.update({
                'system.details.sheetClass': 'Dwarven Priest',
                'system.class.spellCheckAbility': 'per',
                'system.details.critRange': 20
            })
        }
        if (this.actor.system.details.sheetClass !== 'DwarvenPriest') {
            await this.actor.update({
                'system.config.attackBonusMode': 'manual',
            })
        }
        return context
    }
}

export {
    ActorSheetDwarvenPriest
}
