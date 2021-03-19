import get from "lodash/get";
import { differenceInDays } from "date-fns";
import Vue from "vue";
import toString from "lodash/toString";
import toSafeInteger from "lodash/toSafeInteger";
import last from "lodash/last";
import { map, isUndefined } from "lodash";

import Match from "../graphql/module/match";

const CHLLines = [8.5, 9.5, 10.5, 11.5, 12.5];
const teams = {
  "1225": {
    teamID: "1035",
    teamName: "岡山綠雉",
    rank: "1",
    image: "/images/team/1035"
  },
  "1742": {
    teamID: "1742",
    teamName: "長崎成功丸",
    rank: "2",
    image: "/images/team/1035"
  },
  "1088": {
    teamID: "1088",
    teamName: "東京綠茵",
    rank: "3",
    image: "/images/team/1035"
  },
  "1036": {
    teamID: "1036",
    teamName: "德島漩渦",
    rank: "4",
    image: "/images/team/1035"
  },
  "1089": {
    teamID: "1089",
    teamName: "京都不死鳥",
    rank: "5",
    image: "/images/team/1035"
  },
  "2652": {
    teamID: "2652",
    teamName: "山口雷法",
    rank: "6",
    image: "/images/team/1035"
  },
  "1032": {
    teamID: "1032",
    teamName: "群馬草津溫泉",
    rank: "7",
    image: "/images/team/1035"
  },
  "1037": {
    teamID: "1037",
    teamName: "山形山神",
    rank: "8",
    image: "/images/team/1035"
  },
  "2201": {
    teamID: "2201",
    teamName: "FC琉球",
    rank: "9",
    image: "/images/team/1035"
  },
  "1035": {
    teamID: "1035",
    teamName: "FC愛媛",
    rank: "10",
    image: "/images/team/1035"
  },
  "798": {
    teamID: "798",
    teamName: "福岡黃蜂",
    rank: "11",
    image: "/images/team/1035"
  },
  "1373": {
    teamID: "1373",
    teamName: "北九州向日葵",
    rank: "12",
    image: "/images/team/1035"
  },
  "544": {
    teamID: "544",
    teamName: "千葉市原",
    rank: "13",
    image: "/images/team/1035"
  },
  "540": {
    teamID: "540",
    teamName: "新潟天鵝",
    rank: "14",
    image: "/images/team/1035"
  },
  "1030": {
    teamID: "1030",
    teamName: "水戶蜀葵",
    rank: "15",
    image: "/images/team/1035"
  },
  "1497": {
    teamID: "1497",
    teamName: "町田澤維亞",
    rank: "16",
    image: "/images/team/1035"
  },
  "1180": {
    teamID: "1180",
    teamName: "櫪木SC",
    rank: "17",
    image: "/images/team/1035"
  }
};
const init = ({ id, matchTime, ended = true, home, away }) => {
  const int = toString(id.charCodeAt(0));
  const H = toSafeInteger(int[0]) || 0;
  const A = toSafeInteger(int[1]) || 0;
  const full = {
    home: H > 5 ? Math.floor(H / 2) : H,
    away: A > 5 ? Math.floor(A / 2) : A
  };
  const half = {
    home: Math.floor(full.home / 2),
    away: Math.floor(full.away / 2)
  };

  const nums = id.match(/\d/g);
  const corner = Math.round(~~get(nums, "[0]", 10) * 1.5);
  const CHLLine = CHLLines[Math.floor((nums[1] || 4) / 2)] || 10.5;

  return {
    [id]: {
      id,
      matchTime,
      dateDiff: differenceInDays(new Date(), new Date(matchTime)),
      ended: true,
      result: {
        FT: {
          home: full.home,
          away: full.away
        },
        HT: {
          home: half.home,
          away: half.away
        },
        corner,
        HAD: full.home > full.away ? "H" : full.home < full.away ? "A" : "D",
        CHL: corner > CHLLine ? "H" : "L",
        HIL: full.home + full.away > get(last(odds.HIL), "LINE") ? "H" : "L"
      },
      league: {
        id: "87",
        name: "日本乙組聯賽",
        image: "/images/league/87"
      },
      homeTeam: teams[home],
      awayTeam: teams[away],
      history: {
        home: [],
        away: []
      },
      odds: {
        ...odds,
        CHL: [
          ...odds.CHL,
          {
            H: "1.85",
            L: "1.85",
            LINE: CHLLine,
            time: matchTime
          }
        ]
      }
    }
  };
};

