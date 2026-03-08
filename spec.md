# Continuous Coordination Schema Specification

Version: 0.2.0

This document defines the semantics of the Continuous Coordination Schema - what the data means, how the objects relate, and how they map to the two coordination loops described in [Continuous Coordination](https://continuouscoordination.org).

The JSON Schema files define the *shape* of the data. This specification defines the *meaning*.

## Core concepts

### Coordination loops

Continuous Coordination is built on two loops that run at different cadences and scopes:

**Big-Picture Loop** connects plans to progress across teams and people through **goal stories** (projects, campaigns, sprints, OKRs - any container of work) and regular written updates. Typically runs on a weekly, bi-weekly, or monthly cadence.

**Ground-Level Loop** keeps teammates in sync day-to-day through team member check-ins that capture intentions, progress, and blockers. Typically runs daily to weekly.

Both loops are async by default - participants contribute and consume on their own schedule.

### People and teams

A **person** is anyone who participates in a coordination loop.

A **team** is a group of people who coordinate together. Teams are the primary organizational unit. A team has **member_ids** - the people who belong to it.

## Ground-Level Loop

### Team check-in

A team check-in is an individual's daily async update to their team. It contains:

- **person_id** - The person who provided the check-in and for whom the check-in is for.
- **team_id** - The team the check-in is for.
- **next** - What the person intends to work on. Communicating intent is what shifts a team from reactive to proactive. It gives leaders the opportunity to course-correct early, and gives peers the context to coordinate without interrupting each other.
- **previously** - What the person accomplished since their last team check-in. This is the progress signal - visible proof of forward motion, shared in the open.
- **blockers** - Anything preventing forward progress. Surfacing blockers early is how teams prevent small issues from becoming expensive problems.

## Big-Picture Loop

### Goal story

A goal story is a container of work that any combination of teams and people are involved with, like a project, a campaign, sprint, or OKR. Goal stories are the structural backbone of the big-picture loop.

Key properties:

- **title** - The title of the goal story
- **description** - The "why." Context about what this goal story is and why it matters. This is what enables autonomous teams - when people understand intent, they can make good decisions without being told what to do.
- **person_ids** - People involved with this goal story.
- **team_ids** - The teams involved with this goal story, through either direct participation or dependencies.
- **parent_id** - Goal stories can nest. A company-level objective contains team-level goal stories, which may contain individual key results. This hierarchy connects daily work to organizational strategy.

### Goal story update

A goal story update is a written narrative about where a goal story stands. It's the recurring signal in the big-picture loop - the equivalent of a team check-in, but for goal stories instead of people.

Goal story updates are intentionally narrative, not just status fields. Writing forces clarity. A status of "at risk" tells you something is wrong; a written update tells you *what* is wrong, *why*, and *what's being done about it*. This is the "write it down" principle in action.

Key properties:

- **person_id** - The person who provided the update.
- **goal_story_id** - The goal story this update is for.
- **title** - A short headline for the update. The essential takeaway in one line.
- **content** - The written update. Rich, contextual, human-authored narrative.
- **next_steps** (optional) - What's coming next: planned actions, open questions, or decisions needed.
- **status** - Goal story status as of this update. Status on the update (not just the goal story) creates a history of how status changed over time.
- **progress_percent** (optional) - A numeric indicator. Useful for dashboards and rollups, but the narrative content is the primary signal.

## Coordination events

A **coordination event** records the moment a person provides input to either loop - submitting a team check-in or publishing a goal story update. It connects a person, an event type, and a reference to the object that was created.

Coordination events make participation observable. They answer "who contributed, when, and to which loop?" without requiring consumers to query across team check-ins and goal story updates separately.

Key properties:

- **person_id** - The person who provided input.
- **event_type** - The type of input: `team_checkin` or `goal_story_update`.
- **reference_id** - The ID of the team check-in or goal story update that was submitted.
- **occurred_at** - When the event happened.

## Relationships

```
team --has--> team-checkin (one-to-many)
person --belongs to--> team (many-to-many, via member_ids)
person --provides--> team-checkin (one-to-many)

team --is involved with--> goal-story (many-to-many, via team_ids)
person --is involved with--> goal-story (many-to-many, via person_ids)
goal-story --has parent--> goal-story (self-referential, optional)
goal-story --has--> goal-story-update (one-to-many)
person --provides--> goal-story-update (one-to-many)

coordination-event --references--> team-checkin | goal-story-update (one-to-one)
```

## Design principles

1. **Minimal required fields** - Only require what's necessary for a valid document. Everything else is optional. Different tools and teams have different needs.
2. **References by ID** - Objects reference each other by ID, not by embedding. This keeps schemas independent and composable.
4. **Tool-agnostic** - These schemas define data shapes, not APIs, storage formats, or UI. Any tool can implement them however it wants.
5. **Domain-agnostic** - The schemas work for engineering teams, marketing teams, sales teams, or any knowledge work team. No field or concept is specific to a single domain.
