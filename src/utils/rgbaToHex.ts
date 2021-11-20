function trim(str: string) {
  return str.replace(/^\s+|\s+$/gm, "");
}

export function rgbaToHex(rgba: string) {
  var inParts = rgba.substring(rgba.indexOf("(")).split(","),
    r = parseInt(trim(inParts[0].substring(1)), 10),
    g = parseInt(trim(inParts[1]), 10),
    b = parseInt(trim(inParts[2]), 10),
    a = parseFloat(
      trim(inParts[3].substring(0, inParts[3].length - 1))
    ).toFixed(2);
  var outParts = [
    r.toString(16),
    g.toString(16),
    b.toString(16),
    Math.round((a as any) * 255)
      .toString(16)
      .substring(0, 2),
  ];

  outParts.forEach(function (part, i) {
    if (part.length === 1) {
      outParts[i] = "0" + part;
    }
  });

  return "#" + outParts.join("");
}
