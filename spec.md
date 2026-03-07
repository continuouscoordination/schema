# Continuous Coordination Schema Specification

Version: 2.0.0

This document defines the semantics of the Continuous Coordination Schema -- what the data means, how the objects relate, and how they map to the two coordination loops described in [Continuous Coordination](https://continuouscoordination.org).

The JSON Schema files define the *shape* of the data. This specification defines the *meaning*.

## Core concepts

### Coordination loops

Continuous Coordination is built on two loops that run at different cadences and scopes:

**Ground-Level Loop** runs daily or weekly within a team. Team members and agents share what they plan to do (intentions), what they've done (progress), and what's in the way (blockers). The data objects are **check-ins**.

**Big-Picture Loop** runs weekly, bi-weekly, or monthly across teams. Goal owners or contributors share written narrative updates on progress, status, and risks. The data objects are **goals** and **goal updates**.

Both loops are async by default -- participants contribute and consume on their own schedule.

### People, agents, and teams

A **person** is anyone who participates in a coordination loop. A person can belong to multiple teams.

An **agent** is an AI agent that participates in one or more coordination loops alongside people. Agents can be members of teams, perform check-ins, contribute to goals, and provide goal updates. Like people, agents can belong to multiple teams.

A **team** is a group of people and agents who coordinate together. Teams are the primary organizational unit -- both loops operate at the team level.

## Ground-Level Loop

### Check-in

A check-in is an individual's daily async update to their team. It contains:

- **next** -- What the person or agent _intends_ to work on. Communicating intent is what shifts a team from reactive to proactive. It gives leaders the opportunity to course-correct early, and gives peers the context to coordinate without interrupting each other.
- **previously** -- What the person or agent accomplished since their last check-in. This is the progress signal -- visible proof of forward motion, shared in the open.
- **blockers** -- Anything preventing forward progress. Surfacing blockers early is how teams prevent small issues from becoming expensive problems.

A check-in belongs to one actor (a person or an agent) and one team. The `actor_id` and `actor_type` fields identify who the check-in is for. An actor who is on multiple teams submits separate check-ins for each.

### Cadence

The ground-level loop runs daily or weekly. Teams configure their own schedules -- which days, what time reminders go out, timezone handling, holidays.

## Big-Picture Loop

### Goal

A goal is something a team or organization is working toward -- a project, an OKR, a sprint, an initiative. Goals are the structural backbone of the big-picture loop.

Key properties:

- **title** -- The title of the goal
- **description** -- The "why." Context about what this goal is and why it matters. This is what enables autonomous teams -- when people understand intent, they can make good decisions without being told what to do.
- **parent_id** -- Goals can nest. A company-level objective contains team-level goals, which may contain individual key results. This hierarchy connects daily work to organizational strategy.

### Goal update

A goal update is a written narrative about where a goal stands. It's the recurring signal in the big-picture loop -- the equivalent of a check-in, but for goals instead of people.

Goal updates are intentionally narrative, not just status fields. Writing forces clarity. A status of "at risk" tells you something is wrong; a written update tells you *what* is wrong, *why*, and *what's being done about it*. This is the "write it down" principle in action.

Key properties:

- **title** -- A short headline for the update. The essential takeaway in one line.
- **content** -- The written update. Rich, contextual, human-authored narrative.
- **next_steps** (optional) -- What's coming next: planned actions, open questions, or decisions needed.
- **status** -- Goal status as of this update. Status on the update (not just the goal) creates a history of how status changed over time.
- **progress_percent** (optional) -- A numeric indicator. Useful for dashboards and rollups, but the narrative content is the primary signal.

### Cadence

The big-picture loop runs on a longer cycle -- weekly, bi-weekly, or monthly depending on the goal and organization. Goal owners receive reminders on their configured schedule.

## Relationships

```
person --belongs to--> team (many-to-many)
agent --belongs to--> team (many-to-many)
person|agent --provides--> checkin (one-to-many)
checkin --belongs to--> team (many-to-one)
person --owns--> goal (one-to-many)
person --contributes to--> goal (many-to-many)
agent --contributes to--> goal (many-to-many)
team --works on--> goal (many-to-many)
goal --has parent--> goal (self-referential, optional)
goal --has--> goal-update (one-to-many)
person|agent --provides--> goal-update (one-to-many)
```

## Design principles

1. **Minimal required fields** -- Only require what's necessary for a valid document. Everything else is optional. Different tools and teams have different needs.
2. **References by ID** -- Objects reference each other by ID, not by embedding. This keeps schemas independent and composable.
4. **Tool-agnostic** -- These schemas define data shapes, not APIs, storage formats, or UI. Any tool can implement them however it wants.
5. **Domain-agnostic** -- The schemas work for engineering teams, marketing teams, sales teams, or any knowledge work team. No field or concept is specific to a single domain.
6. **Actor, not implementation** -- The schema captures *who* a check-in or goal update is for (the actor), not *how* it was produced. An AI assistant helping a person draft their check-in is an implementation detail -- the actor is still the person. An agent checking in as itself is a different actor entirely. This distinction keeps the data model clean and leaves tooling decisions to implementers.

