/* global foundry */
/**
 * Crawl! Classes — registration data for the DCC extension API.
 *
 * Each Crawl class is described once here and registered through the
 * four stable `game.dcc.*` registries the DCC system exposes (see the
 * DCC repo's `docs/dev/EXTENSION_API.md` + `CLASS_DECOMPOSITION.md`):
 *
 *   - `registerClassMixin(classId, mixinFn)` — the class's own schema
 *     fields (skills / class fields). Replaces the single monolithic
 *     `dcc.definePlayerSchema` hook that used to add *every* class's
 *     fields to *every* Player.
 *   - `registerClassDefaults(classId, defaults)` — class identity +
 *     mechanical defaults written on a sheet's first open. Replaces the
 *     inline `_prepareContext` "if sheetClass !== 'X'" blocks.
 *   - `registerSheetPart(classId, { parts, tabs })` — the class's sheet
 *     parts + tab labels. Replaces the per-sheet static `PARTS` /
 *     `CLASS_TABS`. The class sheets are now 5-line stubs extending the
 *     DCC `DCCSheet` base (see `actor-sheets-*.js`).
 *   - `registerHomebrewClassForProgressionLoad(classId, itemPrefix)` —
 *     teaches the DCC level-data-pack loader to assemble a lib
 *     `ClassProgression` from the `{itemPrefix}-{level}` items in the
 *     pack registered via `dcc.registerLevelDataPack`.
 *
 * `classId` is the lowercase canonical identifier (`actor.classId`
 * resolves `system.details.sheetClass.toLowerCase()`), matching the
 * `static CLASS_ID` pinned on each sheet stub and the
 * `{classId}-{level}` item naming in the level-data pack.
 *
 * Fields a Crawl class shares with a DCC built-in (e.g. the thief skill
 * block, `class.corruption`) are intentionally NOT redeclared — the DCC
 * `thief` / `wizard` / `elf` mixins already contribute them to the
 * shared Player schema, so they are present on every Player.
 */

const MODULE_ID = 'dcc-crawl-classes'

/** Template path for a Crawl class partial. */
function classPartial (name) {
  return `modules/${MODULE_ID}/templates/actor-partial-${name}.html`
}

/** PC-flavored common parts every Crawl sheet overrides onto the base. */
function commonParts () {
  return {
    character: { id: 'character', template: 'systems/dcc/templates/actor-partial-pc-common.html' },
    equipment: { id: 'equipment', template: 'systems/dcc/templates/actor-partial-pc-equipment.html' }
  }
}

/**
 * Per-class registration descriptors.
 *
 * `mixin` builds fresh field instances each call (Foundry may re-invoke
 * `defineSchema()`; field objects are not shareable across schemas).
 */
