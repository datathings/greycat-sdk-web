# GreyCat web SDK (`@greycat/web`)

The TypeScript SDK of GreyCat (`src/sdk/`) and its `gui-*` web components (`src/web/`),
published as the `sdk_web` GreyCat library. Its usage is documented in the skill it ships,
`skills/SKILL.md`, which a change to the public API keeps up to date.

## Breaking changes go in the core changelog

A change that breaks a user of the SDK, such as a renamed or removed method, a changed type or
default, or a value read differently, gets an entry in `CHANGELOG.md` at the root of the
GreyCat core repository (`hub.datathings.com:greycat/greycat`, next to this one as
`../../greycat/`).

- Write it under the `# version <x.y>` that `VERSION` names, in its `## Breaking changes`
  section, on the core branch of the same name as this one.
- Say what changed and what a user does now, naming the SDK ("The web SDK's ..."), in the style
  of the entries around it.
- A notable feature or fix goes under `## Libraries & SDKs` of the same version.

## Checks

- `npm run build` builds `dist/` and type-checks `src/`.
- `test/run.sh` starts a test server and runs every `test/*.test.js` against the built `dist/`,
  so build first.
- `npx oxlint src test` and `npx oxfmt --check src test` lint and check the format.
