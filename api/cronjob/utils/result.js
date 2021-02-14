const { isNaN, map, get, isUndefined } = require("lodash")

const getHADResult = ({ home, away }) => {
  const _home = parseInt(home)
  const _away = parseInt(away)

  if (!isNaN(_home) && !isNaN(_away) && _home > -1 && _away > -1) {
    return _home > _away ? 'H' : _away > _home ? 'A' : 'D'
  }
  return null
}

const getHHAResult = ({ odd, home, away }) => {
  const { HG, AG } = {
    HG: parseFloat(odd.HG),
    AG: parseFloat(odd.AG)
  }
  if (!isNaN(HG) && !isNaN(AG)) {
    if (HG < 0) {
      const diff = home - away + HG
      return diff === 0 ? 'D' : diff > 0 ? 'H' : diff < 0 ? 'A' : null
    }
    else if (AG < 0) {
      const diff = away - home + AG
      return diff === 0 ? 'D' : diff > 0 ? 'A' : diff < 0 ? 'H' : null
    }
    else if (HG === AG) {
      const diff = home - away
      return diff === 0 ? 'D' : diff > 0 ? 'H' : diff < 0 ? 'A' : null
    }
  }
  return null
}
const getHDCResult = ({ odd, home, away }) => {
  if (odd.HG && odd.AG) {
    const [HG1, HG2] = map((odd.HG || '').split('/'), parseFloat)
    const [AG1, AG2] = map((odd.AG || '').split('/'), parseFloat)
    if (HG1 === AG1 && (isUndefined(HG2) && isUndefined(AG2) || HG2 === AG2)) {
      // 主讓
      if (HG1 < 0) {
        const diff = home - away + ~~HG1
        return diff === 0 ? 'D' : diff > 0 ? 'H' : diff < 0 ? 'A' : null
      }
      // 客讓
      else if (AG1 < 0) {
        const diff = away - home + ~~ AG1
        return diff === 0 ? 'D' : diff > 0 ? 'A' : diff < 0 ? 'H' : null
      }
      // 平手
      else {
        const diff = home - away
        return diff === 0 ? 'D' : diff > 0 ? 'H' : diff < 0 ? 'A' : null
      }
    }
    // 主讓
    else if (HG1 < 0 || HG2 < 0) {
      const result = [
        getHHAResult({ odd: { HG: HG1, AG: AG1 }, home, away }),
        getHHAResult({ odd: { HG: HG2, AG: AG2 }, home, away }),
      ].join('')
      switch (result) {
        case 'HH': 
          return 'H'
        case 'AA':
          return 'A'
        case 'DA':
          return 'AF'
        case 'HD':
          return 'HF'
        default:
          return null
      }
    }
    // 客讓
    else if (AG1 < 0 || AG2 < 0) {
      const result = [
        getHHAResult({ odd: { HG: HG1, AG: AG2 }, home, away }),
        getHHAResult({ odd: { HG: HG2, AG: AG2 }, home, away }),
      ].join('')
      switch (result) {
        case 'HH': 
          return 'H'
        case 'AA':
          return 'A'
        case 'DH':
          return 'HF'
        case 'AD':
          return 'AF'
        default:
          return null
      }
    }
    else return null
  }
  return null
}

const getLINEResult = ({ count, LINE }) => {
  const _LINE = parseFloat(LINE)
  const c = parseInt(count)
  if (!isNaN(_LINE) && _LINE > -1 && !isNaN(c) && c > -1) {
    return (
      c > LINE ? 'H' :
      c < LINE ? 'L' :
      c === LINE ? 'D' : null
    )    
  }
}

const getCHLResult = ({ odd, corner }) => {
  const LINE = parseFloat(get(odd, 'LINE', -1))
  const count = parseInt(corner)

  if (!isNaN(LINE) && LINE > 0 && !isNaN(count) && count > -1) {
    return getLINEResult({ count, LINE })
  }
  return null
}

const getGoalHLResult = ({ odd, goals }) => {
  const [LINE1, LINE2] = map((odd.LINE || '').split('/'), parseFloat)
  const count = parseInt(goals)
  if (!isNaN(count) && count > -1 && !isNaN(LINE1) && LINE1 > 0) {
    if (isUndefined(LINE2)) {
      return getLINEResult({ count, LINE: LINE1 })
    } else {
      const result = [
        getLINEResult({ count, LINE: LINE1 }),
        getLINEResult({ count, LINE: LINE2 })
      ].join('')
      switch (result) {
        case 'HH':
          return 'H'
        case 'LL':
          return 'L'
        case 'DL':
          return 'LF'
        case 'HD':
          return 'HF'
        default:
          return null
      }
    }
  }
  return null
}

module.exports = {
  getHHAResult,
  getHDCResult,
  getCHLResult,
  getGoalHLResult,
  getHADResult,
}