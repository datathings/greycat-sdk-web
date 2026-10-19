# Bumping std

The std version is pinned in `project.gcl` (`@library("std", "<version>")`). The latest
dev build of the current branch is published at `https://get.greycat.io/files/core/dev/latest`.

Every std bump regenerates the TypeScript declarations, committed with the bump:

```sh
pnpm gen        # installs the new std, regenerates std.d.ts
pnpm gen:test   # regenerates test/project.d.ts
```

Then validate the bump:

```sh
pnpm build && pnpm lint
pnpm prepare:test && pnpm test
```
