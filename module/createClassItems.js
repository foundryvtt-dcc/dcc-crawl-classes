/* global Folder */
import DCCItem from '../../../systems/dcc/module/item.js'

const baseUrl = '/modules/dcc-crawl-classes/assets/json/'

export async function createClassItems (className) {
  console.log('createClassItems')

  const levelFileUrl = `${baseUrl}${className}-combined-chart.json`

  const initCapClassName = className.charAt(0).toUpperCase() + className.slice(1)

  // Create folder for items
  const folderData = {
    name: `${initCapClassName} Level Items`,
    type: 'Item',
    color: '#A9A9A9',
    folder: 'YUVUoXz0GPo5Leiv'
  }

  const folder = await Folder.create(folderData)

  // Load the JSON file
  fetch(levelFileUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)

      // Iterate over each top-level property in the levelChart object
      Object.keys(data).forEach(levelKey => {
        // Construct the levelData object with the name and level properties
        let levelDataPairs = ''
        for (const [key, value] of Object.entries(data[levelKey].level_info)) {
          levelDataPairs += `${key}=${value}\n`
        }
        // Lawful items
        let levelDataLawfulPairs = ''
        if (data[levelKey].titles?.lawful) {
          levelDataLawfulPairs += `system.details.title.value=${data[levelKey].titles?.lawful}\n`
        }
        for (const [key, value] of Object.entries(data[levelKey].skills?.lawful || {})) {
          levelDataLawfulPairs += `${key}=${value}\n`
        }
        // Neutral items
        let levelDataNeutralPairs = ''
        if (data[levelKey].titles?.neutral) {
          levelDataNeutralPairs += `system.details.title.value=${data[levelKey].titles?.neutral}\n`
        }
        for (const [key, value] of Object.entries(data[levelKey].skills?.neutral || {})) {
          levelDataNeutralPairs += `${key}=${value}\n`
        }
        // Chaotic items
        let levelDataChaoticPairs = ''
        if (data[levelKey].titles?.chaotic) {
          levelDataChaoticPairs += `system.details.title.value=${data[levelKey].titles?.chaotic}\n`
        }
        for (const [key, value] of Object.entries(data[levelKey].skills?.chaotic || {})) {
          levelDataChaoticPairs += `${key}=${value}\n`
        }
        const levelData = {
          img: 'modules/dcc-core-book/assets/svg/game-icons-net/up-card.svg',
          'system.levelData': levelDataPairs,
          'system.levelDataLawful': levelDataLawfulPairs,
          'system.levelDataNeutral': levelDataNeutralPairs,
          'system.levelDataChaotic': levelDataChaoticPairs,
          'system.level': levelKey,
          'system.class': className,
          name: `${className}-${levelKey}`,
          type: 'level',
          folder
        }
        console.log(levelData)
        DCCItem.create(levelData)
      })
    })
}

export async function createAllClassItems () {
  await createClassItems('bard')
  await createClassItems('dwarven-priest')
  await createClassItems('elven-rogue')
  await createClassItems('gnome')
  await createClassItems('halfling-burglar')
  await createClassItems('halfling-champion')
  await createClassItems('orc')
  await createClassItems('paladin')
  await createClassItems('ranger')
}
