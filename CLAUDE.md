# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Foundry VTT module that adds character sheet support for classes from the Crawl! fanzine to the Dungeon Crawl Classics (DCC) RPG system. This module depends on the `dcc` system.

## Commands

```bash
npm run format      # Lint and fix JS files using Standard
npm run todb        # Compile JSON pack source files to LevelDB
npm run tojson      # Extract LevelDB packs to JSON source files
```

## Architecture

### Module Entry Point
- `module/dcc-crawl-classes.js` - Initializes the module via Foundry's `Hooks.once('init')`, registers all class sheets with `Actors.registerSheet()`, and exposes `game.createCrawlClassItems` / `game.createAllCrawlClassItems` utilities.

### Actor Sheets
Each class has its own sheet file in `module/actor-sheets-*.js`. Sheets extend `DCCActorSheet` from the DCC system (`/systems/dcc/module/actor-sheet.js`) and define:
- `DEFAULT_OPTIONS` - Window dimensions
- `CLASS_TABS` - Tab configuration for the class-specific tab
- `PARTS` - Template partials including both DCC system templates and custom ones from `templates/`
- `_prepareContext()` - Adds class-specific data and initializes default values

### Templates
Located in `templates/actor-partial-*.html`. Each class has a dedicated partial for its class-specific tab content.

### Compendium Packs
- Pack source files: `packs/crawl-class-level-data/src/*.json`
- Compiled LevelDB: `packs/crawl-class-level-data/`
- Level data JSON definitions: `assets/json/*-combined-chart.json`

The pack workflow uses `@foundryvtt/foundryvtt-cli`:
- `compilePacks.js` compiles JSON source to LevelDB
- `extractPacks.js` extracts LevelDB to JSON source

### Supported Classes
Bard, Gnome, Orc, Paladin, Ranger, Dwarven Priest, Elven Rogue, Halfling Burglar, Halfling Champion

## Code Style

Uses StandardJS for linting. The `standard` config in package.json ignores `assets/`, `metadata/`, and `packs/` directories.

Global variables (`foundry`, `game`, `Hooks`, `Folder`) are expected from Foundry VTT runtime and should be declared in `/* global */` comments.