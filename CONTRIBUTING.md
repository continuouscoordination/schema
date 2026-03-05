# Contributing to Continuous Coordination Schema

Thanks for your interest in improving the Continuous Coordination schemas.

## How to propose a change

1. **Open an issue** describing what you want to change and why
2. **Discuss** -- schema changes affect everyone who implements the spec, so we want to get input before merging
3. **Submit a pull request** with:
   - The schema change
   - Updated examples that validate against the new schema
   - Updated spec.md if the change affects semantics
   - Passing validation tests (`npm test`)

## What makes a good schema change

- **Solves a real problem** -- a tool tried to implement the schema and hit a gap
- **Stays minimal** -- add the least amount of structure needed
- **Backwards compatible** when possible -- new optional fields over breaking changes
- **General purpose** -- useful across industries and team types, not specific to engineering or any single domain

## Breaking changes

Changes to required fields, field types, or removal of fields are breaking changes and require a major version bump. These have a higher bar -- open an issue first so we can discuss alternatives.

## Schema conventions

- Use JSON Schema draft 2020-12
- Use `snake_case` for property names
- Reference other schemas by ID string, not by embedding
- Include a `description` for every property
- Keep `required` fields to the minimum needed for a valid document

## Running tests

```bash
npm install
npm test
```

This validates all examples against their schemas.
