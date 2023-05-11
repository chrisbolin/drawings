// pens.sharpie.oil
// pens.sharpie.oil.colors.all = ["#fa1231", ...]
// pens.sharpie.oil.colors.blue = "#fa1231"
// pens.sharpie.oil.stroke.medium = 0.06 // calipers


function addList(colors) {
  return {
    ...colors,
    all: Object.values(colors)
  };
}

export const sharpieOilColors = addList({
  black: "black",
  white: "white",
  red: "#ad272a",
  limeGreen: "#70aa44",
  aqua: "#5f8fd3",
  orange: "#b56922",
  magenta: "#961e56",
  yellow: "#b2db1e",
});
