/* global game, Hooks */

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
import { registerCrawlClasses } from './crawl-class-data.js'

/**
 * Sheet registrations: each Crawl class is a 5-line `DCCSheet` stub.
 * The `scope` matches the legacy `Actors.registerSheet` id so existing
 * actors' stored `flags.core.sheetClass` values keep resolving.
 */
const CRAWL_SHEETS = [
  { sheet: BardSheets.ActorSheetBard, scope: 'dcc-crawl-classes-bard', label: 'Bard.ActorSheetBard' },
  { sheet: GnomeSheets.ActorSheetGnome, scope: 'dcc-crawl-classes-gnome', label: 'Gnome.ActorSheetGnome' },
  { sheet: PaladinSheets.ActorSheetPaladin, scope: 'dcc-crawl-classes-paladin', label: 'Paladin.ActorSheetPaladin' },
  { sheet: RangerSheets.ActorSheetRanger, scope: 'dcc-crawl-classes-ranger', label: 'Ranger.ActorSheetRanger' },
  { sheet: DwarvenPriestSheets.ActorSheetDwarvenPriest, scope: 'dcc-crawl-classes-dwarven-priest', label: 'DwarvenPriest.ActorSheetDwarvenPriest' },
  { sheet: ElvenRogueSheets.ActorSheetElvenRogue, scope: 'dcc-crawl-classes-elven-rogue', label: 'ElvenRogue.ActorSheetElvenRogue' },
  { sheet: HalflingBurglarSheets.ActorSheetHalflingBurglar, scope: 'dcc-crawl-classes-halfling-burglar', label: 'HalflingBurglar.ActorSheetHalflingBurglar' },
  { sheet: HalflingChampionSheets.ActorSheetHalflingChampion, scope: 'dcc-crawl-classes-halfling-champion', label: 'HalflingChampion.ActorSheetHalflingChampion' },
  { sheet: OrcSheets.ActorSheetOrc, scope: 'dcc-crawl-classes-orc', label: 'Orc.ActorSheetOrc' }
]

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */
Hooks.once('init', async function () {
  console.log('DCC | Initializing Dungeon Crawl Classics — Crawl! Classes')

  game.createCrawlClassItems = createClassItems
  game.createAllCrawlClassItems = createAllClassItems

  // Register migration settings
  registerMigrationSettings()

  // Register the class level-data pack with the DCC system so the lib's
  // class-progression loader can assemble progressions at `dcc.ready`.
  Hooks.callAll('dcc.registerLevelDataPack', 'dcc-crawl-classes.crawl-class-level-data')

  // Register every Crawl class through the DCC extension API: schema
  // mixin + first-open defaults + sheet parts/tabs + progression-load
  // mapping. Each class's schema fields are now contributed only by its
  // own mixin rather than a monolithic `dcc.definePlayerSchema` hook.
  // `game.dcc` is created during the DCC system's `init` hook, which
  // runs before this module's `init`.
  registerCrawlClasses(game.dcc)

  // Register the per-class sheet stubs. The `DCCSheet` base composes
  // parts/tabs from the `registerSheetPart` entries above by `CLASS_ID`.
  for (const { sheet, scope, label } of CRAWL_SHEETS) {
    game.dcc.registerActorSheet('Player', sheet, { scope, label })
  }
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
