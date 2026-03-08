# Continuous Coordination Schema

Open JSON Schema definitions for the data in [Continuous Coordination](https://continuouscoordination.org) loops.

Continuous Coordination is a lightweight methodology for modern teamwork, centered on two structured, overlapping coordination loops:

- **Big-Picture Loop** - Connects plans to progress across teams through regular written updates and next steps to "goal stories" (weekly/bi-weekly/monthly)
- **Ground-Level Loop** - Keeps teammates in sync day-to-day through async team check-ins (daily/weekly)

These schemas define the shape of the data that flows through those loops, so any tool can produce, consume, and exchange it using a shared format.

## Schemas

| Schema | Description |
|--------|-------------|
| [person](schemas/person.schema.json) | A human participant in coordination loops |
| [agent](schemas/agent.schema.json) | An AI autonomous participant in coordination loops |
| [team](schemas/team.schema.json) | A group of actors who coordinate together |
| [membership](schemas/membership.schema.json) | An actor's membership in a team |
| [team-checkin](schemas/team-checkin.schema.json) | An actor's update to the ground-level loop (intentions, progress, blockers) |
| [goal-story](schemas/goal-story.schema.json) | A big-picture story of a container of work - a project, objective, or initiative with ownership and timeframe |
| [goal-story-update](schemas/goal-story-update.schema.json) | An update on status, progress, and next steps on a goal story |
| [coordination-event](schemas/coordination-event.schema.json) | A record of an actor providing input to a coordination loop |

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
{ "$ref": "https://continuouscoordination.org/schema/team-checkin.schema.json" }
```

Or install as a dependency and reference locally.

### Implement in your tool

Any tool that produces or consumes coordination data can use these schemas to ensure interoperability. If your tool writes team check-ins, validate them against `team-checkin.schema.json`. If your tool reads goal story updates, expect the shape defined in `goal-story-update.schema.json`.

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **Patch** (0.1.x) - Documentation, examples, non-breaking clarifications
- **Minor** (0.x.0) - New optional fields, new schemas
- **Major** (x.0.0) - Breaking changes to required fields or structure

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to propose changes.

## License

[CC BY-SA 4.0](LICENSE) - the same license as the Continuous Coordination.

## Links

- [Continuous Coordination](https://continuouscoordination.org)
- [Steady](https://runsteady.com) - the teamwork OS built on Continuous Coordination
