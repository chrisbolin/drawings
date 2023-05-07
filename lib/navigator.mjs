function getHash(href) {
  if (!href) return false;
  return href.split('#')[1] || '';
}

export function getIndexes(href = location.href) {
  const hash = getHash(href);
  
  const [drawingIndex, variantIndex] = hash.split('/');
  if (!drawingIndex || !variantIndex) return false;

  return {
    drawingIndex: parseInt(drawingIndex),
    variantIndex: parseInt(variantIndex),
  };
}

export function getUrl({drawingIndex, variantIndex = 0}) {
  return `#${drawingIndex}/${variantIndex}`;
}

export function isCurrentLocation(href) {
  return getHash(href) === getHash(location.href);
}

export function listen(callback) {
  addEventListener("hashchange", (event) => {
    const indexes = getIndexes(event.newURL);
    if (indexes) callback(indexes);
  });
}