export const CRAWL_CLASSES = {
  bard: {
    label: 'Bard.ActorSheetBard',
    sheetHeight: 635,
    mixin (schema) {
      const f = foundry.data.fields
      schema.skills.fields.talentDie = new f.SchemaField({
        label: new f.StringField({ initial: 'Bard.TalentDie' }),
        die: new f.StringField({ initial: '1d14' })
      })
    },
    defaults: {
      sheetClass: 'Bard',
      localize: { 'class.className': 'Bard.Bard' },
      literal: {
        'details.critRange': 20,
        'config.showSkills': true,
        'config.showSpells': true,
        'class.spellCheckAbility': 'int'
      }
    },
    sheetPart: {
      parts: { ...commonParts(), bard: { id: 'bard', template: classPartial('bard') } },
      tabs: { sheet: { tabs: [{ id: 'bard', group: 'sheet', label: 'Bard.Bard' }] } }
    }
  },

  gnome: {
    label: 'Gnome.ActorSheetGnome',
    sheetHeight: 635,
    mixin (schema) {
      const f = foundry.data.fields
      schema.skills.fields.trickDie = new f.SchemaField({
        label: new f.StringField({ initial: 'Gnome.TrickDie' }),
        die: new f.StringField({ initial: '1d3' })
      })
    },
    defaults: {
      sheetClass: 'Gnome',
      localize: { 'class.className': 'Gnome.Gnome' },
      literal: {
        'details.critRange': 20,
        'config.showSkills': true,
        'config.showSpells': true,
        'class.spellCheckAbility': 'int'
      }
    },
    sheetPart: {
      parts: { ...commonParts(), gnome: { id: 'gnome', template: classPartial('gnome') } },
      tabs: { sheet: { tabs: [{ id: 'gnome', group: 'sheet', label: 'Gnome.Gnome' }] } }
    }
  },

  paladin: {
    label: 'Paladin.ActorSheetPaladin',
    sheetHeight: 635,
    mixin (schema) {
      const f = foundry.data.fields
      schema.skills.fields.smiteDie = new f.SchemaField({
        label: new f.StringField({ initial: 'Paladin.SmiteDie' }),
        die: new f.StringField({ initial: '1d3' })
      })
      schema.skills.fields.holyDeeds = new f.SchemaField({
        label: new f.StringField({ initial: 'Paladin.HolyDeeds' }),
        value: new f.StringField({ initial: '+1' })
      })
    },
    defaults: {
      sheetClass: 'Paladin',
      localize: { 'class.className': 'Paladin.Paladin' },
      literal: {
        'details.critRange': 20,
        'config.showSkills': true,
        'class.spellCheckAbility': 'per',
        'config.attackBonusMode': 'manual'
      }
    },
    sheetPart: {
      parts: {
        ...commonParts(),
        paladin: { id: 'paladin', template: classPartial('paladin') },
        clericSpells: { id: 'clericSpells', template: 'systems/dcc/templates/actor-partial-cleric-spells.html' }
      },
      tabs: {
        sheet: {
          tabs: [
            { id: 'paladin', group: 'sheet', label: 'Paladin.Paladin' },
            { id: 'clericSpells', group: 'sheet', label: 'DCC.Spells' }
          ]
        }
      }
    }
  },

  ranger: {
    label: 'Ranger.ActorSheetRanger',
    sheetHeight: 640,
    mixin (schema) {
      const f = foundry.data.fields
      const rangerSkill = (label, ability, applyCheckPenalty) => new f.SchemaField({
        label: new f.StringField({ initial: label }),
        ability: new f.StringField({ initial: ability }),
        value: new f.StringField({ initial: '+0' }),
        config: new f.SchemaField({
          useAbility: new f.BooleanField({ initial: true }),
          applyCheckPenalty: new f.BooleanField({ initial: applyCheckPenalty }),
          useLevel: new f.BooleanField({ initial: true }),
          useDeed: new f.BooleanField({ initial: false })
        })
      })
      schema.skills.fields.climb = rangerSkill('Ranger.Climb', 'agl', true)
      schema.skills.fields.sneak = rangerSkill('Ranger.Sneak', 'agl', true)
      schema.skills.fields.strider = rangerSkill('Ranger.Strider', 'agl', true)
      schema.skills.fields.survival = rangerSkill('Ranger.Survival', 'per', false)
      schema.skills.fields.favoredEnemies = new f.SchemaField({
        label: new f.StringField({ initial: 'Ranger.FavoredEnemies' }),
        value: new f.StringField({ initial: '' })
      })
    },
    defaults: {
      sheetClass: 'Ranger',
      localize: { 'class.className': 'Ranger.Ranger' },
      literal: {
        'details.critRange': 20,
        'config.showSkills': true,
        'config.attackBonusMode': 'manual',
        // findTrap is inherited from the DCC thief mixin (no config
        // sub-field); relabel it for the Ranger context on first open.
        'skills.findTrap.label': 'Ranger.FindTrap'
      }
    },
    sheetPart: {
      parts: { ...commonParts(), ranger: { id: 'ranger', template: classPartial('ranger') } },
      tabs: { sheet: { tabs: [{ id: 'ranger', group: 'sheet', label: 'Ranger.Ranger' }] } }
    }
  },

  'dwarven-priest': {
    label: 'DwarvenPriest.ActorSheetDwarvenPriest',
    sheetHeight: 635,
    sheetWidth: 628,
    mixin (schema) {
      const f = foundry.data.fields
      schema.skills.fields.deedDie = new f.SchemaField({
        label: new f.StringField({ initial: 'DwarvenPriest.DeedDie' }),
        die: new f.StringField({ initial: '1d3' })
      })
    },
    defaults: {
      sheetClass: 'Dwarven-Priest',
      localize: { 'class.className': 'DwarvenPriest.DwarvenPriest' },
      enrichHtml: { 'class.mightyDeedsLink': 'DCC.MightyDeedsLink' },
      literal: {
        'details.critRange': 20,
        'config.showSkills': true,
        'class.spellCheckAbility': 'per',
        'config.attackBonusMode': 'manual',
        // deedDie is shared with Halfling-Champion; pin this class's label.
        'skills.deedDie.label': 'DwarvenPriest.DeedDie'
      }
    },
    sheetPart: {
      parts: {
        ...commonParts(),
        'dwarven-priest': { id: 'dwarven-priest', template: classPartial('dwarven-priest') },
        clericSpells: { id: 'clericSpells', template: 'systems/dcc/templates/actor-partial-cleric-spells.html' }
      },
      tabs: {
        sheet: {
          tabs: [
            { id: 'dwarven-priest', group: 'sheet', label: 'DwarvenPriest.DwarvenPriest' },
            { id: 'clericSpells', group: 'sheet', label: 'DCC.Spells' }
          ]
        }
      }
    }
  },

  'elven-rogue': {
    label: 'ElvenRogue.ActorSheetElvenRogue',
    sheetHeight: 635,
    sheetWidth: 600,
    mixin (schema) {
      const f = foundry.data.fields
      schema.skills.fields.luckDie = new f.SchemaField({
        label: new f.StringField({ initial: 'ElvenRogue.LuckDie' }),
        die: new f.StringField({ initial: '1d3' })
      })
    },
    defaults: {
      sheetClass: 'Elven-Rogue',
      localize: { 'class.className': 'ElvenRogue.ElvenRogue' },
      literal: {
        'details.critRange': 20,
        'config.showSkills': true,
        'config.showSpells': true,
        'class.spellCheckAbility': 'int'
      }
    },
    sheetPart: {
      parts: { ...commonParts(), 'elven-rogue': { id: 'elven-rogue', template: classPartial('elven-rogue') } },
      tabs: { sheet: { tabs: [{ id: 'elven-rogue', group: 'sheet', label: 'ElvenRogue.ElvenRogue' }] } }
    }
  },

  orc: {
    label: 'Orc.ActorSheetOrc',
    sheetHeight: 635,
    mixin (schema) {
      const f = foundry.data.fields
      schema.skills.fields.rageDie = new f.SchemaField({
        label: new f.StringField({ initial: 'Orc.RageDie' }),
        die: new f.StringField({ initial: '1d3' }),
        value: new f.StringField({ initial: '' })
      })
    },
    defaults: {
      sheetClass: 'Orc',
      localize: { 'class.className': 'Orc.Orc' },
      literal: {
        'details.critRange': 20,
        'config.showSkills': true
      }
    },
    sheetPart: {
      parts: { ...commonParts(), orc: { id: 'orc', template: classPartial('orc') } },
      tabs: { sheet: { tabs: [{ id: 'orc', group: 'sheet', label: 'Orc.Orc' }] } }
    }
  },

  'halfling-champion': {
    label: 'HalflingChampion.ActorSheetHalflingChampion',
    sheetHeight: 635,
    sheetWidth: 648,
    mixin (schema) {
      const f = foundry.data.fields
      schema.skills.fields.deedDie = new f.SchemaField({
        label: new f.StringField({ initial: 'HalflingChampion.DeedDie' }),
        die: new f.StringField({ initial: '1d3' })
      })
    },
    defaults: {
      sheetClass: 'Halfling-Champion',
      localize: { 'class.className': 'HalflingChampion.HalflingChampion' },
      literal: {
        'details.critRange': 20,
        'config.showSkills': true,
        'config.attackBonusMode': 'manual',
        // deedDie is shared with Dwarven-Priest; pin this class's label.
        'skills.deedDie.label': 'HalflingChampion.DeedDie'
      }
    },
    sheetPart: {
      parts: { ...commonParts(), 'halfling-champion': { id: 'halfling-champion', template: classPartial('halfling-champion') } },
      tabs: { sheet: { tabs: [{ id: 'halfling-champion', group: 'sheet', label: 'HalflingChampion.HalflingChampion' }] } }
    }
  },

  'halfling-burglar': {
    label: 'HalflingBurglar.ActorSheetHalflingBurglar',
    sheetHeight: 635,
    sheetWidth: 648,
    mixin (schema) {
      const f = foundry.data.fields
      schema.skills.fields.burglarSkills = new f.SchemaField({
        label: new f.StringField({ initial: 'HalflingBurglar.BurglarSkills' }),
        value: new f.StringField({ initial: '' })
      })
      // The thief skill block (sneakSilently … castSpellFromScroll) is
      // inherited from the DCC `thief` mixin on the shared Player schema.
    },
    defaults: {
      sheetClass: 'Halfling-Burglar',
      localize: { 'class.className': 'HalflingBurglar.HalflingBurglar' },
      literal: {
        'details.critRange': 20,
        'config.showSkills': true,
        'class.spellCheckAbility': 'int'
      }
    },
    sheetPart: {
      parts: { ...commonParts(), 'halfling-burglar': { id: 'halfling-burglar', template: classPartial('halfling-burglar') } },
      tabs: { sheet: { tabs: [{ id: 'halfling-burglar', group: 'sheet', label: 'HalflingBurglar.HalflingBurglar' }] } }
    }
  }
}

/**
 * Register every Crawl class through the DCC extension API.
 *
 * Called from the module `init` hook once `game.dcc` is available. The
 * mixins must register before the Player schema is first constructed
 * (Foundry builds data models lazily, well after `init`), so `init` is
 * the correct timing.
 *
 * @param {object} api - the `game.dcc` namespace.
 */
export function registerCrawlClasses (api) {
  for (const [classId, def] of Object.entries(CRAWL_CLASSES)) {
    api.registerClassMixin(classId, def.mixin)
    api.registerClassDefaults(classId, def.defaults)
    api.registerSheetPart(classId, def.sheetPart)
    api.registerHomebrewClassForProgressionLoad(classId, classId)
  }
}
