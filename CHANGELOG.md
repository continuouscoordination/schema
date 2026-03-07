# Changelog

All notable changes to the Continuous Coordination Schema will be documented in this file.

This project follows [Semantic Versioning](https://semver.org/).

## [2.0.0] - 2026-03-07

### Added

- Added `agent` schema for AI agents participating in coordination loops
- Added `actor_id` and `actor_type` fields to check-in schema (replacing `person_id`)
- Added `actor_id` and `actor_type` fields to goal update schema (replacing `author_id`)
- Added `agent_contributor_ids` field to goal schema
- Added `agents` field to team schema

## [1.1.0] - 2026-03-07

### Added

- Added required `title` field to goal update schema
- Added optional `next_steps` field to goal update schema

## [1.0.0] - 2026-03-05

Initial release.
