# Continuous Coordination Schema

Open JSON Schema definitions for the data in [Continuous Coordination](https://continuouscoordination.org) loops.

Continuous Coordination is a lightweight methodology for modern teamwork, centered on two structured, overlapping coordination loops:

- **Big-Picture Loop** -- Connects plans to progress across teams through goals and regular written updates (weekly/bi-weekly/monthly)
- **Ground-Level Loop** -- Keeps teammates in sync day-to-day through async check-ins (daily/weekly)

These schemas define the shape of the data that flows through those loops, so any tool can produce, consume, and exchange it using a shared format.

## Schemas

| Schema | Description |
|--------|-------------|
| [person](schemas/person.schema.json) | A team member participating in coordination loops |
| [team](schemas/team.schema.json) | A group of people who coordinate together |
| [checkin](schemas/checkin.schema.json) | An individual's update to the ground-level loop (intentions, progress, blockers) |
| [goal](schemas/goal.schema.json) | A big-picture goal, objective, or initiative with ownership and timeframe |
| [goal-update](schemas/goal-update.schema.json) | A progress update on a goal |

See [examples/](examples/) for valid sample data and [spec.md](spec.md) for the full specification.

## Usage

### Validate data against the schemas

```bash
npm install
npm test
```

### Use in your own project

Reference the schemas directly by URL:

```json
{ "$ref": "https://continuouscoordination.org/schema/checkin.schema.json" }
```

Or install as a dependency and reference locally.

### Implement in your tool

Any tool that produces or consumes coordination data can use these schemas to ensure interoperability. If your tool writes check-ins, validate them against `checkin.schema.json`. If your tool reads goal updates, expect the shape defined in `goal-update.schema.json`.

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **Patch** (0.1.x) -- Documentation, examples, non-breaking clarifications
- **Minor** (0.x.0) -- New optional fields, new schemas
- **Major** (x.0.0) -- Breaking changes to required fields or structure

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to propose changes.

## License

[CC BY-SA 4.0](LICENSE) -- the same license as the Continuous Coordination.

## Links

- [Continuous Coordination](https://continuouscoordination.org)
- [Continuous Coordination GitHub](https://github.com/continuouscoordination/practices)
- [Steady](https://runsteady.com) -- the teamwork OS built on Continuous Coordination
