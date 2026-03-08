const Ajv = require("ajv/dist/2020");
const addFormats = require("ajv-formats");
const fs = require("fs");
const path = require("path");

const ajv = new Ajv({ strict: true });
addFormats(ajv);

const schemasDir = path.join(__dirname, "..", "schemas");
const examplesDir = path.join(__dirname, "..", "examples");

const pairs = [
  ["person.schema.json", "person.json"],
  ["agent.schema.json", "agent.json"],
  ["team.schema.json", "team.json"],
  ["membership.schema.json", "membership.json"],
  ["team-checkin.schema.json", "team-checkin.json"],
  ["goal-story.schema.json", "goal-story.json"],
  ["goal-story-update.schema.json", "goal-story-update.json"],
  ["coordination-event.schema.json", "coordination-event.json"],
];

let passed = 0;
let failed = 0;

for (const [schemaFile, exampleFile] of pairs) {
  const schema = JSON.parse(
    fs.readFileSync(path.join(schemasDir, schemaFile), "utf8")
  );
  const example = JSON.parse(
    fs.readFileSync(path.join(examplesDir, exampleFile), "utf8")
  );

  const validate = ajv.compile(schema);
  const valid = validate(example);

  if (valid) {
    console.log(`  pass  ${exampleFile} validates against ${schemaFile}`);
    passed++;
  } else {
    console.error(`  FAIL  ${exampleFile} against ${schemaFile}:`);
    for (const err of validate.errors) {
      console.error(`         ${err.instancePath} ${err.message}`);
    }
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
