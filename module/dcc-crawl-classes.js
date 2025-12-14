/* global foundry, game, Hooks */

import * as BardSheets from './actor-sheets-bard.js'
import * as GnomeSheets from './actor-sheets-gnome.js'
import * as PaladinSheets from './actor-sheets-paladin.js'
import * as RangerSheets from './actor-sheets-ranger.js'
import * as DwarvenPriestSheets from './actor-sheets-dwarven-priest.js'
import * as ElvenRogueSheets from './actor-sheets-elven-rogue.js'
import * as HalflingBurglarSheets from './actor-sheets-halfling-burglar.js'
import * as HalflingChampionSheets from './actor-sheets-halfling-champion.js'
import * as OrcSheets from './actor-sheets-orc.js'
import { createClassItems, createAllClassItems } from './createClassItems.js'
import { registerMigrationSettings, runMigrations } from './migrations.js'

const { SchemaField, StringField, BooleanField } = foundry.data.fields

/* -------------------------------------------- */
/*  Schema Extensions                           */
/* -------------------------------------------- */
/**
 * Extend the DCC base actor schema with Crawl Classes fields.
 * This hook runs during DCC system initialization, before module init.
 */
Hooks.on('dcc.defineBaseActorSchema', (schema) => {
  // Add sheetClass to details if not already present (may be added by other modules)
  if (!schema.details.fields.sheetClass) {
    schema.details.fields.sheetClass = new StringField({ initial: '' })
  }
})

/**
 * Extend the DCC Player schema with Crawl Classes skills.
 * This hook runs during DCC system initialization, before module init.
 */
Hooks.on('dcc.definePlayerSchema', (schema) => {
  // Skill config schema for advanced skill options
  const SkillConfigSchema = () => new SchemaField({
    useAbility: new BooleanField({ initial: false }),
    applyCheckPenalty: new BooleanField({ initial: false }),
    useLevel: new BooleanField({ initial: false }),
    useDeed: new BooleanField({ initial: false })
  })

  // Ranger skills
  schema.skills.fields.climb = new SchemaField({
    label: new StringField({ initial: 'Ranger.Climb' }),
    ability: new StringField({ initial: 'agl' }),
    value: new StringField({ initial: '+0' }),
    config: SkillConfigSchema()
  })
  schema.skills.fields.sneak = new SchemaField({
    label: new StringField({ initial: 'Ranger.Sneak' }),
    ability: new StringField({ initial: 'agl' }),
    value: new StringField({ initial: '+0' }),
    config: SkillConfigSchema()
  })
  schema.skills.fields.strider = new SchemaField({
    label: new StringField({ initial: 'Ranger.Strider' }),
    ability: new StringField({ initial: 'agl' }),
    value: new StringField({ initial: '+0' }),
    config: SkillConfigSchema()
  })
  schema.skills.fields.survival = new SchemaField({
    label: new StringField({ initial: 'Ranger.Survival' }),
    ability: new StringField({ initial: 'per' }),
    value: new StringField({ initial: '+0' }),
    config: SkillConfigSchema()
  })
  schema.skills.fields.favoredEnemies = new SchemaField({
    label: new StringField({ initial: 'Ranger.FavoredEnemies' }),
    value: new StringField({ initial: '' })
  })

  // Paladin skills
  schema.skills.fields.smiteDie = new SchemaField({
    label: new StringField({ initial: 'Paladin.SmiteDie' }),
    die: new StringField({ initial: '' })
  })
  schema.skills.fields.holyDeeds = new SchemaField({
    label: new StringField({ initial: 'Paladin.HolyDeeds' }),
    value: new StringField({ initial: '' })
  })

  // Bard/Gnome/Elven Rogue skills
  schema.skills.fields.talentDie = new SchemaField({
    label: new StringField({ initial: 'Bard.TalentDie' }),
    die: new StringField({ initial: '' })
  })
  schema.skills.fields.trickDie = new SchemaField({
    label: new StringField({ initial: 'Gnome.TrickDie' }),
    die: new StringField({ initial: '' })
  })
  schema.skills.fields.luckDie = new SchemaField({
    label: new StringField({ initial: 'ElvenRogue.LuckDie' }),
    die: new StringField({ initial: '' })
  })

  // Orc skills
  schema.skills.fields.rageDie = new SchemaField({
    label: new StringField({ initial: 'Orc.RageDie' }),
    die: new StringField({ initial: '' })
  })

  // Dwarven Priest / Halfling Champion skills
  schema.skills.fields.deedDie = new SchemaField({
    label: new StringField({ initial: 'DwarvenPriest.DeedDie' }),
    die: new StringField({ initial: '' })
  })

  // Halfling Burglar skills
  schema.skills.fields.burglarSkills = new SchemaField({
    label: new StringField({ initial: 'HalflingBurglar.BurglarSkills' }),
    value: new StringField({ initial: '' })
  })
})

const { Actors } = foundry.documents.collections

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */
Hooks.once('init', async function () {
  console.log('DCC | Initializing Dungeon Crawl Classics System')

  game.createCrawlClassItems = createClassItems
  game.createAllCrawlClassItems = createAllClassItems

  // Register migration settings
  registerMigrationSettings()

  Hooks.callAll('dcc.registerLevelDataPack', 'dcc-crawl-classes.crawl-class-level-data')

  console.log('Loading DCC Crawl! Classes')

  // Register sheet application classes
  Actors.registerSheet('dcc-crawl-classes-bard', BardSheets.ActorSheetBard, { types: ['Player'], label: 'Bard.ActorSheetBard' })
  Actors.registerSheet('dcc-crawl-classes-gnome', GnomeSheets.ActorSheetGnome, { types: ['Player'], label: 'Gnome.ActorSheetGnome' })
  Actors.registerSheet('dcc-crawl-classes-paladin', PaladinSheets.ActorSheetPaladin, { types: ['Player'], label: 'Paladin.ActorSheetPaladin' })
  Actors.registerSheet('dcc-crawl-classes-ranger', RangerSheets.ActorSheetRanger, { types: ['Player'], label: 'Ranger.ActorSheetRanger' })
  Actors.registerSheet('dcc-crawl-classes-dwarven-priest', DwarvenPriestSheets.ActorSheetDwarvenPriest, { types: ['Player'], label: 'DwarvenPriest.ActorSheetDwarvenPriest' })
  Actors.registerSheet('dcc-crawl-classes-elven-rogue', ElvenRogueSheets.ActorSheetElvenRogue, { types: ['Player'], label: 'ElvenRogue.ActorSheetElvenRogue' })
  Actors.registerSheet('dcc-crawl-classes-halfling-burglar', HalflingBurglarSheets.ActorSheetHalflingBurglar, { types: ['Player'], label: 'HalflingBurglar.ActorSheetHalflingBurglar' })
  Actors.registerSheet('dcc-crawl-classes-halfling-champion', HalflingChampionSheets.ActorSheetHalflingChampion, { types: ['Player'], label: 'HalflingChampion.ActorSheetHalflingChampion' })
  Actors.registerSheet('dcc-crawl-classes-orc', OrcSheets.ActorSheetOrc, { types: ['Player'], label: 'Orc.ActorSheetOrc' })
})

/* -------------------------------------------- */
/*  Ready Hook - Run Migrations                 */
/* -------------------------------------------- */
Hooks.once('ready', async function () {
  // Only run migrations if user is GM
  if (game.user.isGM) {
    await runMigrations()
  }
})
