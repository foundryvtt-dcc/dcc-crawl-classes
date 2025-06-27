/**
 * DCC Ranger character sheet overrides
 */

import DCCActorSheet from '/systems/dcc/module/actor-sheet.js'

/**
 * Extend the zero-level/NPC sheet for Ranger
 * @extends {DCCActorSheet}
 */
class ActorSheetRanger extends DCCActorSheet {
    /** @inheritDoc */
    static DEFAULT_OPTIONS = {
        position: {
            height: 635
        }
    }

    /** @inheritDoc */
    static PARTS = {
        body: {
            template: 'modules/dcc-crawl-classes/templates/actor-sheet-ranger.html'
        }
    }

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options)
        if (this.actor.system.details.sheetClass !== 'Ranger') {
            await this.actor.update({
                'system.class.className': game.i18n.localize('ranger.Ranger')
            })
        }

        if (this.actor.system.details.sheetClass !== 'Ranger') {
            await this.actor.update({
                'system.config.attackBonusMode': 'manual',
            })
        }
        if (this.actor.system.skills.climb) {
            await this.actor.update({
                'system.skills.climb': {
                    label: 'Ranger.Climb',
                }
            })
        }
        if (this.actor.system.skills.FindTrap) {
            await this.actor.update({
                'system.skills.findTrap': {
                    label: 'Ranger.findTrap',
                }
            })
        }
        if (this.actor.system.skills.sneak) {
            await this.actor.update({
                'system.skills.sneak': {
                    label: 'Ranger.Sneak',
                }
            })
        }
        if (this.actor.system.skills.strider) {
            await this.actor.update({
                'system.skills.strider': {
                    label: 'Ranger.Strider',
                }
            })
        }
        if (this.actor.system.skills.survival) {
            await this.actor.update({
                'system.skills.survival': {
                    label: 'Ranger.Survival',
                }
            })
        }
        if (this.actor.system.skills.favoredEnemies) {
            await this.actor.update({
                'system.skills.favoredEnemies': {
                    label: 'Ranger.FavoredEnemies',
                }
            })
        }
        return context
    }
}

export {
    ActorSheetRanger
}
