export function getIndexes(url = location.href) {
  const hash = url.split('#')[1] || '';
  
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

export function listen(callback) {
  addEventListener("hashchange", (event) => {
    const indexes = getIndexes(event.newURL);
    if (indexes) callback(indexes);
  });
}
