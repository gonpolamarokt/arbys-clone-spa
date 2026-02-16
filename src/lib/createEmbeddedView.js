const DEFAULT_CONTAINER_ID = 'rokt-placeholder';

async function createEmbeddedView(
  launcher,
  identifier,
  attributes = {},
  containerId = DEFAULT_CONTAINER_ID
) {
  if (!launcher) {
    throw new Error('Rokt launcher is required before selecting placements.');
  }

  if (!identifier) {
    throw new Error('A Rokt placement identifier is required.');
  }

  const selectionResult = await launcher.selectPlacements(identifier, attributes);
  const placement = Array.isArray(selectionResult)
    ? selectionResult[0]
    : selectionResult?.placements?.[0] ?? selectionResult;

  if (!placement) {
    throw new Error(`No placement returned for identifier "${identifier}".`);
  }

  if (typeof placement.createPlacement !== 'function') {
    throw new Error('Returned Rokt placement does not support createPlacement().');
  }

  await placement.createPlacement(containerId);

  return placement;
}

export { createEmbeddedView };
