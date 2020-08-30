const axios = require('axios')
const find = require('lodash/find')
const moment = require('moment')

class Match {
  constructor(obj) {
    this.id = obj.matchID
    this.num = obj.matchNum
    this.day = obj.matchDay
    this.league = {
      id: obj.league.leagueID,
      name: obj.league.leagueNameCH
    }
    this.home = {
      id: obj.homeTeam.teamID,
      name: obj.homeTeam.teamNameCH
    }
    this.away = {
      id: obj.awayTeam.teamID,
      name: obj.awayTeam.teamNameCH
    }
    const dt = moment(obj.matchTime).utcOffset(8)
    this.date = dt.format('DD-MM-YYYY')
    this.time = dt.format('HH:mm')
    this.datetime = dt.format()
  }
}

module.exports = {
  init: async () => {
    try {
      // return JSON.parse(`
      // [{"id":"46a8e9cb-b48a-4f4b-87b6-a24440236e12","num":"1","day":"MON","league":{"id":"54","name":"德國乙組聯賽"},"home":{"id":"418","name":"卡爾斯魯厄"},"away":{"id":"524","name":"奧厄"},"date":"12-11-2019","time":"03:30","datetime":"2019-11-12T03:30:00+08:00"},{"id":"a4357cc6-a6f8-435d-8ac6-e245b235b3f0","num":"2","day":"MON","league":{"id":"5","name":"英格蘭足總盃"},"home":{"id":"744","name":"哈洛格特"},"away":{"id":"16","name":"樸茨茅夫"},"date":"12-11-2019","time":"03:45","datetime":"2019-11-12T03:45:00+08:00"},{"id":"d8f9972e-7391-4b6e-99ff-d7a1ddabd2c2","num":"3","day":"MON","league":{"id":"103","name":"法國乙組聯賽"},"home":{"id":"507","name":"羅德茲"},"away":{"id":"86","name":"朗斯"},"date":"12-11-2019","time":"03:45","datetime":"2019-11-12T03:45:00+08:00"},{"id":"c9015a42-0f44-4591-9a69-cd7f20b665ae","num":"4","day":"MON","league":{"id":"56","name":"巴西甲組聯賽"},"home":{"id":"561","name":"保地花高"},"away":{"id":"1245","name":"艾華爾"},"date":"12-11-2019","time":"07:00","datetime":"2019-11-12T07:00:00+08:00"},{"id":"a3fefbf1-4de9-479b-b939-28d34d778c71","num":"1","day":"TUE","league":{"id":"99","name":"英格蘭聯賽錦標"},"home":{"id":"191","name":"華素爾"},"away":{"id":"1056","name":"格連森林"},"date":"13-11-2019","time":"03:00","datetime":"2019-11-13T03:00:00+08:00"},{"id":"e437308d-0292-4ee9-a8a2-f178fea4c648","num":"2","day":"TUE","league":{"id":"99","name":"英格蘭聯賽錦標"},"home":{"id":"192","name":"巴拉福特"},"away":{"id":"519","name":"羅奇代爾"},"date":"13-11-2019","time":"03:30","datetime":"2019-11-13T03:30:00+08:00"},{"id":"98c0403d-7714-4418-88f9-a2b4934ef4b1","num":"3","day":"TUE","league":{"id":"99","name":"英格蘭聯賽錦標"},"home":{"id":"276","name":"高車士打"},"away":{"id":"197","name":"葉士域治"},"date":"13-11-2019","time":"03:30","datetime":"2019-11-13T03:30:00+08:00"},{"id":"db3e7acd-7f2a-48de-bb85-db92db9e6c21","num":"4","day":"TUE","league":{"id":"99","name":"英格蘭聯賽錦標"},"home":{"id":"273","name":"彼德堡"},"away":{"id":"681","name":"劍橋聯"},"date":"13-11-2019","time":"03:30","datetime":"2019-11-13T03:30:00+08:00"},{"id":"efe669ac-62af-4cf2-acbd-5deb12518879","num":"5","day":"TUE","league":{"id":"99","name":"英格蘭聯賽錦標"},"home":{"id":"747","name":"伯頓"},"away":{"id":"271","name":"曼斯菲"},"date":"13-11-2019","time":"03:45","datetime":"2019-11-13T03:45:00+08:00"},{"id":"b3a355c7-fb50-4dbd-aa64-59b53b93b63d","num":"6","day":"TUE","league":{"id":"99","name":"英格蘭聯賽錦標"},"home":{"id":"1535","name":"卡維尼"},"away":{"id":"705","name":"牛津聯"},"date":"13-11-2019","time":"03:45","datetime":"2019-11-13T03:45:00+08:00"},{"id":"a2db39a8-e8aa-4713-9f74-6dfd76cf60a7","num":"7","day":"TUE","league":{"id":"99","name":"英格蘭聯賽錦標"},"home":{"id":"426","name":"林肯城"},"away":{"id":"203","name":"洛達咸"},"date":"13-11-2019","time":"03:45","datetime":"2019-11-13T03:45:00+08:00"},{"id":"98128aac-ec85-45ef-a0bf-6948808d5ce4","num":"8","day":"TUE","league":{"id":"99","name":"英格蘭聯賽錦標"},"home":{"id":"432","name":"米爾頓凱恩斯"},"away":{"id":"181","name":"韋甘比"},"date":"13-11-2019","time":"03:45","datetime":"2019-11-13T03:45:00+08:00"},{"id":"00dca499-2946-45b9-b4fb-ab41fff18fcd","num":"9","day":"TUE","league":{"id":"99","name":"英格蘭聯賽錦標"},"home":{"id":"275","name":"斯肯索普"},"away":{"id":"188","name":"新特蘭"},"date":"13-11-2019","time":"03:45","datetime":"2019-11-13T03:45:00+08:00"},{"id":"7d26952c-7110-416c-bb25-c517025d876e","num":"7","day":"WED","league":{"id":"99","name":"英格蘭聯賽錦標"},"home":{"id":"429","name":"布里斯托流浪"},"away":{"id":"182","name":"史雲頓"},"date":"14-11-2019","time":"03:45","datetime":"2019-11-14T03:45:00+08:00"},{"id":"c2abc7dc-0b43-43f6-abf7-8bcc438af686","num":"8","day":"WED","league":{"id":"99","name":"英格蘭聯賽錦標"},"home":{"id":"1188","name":"費列活特"},"away":{"id":"425","name":"奧咸"},"date":"14-11-2019","time":"03:45","datetime":"2019-11-14T03:45:00+08:00"},{"id":"70f0a5fa-cd95-4a32-b881-3d4dd3825771","num":"9","day":"WED","league":{"id":"99","name":"英格蘭聯賽錦標"},"home":{"id":"270","name":"修安聯"},"away":{"id":"1183","name":"AFC 溫布頓"},"date":"14-11-2019","time":"03:45","datetime":"2019-11-14T03:45:00+08:00"}]`)
      const url = `https://bet.hkjc.com/football/getJSON.aspx?jsontype=odds_had.aspx`
      const schedule = await axios.get(url).then(res => {
        const data = res.data
        const active = data ? find(data, { name: 'ActiveMatches' }) : false
        if (data && active && active.matches) {
          return active.matches.map(m => {
            return new Match(m)
          }).filter(m => {
            // Do not return LIVE matches
            return moment(m.datetime) > moment()
          })
        } else {
          return []
        }
      })
      return schedule
    } catch (err) {
      console.log(err)
      return []
    }
  }
}