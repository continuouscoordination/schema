# Continuous Coordination Schema

Open JSON Schema definitions for the data in [Continuous Coordination](https://continuouscoordination.org) loops.

Continuous Coordination is a lightweight methodology for modern teamwork, centered on two structured, overlapping coordination loops:

- **Big-Picture Loop** - Connects plans to progress across teams and people through _goal stories_ (projects, campaigns, sprints, OKRs - any container of work) and regular written updates with status, progress, and next steps
- **Ground-Level Loop** - Keeps teammates in sync day-to-day through _team member check-ins_ (intentions, accomplishments, and blockers)

These schemas define the shape of the data that flows through those loops, so any tool can produce, consume, and exchange it using a shared format.

## Schemas

| Schema | Description |
|--------|-------------|
| [actor](schemas/actor.schema.json) | A participant in coordination loops (person or agent) |
| [team](schemas/team.schema.json) | A group of actors who coordinate together |
| [team-checkin](schemas/team-checkin.schema.json) | An individual's update to the ground-level loop (intentions, progress, blockers) |
| [goal-story](schemas/goal-story.schema.json) | A big-picture container of work, like a project, campaign, sprint, or OKR |
| [goal-story-update](schemas/goal-story-update.schema.json) | An update from an actor on a goal story (status, progress, and next steps) |
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

[CC BY-SA 4.0](LICENSE)

## Links

- [Continuous Coordination](https://continuouscoordination.org)
- [Steady](https://runsteady.com) - the teamwork OS built on Continuous Coordination
