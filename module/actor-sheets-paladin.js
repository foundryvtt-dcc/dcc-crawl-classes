/**
 * DCC Paladin character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for Paladin
 * @extends {DCCActorSheet}
 */
class ActorSheetPaladin extends DCCActorSheet {
    /** @inheritDoc */
    static DEFAULT_OPTIONS = {
        position: {
            height: 635
        }
    }

    /** @inheritDoc */
    static PARTS = {
        body: {
            template: 'modules/dcc-crawl-classes/templates/actor-sheet-paladin.html'
        }
    }

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options)
        if (this.actor.system.details.sheetClass !== 'Paladin') {
            await this.actor.update({
                'system.class.className': game.i18n.localize('paladin.Paladin')
            })
        }


        // Add in Paladin specific data if missing
        if (!this.actor.system.skills.smiteDie) {
            await this.actor.update({
                'system.skills.smiteDie': {
                    label: 'Paladin.SmiteDie',
                    die: '1d3'
                }
            })
        }
        if (!this.actor.system.skills.holyDeeds) {
            await this.actor.update({
                'system.skills.holyDeeds': {
                    label: 'Paladin.HolyDeeds',
                    value: '+1'
                }
            })
        }
        if (this.actor.system.details.sheetClass !== 'Paladin') {
            await this.actor.update({
                'system.details.sheetClass': 'Paladin',
                'system.class.spellCheckAbility': 'per',
                'system.details.critRange': 20
            })
        }
        if (this.actor.system.details.sheetClass !== 'Paladin') {
            await this.actor.update({
                'system.config.rollAttackBonus': 'True',
            })
        }
        return context
    }
}

export {
    ActorSheetPaladin
}
