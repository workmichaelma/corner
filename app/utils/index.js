const getTeamResultColor = result => {
  switch (result) {
    case "羸":
      return "red--text accent-1";
    case "輸":
      return "green--text accent-1";
    default:
      return "blue--text accent-1";
  }
};

module.exports = {
  getTeamResultColor,
  getHADResultStyle(HAD, result) {
    return HAD === result ? "text-decoration-underline lime--text" : "";
  },
  getHADResultString(HAD, result) {
    if (result === "D") return "和";
    if (HAD === "H") {
      return result === "H" ? "羸" : "輸";
    }
    if (HAD === "A") {
      return result === "H" ? "輸" : "羸";
    }
  },
  getTeamResultcolorBySide(HAD, side, sideId, id) {
    let color = "";
    if (sideId === id) {
      if (HAD === "D") return "light-blue--text darken-1";
      if (HAD === "H") {
        color = side === "home" ? "羸" : "輸";
      }
      if (HAD === "A") {
        color = side === "away" ? "羸" : "輸";
      }
    }
    return color !== "" ? getTeamResultColor(color) : "";
  }
};
