// The world calls run in main, since they concern every world and the instance's own world
// may be the one just removed.

/** The worlds `greycat` may use, by creation order, main excluded. */
export function listWorlds(greycat: gc.sdk.GreyCat): Promise<gc.runtime.WorldInfo[]> {
  return greycat.rawCall('runtime::World::list', [], undefined, false, 'POST', 'main');
}

/**
 * Creates the world `name` from `base` (`null` for main, and for a standalone world), and
 * returns its id. Needs the `world` permission.
 */
export function createWorld(
  greycat: gc.sdk.GreyCat,
  name: string,
  mode: gc.runtime.WorldMode,
  base: string | null,
): Promise<number | bigint> {
  return greycat.rawCall('runtime::World::create', [name, mode, base], undefined, false, 'POST', 'main');
}

/** Removes the world `name`. Needs the `world` permission, and to be its creator or an admin. */
export async function removeWorld(greycat: gc.sdk.GreyCat, name: string): Promise<void> {
  await greycat.rawCall('runtime::World::remove', [name], undefined, false, 'POST', 'main');
  if (greycat.world === name) {
    greycat.world = undefined;
  }
}
