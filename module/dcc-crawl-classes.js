/* global foundry */

import * as BardSheets from './actor-sheets-bard.js'
import * as GnomeSheets from './actor-sheets-gnome.js'
import * as PaladinSheets from './actor-sheets-paladin.js'
import * as RangerSheets from './actor-sheets-ranger.js'
import * as DwarvenPriestSheets from './actor-sheets-dwarven-priest.js'
import * as ElvenRogueSheets from './actor-sheets-elven-rogue.js'
import * as HalflingBurglarSheets from './actor-sheets-halfling-burglar.js'
import * as HalflingChampionSheets from './actor-sheets-halfling-champion.js'
import * as OrcSheets from './actor-sheets-orc.js'

const { Actors } = foundry.documents.collections

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */
Hooks.once('init', async function () {
  console.log(`DCC | Initializing Dungeon Crawl Classics System`)
  console.log(`Loading DCC Crawl! Classes`)

  // Register sheet application classes
  Actors.registerSheet('dcc-crawl-classes-bard', BardSheets.ActorSheetBard, { types: ['Player'], label: 'Bard.ActorSheetBard' })
  Actors.registerSheet('dcc-crawl-classes-gnome', GnomeSheets.ActorSheetGnome, { types: ['Player'], label: 'Gnome.ActorSheetGnome'})
  Actors.registerSheet('dcc-crawl-classes-paladin', PaladinSheets.ActorSheetPaladin, { types: ['Player'], label: 'Paladin.ActorSheetPaladin' })
  Actors.registerSheet('dcc-crawl-classes-ranger', RangerSheets.ActorSheetRanger, { types: ['Player'], label: 'Ranger.ActorSheetRanger' })
  Actors.registerSheet('dcc-crawl-classes-dwarven-priest', DwarvenPriestSheets.ActorSheetDwarvenPriest, { types: ['Player'], label: 'DwarvenPriest.ActorSheetDwarvenPriest' })
  Actors.registerSheet('dcc-crawl-classes-elven-rogue', ElvenRogueSheets.ActorSheetElvenRogue, { types: ['Player'], label: 'ElvenRogue.ActorSheetElvenRogue' })
  Actors.registerSheet('dcc-crawl-classes-halfling-burglar', HalflingBurglarSheets.ActorSheetHalflingBurglar, { types: ['Player'], label: 'HalflingBurglar.ActorSheetHalflingBurglar' })
  Actors.registerSheet('dcc-crawl-classes-halfling-champion', HalflingChampionSheets.ActorSheetHalflingChampion, { types: ['Player'], label: 'HalflingChampion.ActorSheetHalflingChampion' })
  Actors.registerSheet('dcc-crawl-classes-orc', OrcSheets.ActorSheetOrc, { types: ['Player'], label: 'Orc.ActorSheetOrc' })
})