const odds = {
  HAD: [
    {
      H: "2.50",
      D: "2.60",
      A: "3.00",
      time: "2020-08-14T12:58:00+08:00"
    },
    {
      H: "2.45",
      D: "2.58",
      A: "3.06",
      time: "2020-08-16T16:30:00+08:00"
    }
  ],
  FHA: [
    {
      H: "2.80",
      D: "2.30",
      A: "3.00",
      time: "2020-08-14T12:58:00+08:00"
    },
    {
      H: "2.78",
      D: "2.25",
      A: "3.10",
      time: "2020-08-16T16:30:00+08:00"
    }
  ],
  HHA: [
    {
      H: "4.00",
      D: "3.95",
      A: "1.60",
      HG: "-1",
      AG: "+1",
      time: "2020-08-14T12:58:00+08:00"
    }
  ],
  HDC: [
    {
      H: "1.98",
      A: "1.86",
      HG: "+0.0/-0.5",
      AG: "-0.0/+0.5",
      time: "2020-08-14T12:58:00+08:00"
    },
    {
      H: "1.96",
      A: "1.88",
      HG: "+0.0/-0.5",
      AG: "-0.0/+0.5",
      time: "2020-08-14T18:18:00+08:00"
    },
    {
      H: "1.97",
      A: "1.87",
      HG: "+0.0/-0.5",
      AG: "-0.0/+0.5",
      time: "2020-08-14T12:58:00+08:00"
    }
  ],
  HIL: [
    {
      H: "1.76",
      L: "1.94",
      LINE: "3.5",
      time: "2020-08-14T12:58:00+08:00"
    },
    {
      H: "1.80",
      L: "1.90",
      LINE: "3.5",
      time: "2020-08-14T18:58:00+08:00"
    },
    {
      H: "1.90",
      L: "1.80",
      LINE: "3.5",
      time: "2020-08-15T10:02:00+08:00"
    },
    {
      H: "2.00",
      L: "1.72",
      LINE: "3.5",
      time: "2020-08-16T16:30:00+08:00"
    }
  ],
  FHL: [
    {
      H: "2.35",
      L: "1.52",
      LINE: "1.5",
      time: "2020-08-14T12:58:00+08:00"
    },
    {
      H: "2.40",
      L: "1.50",
      LINE: "1.5",
      time: "2020-08-14T18:58:00+08:00"
    },
    {
      H: "2.50",
      L: "1.45",
      LINE: "1.5",
      time: "2020-08-15T10:02:00+08:00"
    },
    {
      H: "2.70",
      L: "1.32",
      LINE: "1.5",
      time: "2020-08-16T16:30:00+08:00"
    }
  ],
  CHL: [
    {
      H: "1.80",
      L: "1.90",
      LINE: "9.5",
      time: "2020-08-14T12:58:00+08:00"
    },
    {
      H: "1.78",
      L: "1.92",
      LINE: "9.5",
      time: "2020-08-14T18:58:00+08:00"
    },
    {
      H: "1.75",
      L: "1.95",
      LINE: "9.5",
      time: "2020-08-15T10:02:00+08:00"
    },
    {
      H: "1.70",
      L: "2.00",
      LINE: "9.5",
      time: "2020-08-16T16:30:00+08:00"
    }
  ],
  OOE: [
    {
      O: "1.9",
      E: "1.8",
      time: "2020-08-16T16:30:00+08:00"
    }
  ]
};
// export const state = {}
export const state = () => ({
  "2c87579b-c8fa-4fc2-abe8-599a7680ed02": {
    id: "2c87579b-c8fa-4fc2-abe8-599a7680ed02",
    matchNum: "1",
    matchDate: "2020-08-16+08:00",
    matchDay: "SUN",
    matchTime: "2020-08-16T17:00:00+08:00",
    ended: false,
    league: {
      id: "87",
      name: "日本乙組聯賽",
      image: "/images/league/87"
    },
    homeTeam: {
      teamID: "1037",
      teamName: "山形山神",
      rank: "16",
      image: "http://zq.win007.com/image/team/images/2013319174431.jpg"
    },
    awayTeam: {
      teamID: "1742",
      teamName: "長崎成功丸",
      rank: "8",
      image: "http://zq.win007.com/image/team/images/2013325134639.jpg"
    },
    odds,
    history: {
      home: [
        "9b3c5c5c-e544-4aa5-b8e4-bf8dbc61d0bc",
        "809d9937-297b-461e-abb6-a5c65c4d5341",
        "f31eb5f1-833b-42fd-a0c7-0de6412678e4",
        "ae76ca8c-7cc4-4571-a983-46a70448e5b0",
        "9642e2b8-cae7-41bc-8be4-11b9d2a67534",
        "a3ed8b94-f949-4a4b-a697-a6f1f0a9e45b",
        "5f23b73f-6f47-4b21-a61d-19cdf0099316",
        "fc3f0f36-e873-4a1d-ad36-060e5449d7a2",
        "d7118372-2827-4eed-8517-ea8a875c45e2",
        "81be6333-7d1a-49cb-b416-e2381a3f6dc7"
      ],
      away: [
        "032c13b4-1be0-4f68-ad2e-7beab2d5cc7b",
        "3bc84982-bb93-41d8-aebd-ffb0f852fc4d",
        "692117ec-e58b-402f-a8a9-669286ef41e3",
        "828fc9f1-dd1c-4bd4-8ccd-78dcbf43e554",
        "be0616b6-4813-4cd8-a93b-d09fcbe5b99d",
        "12638361-4d05-43a8-bc8b-03b463eed97b",
        "2135156e-cf49-4efa-94f8-2b393f420b98",
        "ec238551-899b-4622-91b7-d47e1e74e2fe",
        "d9dd7db2-f51c-447b-a558-1482a69b6375",
        "f41adbdd-12d0-479e-a20b-ece777520d2a"
      ]
    }
  },
  "d258fda1-aa59-4f8d-ade6-13ea43cac3bc": {
    id: "d258fda1-aa59-4f8d-ade6-13ea43cac3bc",
    matchNum: "2",
    matchDate: "2020-08-16+08:00",
    matchDay: "SUN",
    matchTime: "2020-08-16T17:00:00+08:00",
    ended: false,
    league: {
      id: "87",
      name: "日本乙組聯賽",
      image: "/images/league/87"
    },
    homeTeam: {
      teamID: "1180",
      teamName: "櫪木SC",
      rank: "2",
      image: "/images/team/1180"
    },
    awayTeam: {
      teamID: "1035",
      teamName: "FC愛媛",
      rank: "12",
      image: "/images/team/1035"
    },
    odds,
    history: {
      home: ["a93b869d-2a69-4227-b890-93dff1fd0c3a"],
      away: ["9b3c5c5c-e544-4aa5-b8e4-bf8dbc61d0bc"]
    }
  },
  "a93b869d-2a69-4227-b890-93dff1fd0c3a": {
    id: "a93b869d-2a69-4227-b890-93dff1fd0c3a",
    matchNum: "20",
    matchDate: "2020-08-12+08:00",
    matchDay: "WED",
    matchTime: "2020-08-12T18:30:00+08:00",
    ended: true,
    result: {
      FT: {
        home: "2",
        away: "1"
      },
      HT: {
        home: "1",
        away: "1"
      },
      corner: 8,
      CHL: "L",
      HAD: "H"
    },
    league: {
      id: "87",
      name: "日本乙組聯賽",
      image: "/images/league/87"
    },
    homeTeam: {
      teamID: "1180",
      teamName: "櫪木SC",
      rank: "7",
      image: "http://zq.win007.com/image/team/images/2013318130625.jpg"
    },
    awayTeam: {
      teamID: "1225",
      teamName: "岡山綠雉",
      rank: "14",
      image: "http://zq.win007.com/Image/team/images/2013319175026.jpg"
    },
    odds,
    history: {
      home: [],
      away: []
    }
  },
  "9b3c5c5c-e544-4aa5-b8e4-bf8dbc61d0bc": {
    id: "9b3c5c5c-e544-4aa5-b8e4-bf8dbc61d0bc",
    matchNum: "20",
    matchDate: "2020-08-12+08:00",
    matchDay: "WED",
    matchTime: "2020-08-12T18:00:00+08:00",
    ended: true,
    result: {
      FT: {
        home: "0",
        away: "1"
      },
      HT: {
        home: "0",
        away: "1"
      },
      corner: 11,
      HAD: "A",
      CHL: "H"
    },
    league: {
      id: "87",
      name: "日本乙組聯賽",
      image: "/images/league/87"
    },
    homeTeam: {
      teamID: "1035",
      teamName: "FC愛媛",
      rank: "10",
      image: "/images/team/1035"
    },
    awayTeam: {
      teamID: "1037",
      teamName: "山形山神",
      rank: "19",
      image: "/images/team/1037"
    },
    history: {
      home: [],
      away: []
    },
    odds
  },
  "032c13b4-1be0-4f68-ad2e-7beab2d5cc7b": {
    id: "032c13b4-1be0-4f68-ad2e-7beab2d5cc7b",
    matchNum: "18",
    matchDate: "2020-08-12+08:00",
    matchDay: "WED",
    matchTime: "2020-08-12T18:00:00+08:00",
    ended: true,
    result: {
      FT: {
        home: "3",
        away: "1"
      },
      HT: {
        home: "2",
        away: "0"
      },
      corner: 10,
      HAD: "H",
      CHL: "H"
    },
    league: {
      id: "87",
      name: "日本乙組聯賽",
      image: "/images/league/87"
    },
    homeTeam: {
      teamID: "1742",
      teamName: "長崎成功丸",
      rank: "12",
      image: "/images/team/1742"
    },
    awayTeam: {
      teamID: "1037",
      teamName: "群馬草津溫泉",
      rank: "18",
      image: "/images/team/1032"
    },
    odds,
    history: {
      home: [],
      away: []
    }
  },

  ...init({
    id: "692117ec-e58b-402f-a8a9-669286ef41e3",
    matchTime: "2020-08-02T17:00:00+08:00",
    home: "1742",
    away: "1088"
  }),
  ...init({
    id: "3bc84982-bb93-41d8-aebd-ffb0f852fc4d",
    matchTime: "2020-08-08T18:00:00+08:00",
    home: "1036",
    away: "1742"
  }),
  ...init({
    id: "692117ec-e58b-402f-a8a9-669286ef41e3",
    matchTime: "2020-08-02T17:00:00+08:00",
    home: "1742",
    away: "1088"
  }),
  ...init({
    id: "828fc9f1-dd1c-4bd4-8ccd-78dcbf43e554",
    matchTime: "2020-07-29T18:00:00+08:00",
    home: "2652",
    away: "1742"
  }),
  ...init({
    id: "be0616b6-4813-4cd8-a93b-d09fcbe5b99d",
    matchTime: "2020-07-25T18:00:00+08:00",
    home: "1742",
    away: "1089"
  }),
  ...init({
    id: "12638361-4d05-43a8-bc8b-03b463eed97b",
    matchTime: "2020-07-19T18:00:00+08:00",
    home: "1225",
    away: "1742"
  }),
  ...init({
    id: "2135156e-cf49-4efa-94f8-2b393f420b98",
    matchTime: "2020-07-15T18:00:00+08:00",
    home: "2201",
    away: "1742"
  }),
  ...init({
    id: "ec238551-899b-4622-91b7-d47e1e74e2fe",
    matchTime: "2020-07-11T18:00:00+08:00",
    home: "1742",
    away: "1035"
  }),
  ...init({
    id: "d9dd7db2-f51c-447b-a558-1482a69b6375",
    matchTime: "2020-07-04T18:00:00+08:00",
    home: "798",
    away: "1742"
  }),
  ...init({
    id: "f41adbdd-12d0-479e-a20b-ece777520d2a",
    matchTime: "2020-06-27T18:00:00+08:00",
    home: "1742",
    away: "1373"
  }),
  ...init({
    id: "809d9937-297b-461e-abb6-a5c65c4d5341",
    matchTime: "2020-08-08T18:00:00+08:00",
    home: "1037",
    away: "1089"
  }),
  ...init({
    id: "f31eb5f1-833b-42fd-a0c7-0de6412678e4",
    matchTime: "2020-08-02T18:00:00+08:00",
    home: "1036",
    away: "1037"
  }),
  ...init({
    id: "ae76ca8c-7cc4-4571-a983-46a70448e5b0",
    matchTime: "2020-07-29T18:00:00+08:00",
    home: "1037",
    away: "544"
  }),
  ...init({
    id: "9642e2b8-cae7-41bc-8be4-11b9d2a67534",
    matchTime: "2020-07-25T17:00:00+08:00",
    home: "1088",
    away: "1037"
  }),
  ...init({
    id: "a3ed8b94-f949-4a4b-a697-a6f1f0a9e45b",
    matchTime: "2020-07-19T17:00:00+08:00",
    home: "540",
    away: "1037"
  }),
  ...init({
    id: "5f23b73f-6f47-4b21-a61d-19cdf0099316",
    matchTime: "2020-07-15T18:00:00+08:00",
    home: "1037",
    away: "1032"
  }),
  ...init({
    id: "fc3f0f36-e873-4a1d-ad36-060e5449d7a2",
    matchTime: "2020-07-11T18:00:00+08:00",
    home: "1037",
    away: "1030"
  }),
  ...init({
    id: "d7118372-2827-4eed-8517-ea8a875c45e2",
    matchTime: "2020-07-04T18:00:00+08:00",
    home: "1497",
    away: "1037"
  }),
  ...init({
    id: "81be6333-7d1a-49cb-b416-e2381a3f6dc7",
    matchTime: "2020-06-27T18:00:00+08:00",
    home: "1037",
    away: "1180"
  })
});

export const actions = {
  async fetchMatch({ dispatch, commit, state }, { id }) {
    if (isUndefined(state[id])) {
      const match = await Match.fetchMatch({
        clients: this.app.apolloProvider.clients,
        id
      });
      commit("addMatch", match);
      return !isUndefined(match);
    }
    return true;
  }
};

export const mutations = {
  addMatch: (state, match) => {
    const { id } = match || {};
    state[id] = match;
  },
  addMatches: (state, matches) => {
    map(matches, match => {
      const { id } = match || {};
      if (id && isUndefined(state[id])) {
        state[id] = match;
      }
    });
  }
};
