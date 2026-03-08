# Continuous Coordination Schema Specification

Version: 1.0.0

This document defines the semantics of the Continuous Coordination Schema - what the data means, how the objects relate, and how they map to the two coordination loops described in [Continuous Coordination](https://continuouscoordination.org).

The JSON Schema files define the *shape* of the data. This specification defines the *meaning*.

## Core concepts

### Coordination loops

Continuous Coordination is built on two loops that run at different cadences and scopes:

**Ground-Level Loop** runs daily or weekly within a team. Team members share what they plan to do (intentions), what they've done (progress), and what's in the way (blockers). The data objects are **team check-ins**.

**Big-Picture Loop** runs weekly, bi-weekly, or monthly across teams. Goal story owners or contributors share written narrative updates on progress, status, and next steps. The data objects are **goal stories** and **goal story updates**.

Both loops are async by default - participants contribute and consume on their own schedule.

### Actors: people and agents

An **actor** a participant in a coordination loop. There are two types of actors:

A **person** is a human participant.

An **agent** is an autonomous AI participant that provides input to a coordination loop. Agents can belong to teams, submit team check-ins, and author goal story updates.

All schemas that reference participants use `actor_id` and `actor_type` to identify the actor and distinguish between people and agents.

### Teams and memberships

A **team** is a group of actors who coordinate together. Teams are the primary organizational unit - both loops operate at the team level.

A **membership** connects an actor to a team. It is the source of truth for who belongs to which team. An actor can have memberships in multiple teams. Memberships can carry per-team attributes like role and team check-in cadence.

## Ground-Level Loop

### Team check-in

A team check-in is an actor's async update to their team. It contains:

- **next** - What the actor intends to work on. Communicating intent is what shifts a team from reactive to proactive. It gives leaders the opportunity to course-correct early, and gives peers the context to coordinate without interrupting each other.
- **previously** - What the actor accomplished since their last team check-in. This is the progress signal - visible proof of forward motion, shared in the open.
- **blockers** - Anything preventing forward progress. Surfacing blockers early is how teams prevent small issues from becoming expensive problems.

A team check-in is associated with one or more memberships. Each membership encodes both the actor and the team, so the team check-in inherits both relationships. This ensures an actor can only check in to teams they belong to. When work spans teams, a single team check-in can reference multiple memberships rather than requiring duplicates.

### Suggested cadence

The ground-level loop should run daily to weekly.

## Big-Picture Loop

### Goal story

A goal story is something a team or organization is working toward - a project, an OKR, a sprint, an initiative. Goal stories are the structural backbone of the big-picture loop.

Key properties:

- **title** - The title of the goal story
- **description** - The "why." Context about what this goal story is and why it matters. This is what enables autonomous teams - when people understand intent, they can make good decisions without being told what to do.
- **owner_id** - The person responsible for this goal story. Ownership is always a person - accountability can't be delegated to an agent.
- **contributors** - Actors (people or agents) involved with this goal story. Each contributor is an object with `actor_id` and `actor_type`.
- **parent_id** - Goal stories can nest. A company-level objective contains team-level goal stories, which may contain individual key results. This hierarchy connects daily work to organizational strategy.

### Goal story update

A goal story update is a written narrative about where a goal story stands. It's the recurring signal in the big-picture loop - the equivalent of a team check-in, but for goal stories instead of people.

Goal story updates are intentionally narrative, not just status fields. Writing forces clarity. A status of "at risk" tells you something is wrong; a written update tells you *what* is wrong, *why*, and *what's being done about it*. This is the "write it down" principle in action.

Key properties:

- **title** - A short headline for the update. The essential takeaway in one line.
- **content** - The written update. Rich, contextual, human-authored or agent-authored narrative.
- **next_steps** (optional) - What's coming next: planned actions, open questions, or decisions needed.
- **status** - Goal story status as of this update. Status on the update (not just the goal story) creates a history of how status changed over time.
- **progress_percent** (optional) - A numeric indicator. Useful for dashboards and rollups, but the narrative content is the primary signal.

### Suggested cadence

The big-picture loop runs on a longer cycle - weekly, bi-weekly, or monthly depending on the goal story and organization.

## Coordination events

A **coordination event** records the moment an actor provides input to either loop - submitting a team check-in or publishing a goal story update. It connects an actor, an event type, and a reference to the object that was created.

Coordination events make participation observable. They answer "who contributed, when, and to which loop?" without requiring consumers to query across team check-ins and goal story updates separately.

Key properties:

- **actor_id** / **actor_type** - The actor (person or agent) who provided input.
- **event_type** - The type of input: `team_checkin` or `goal_story_update`.
- **reference_id** - The ID of the team check-in or goal story update that was submitted.
- **occurred_at** - When the event happened.

## Relationships

```
person --is an--> actor
agent --is an--> actor
actor --has--> membership (one-to-many)
membership --belongs to--> team (many-to-one)
team-checkin --belongs to--> membership (many-to-many, via membership_ids)
person --owns--> goal-story (one-to-many, via owner_id)
actor --contributes to--> goal-story (many-to-many, via contributors)
team --is involved with--> goal-story (many-to-many)
goal-story --has parent--> goal-story (self-referential, optional)
goal-story --has--> goal-story-update (one-to-many)
actor --authors--> goal-story-update (one-to-many)
coordination-event --references--> team-checkin | goal-story-update (one-to-one)
actor --triggers--> coordination-event (one-to-many)
```

## Design principles

1. **Minimal required fields** - Only require what's necessary for a valid document. Everything else is optional. Different tools and teams have different needs.
2. **References by ID** - Objects reference each other by ID, not by embedding. This keeps schemas independent and composable.
4. **Tool-agnostic** - These schemas define data shapes, not APIs, storage formats, or UI. Any tool can implement them however it wants.
5. **Domain-agnostic** - The schemas work for engineering teams, marketing teams, sales teams, or any knowledge work team. No field or concept is specific to a single domain.
6. **Actor, not implementation** - The schema captures *who* a check-in or goal story update is for (the actor), not *how* it was produced. An AI assistant helping a person draft their check-in is an implementation detail. The actor is still the person. An agent providing an update as itself on it's own autonomous work is a different actor entirely.
