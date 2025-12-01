/* global foundry, game, ui */

/**
 * Migration system for DCC Crawl Classes
 * Handles data migrations when field names/paths change between versions
 */

const MIGRATIONS = {
  /**
   * Migration 1: Move class-specific dice from system.class.* to system.skills.*
   * This enables rolling these dice from the Skills tab
   */
  1: {
    version: '1.1.0',
    description: 'Move class dice to skills structure',
    migrate: async (actor) => {
      const updates = {}

      // Map of old paths to new skill structures
      const diceToMigrate = [
        {
          oldPath: 'system.class.rageDie',
          newSkillKey: 'rageDie',
          label: 'Orc.RageDie',
          sheetClass: 'Orc'
        },
        {
          oldPath: 'system.class.trickDie',
          newSkillKey: 'trickDie',
          label: 'Gnome.TrickDie',
          sheetClass: 'Gnome'
        },
        {
          oldPath: 'system.class.smiteDie',
          newSkillKey: 'smiteDie',
          label: 'Paladin.SmiteDie',
          sheetClass: 'Paladin'
        },
        {
          oldPath: 'system.class.deedDie',
          newSkillKey: 'deedDie',
          label: 'HalflingChampion.DeedDie',
          sheetClass: 'Halfling-Champion'
        },
        {
          oldPath: 'system.class.luckDie',
          newSkillKey: 'luckDie',
          label: 'ElvenRogue.LuckDie',
          sheetClass: 'Elven-Rogue'
        }
      ]

      for (const migration of diceToMigrate) {
        const oldValue = foundry.utils.getProperty(actor, migration.oldPath)

        if (oldValue !== undefined && oldValue !== null) {
          // Create the new skill structure
          updates[`system.skills.${migration.newSkillKey}`] = {
            label: migration.label,
            die: oldValue
          }

          // Remove the old path
          updates[`${migration.oldPath}`] = null
        }
      }

      // Special case: Bard talentDie might be stored as just the value
      const talentDie = actor.system?.skills?.talentDie
      if (talentDie && typeof talentDie === 'string') {
        updates['system.skills.talentDie'] = {
          label: 'Bard.TalentDie',
          die: talentDie
        }
      }

      // Special case: Dwarven Priest deedDie (different label)
      const sheetClass = actor.system?.details?.sheetClass
      if (sheetClass === 'Dwarven-Priest' || sheetClass === 'Dwarven Priest') {
        const dwarvenDeedDie = foundry.utils.getProperty(actor, 'system.class.deedDie')
        if (dwarvenDeedDie !== undefined && dwarvenDeedDie !== null) {
          updates['system.skills.deedDie'] = {
            label: 'DwarvenPriest.DeedDie',
            die: dwarvenDeedDie
          }
          updates['system.class.deedDie'] = null
        }
      }

      return updates
    }
  }
}

/**
 * Get the current migration version for the module
 * @returns {number} The current migration version
 */
export function getCurrentMigrationVersion () {
  return game.settings.get('dcc-crawl-classes', 'migrationVersion') ?? 0
}

/**
 * Set the current migration version for the module
 * @param {number} version - The version to set
 */
export async function setMigrationVersion (version) {
  await game.settings.set('dcc-crawl-classes', 'migrationVersion', version)
}

/**
 * Register the migration version setting
 */
export function registerMigrationSettings () {
  game.settings.register('dcc-crawl-classes', 'migrationVersion', {
    name: 'Migration Version',
    hint: 'Tracks which data migrations have been applied',
    scope: 'world',
    config: false,
    type: Number,
    default: 0
  })
}

/**
 * Run all pending migrations
 * @returns {Promise<void>}
 */
export async function runMigrations () {
  const currentVersion = getCurrentMigrationVersion()
  const migrationKeys = Object.keys(MIGRATIONS).map(Number).sort((a, b) => a - b)
  const pendingMigrations = migrationKeys.filter(v => v > currentVersion)

  if (pendingMigrations.length === 0) {
    console.log('DCC Crawl Classes | No migrations needed')
    return
  }

  console.log(`DCC Crawl Classes | Running ${pendingMigrations.length} migration(s)`)
  ui.notifications.info(`DCC Crawl Classes: Running ${pendingMigrations.length} data migration(s). Please wait...`)

  for (const migrationVersion of pendingMigrations) {
    const migration = MIGRATIONS[migrationVersion]
    console.log(`DCC Crawl Classes | Running migration ${migrationVersion}: ${migration.description}`)

    try {
      await migrateActors(migration)
      await setMigrationVersion(migrationVersion)
      console.log(`DCC Crawl Classes | Migration ${migrationVersion} completed`)
    } catch (err) {
      console.error(`DCC Crawl Classes | Migration ${migrationVersion} failed:`, err)
      ui.notifications.error(`DCC Crawl Classes: Migration ${migrationVersion} failed. Check console for details.`)
      return
    }
  }

  ui.notifications.info('DCC Crawl Classes: Data migrations completed successfully!')
}

/**
 * Migrate all actors using the provided migration
 * @param {object} migration - The migration object with a migrate function
 * @returns {Promise<void>}
 */
async function migrateActors (migration) {
  // Get all actors in the world
  const actors = game.actors.contents

  // Define crawl class sheet identifiers
  const crawlSheetClasses = [
    'Orc', 'Gnome', 'Bard', 'Paladin', 'Ranger',
    'Dwarven-Priest', 'Dwarven Priest',
    'Elven-Rogue', 'Elven Rogue',
    'Halfling-Burglar', 'Halfling Burglar', 'HalflingBurglar',
    'Halfling-Champion', 'Halfling Champion', 'HalflingChampion'
  ]

  for (const actor of actors) {
    // Only migrate actors that use crawl class sheets
    const sheetClass = actor.system?.details?.sheetClass
    if (!sheetClass || !crawlSheetClasses.includes(sheetClass)) {
      continue
    }

    const updates = await migration.migrate(actor)

    if (Object.keys(updates).length > 0) {
      console.log(`DCC Crawl Classes | Migrating actor: ${actor.name}`, updates)
      await actor.update(updates)
    }
  }

  // Also migrate actors in compendiums if they're unlocked
  for (const pack of game.packs) {
    if (pack.documentName !== 'Actor' || pack.locked) continue

    const documents = await pack.getDocuments()
    for (const actor of documents) {
      const sheetClass = actor.system?.details?.sheetClass
      if (!sheetClass || !crawlSheetClasses.includes(sheetClass)) {
        continue
      }

      const updates = await migration.migrate(actor)

      if (Object.keys(updates).length > 0) {
        console.log(`DCC Crawl Classes | Migrating compendium actor: ${actor.name}`, updates)
        await actor.update(updates)
      }
    }
  }
}

/**
 * Check if migrations need to run (for display purposes)
 * @returns {boolean}
 */
export function needsMigration () {
  const currentVersion = getCurrentMigrationVersion()
  const migrationKeys = Object.keys(MIGRATIONS).map(Number)
  const maxVersion = Math.max(...migrationKeys)
  return currentVersion < maxVersion
}
