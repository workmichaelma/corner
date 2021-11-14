const axios = require("axios");
const axiosRetry = require("axios-retry");
const cheerio = require("cheerio");
const take = require("lodash/take");

axiosRetry(axios, { reties: 5 });
// const url = id => `http://live.win007.com/detail/${id}.htm`

const url = (id) => `http://zq.win007.com/analysis/${id}.htm`;

const fetchMatch = async (id) => {
  console.log(url(id));
  return axios
    .get(url(id), {
      headers: {
        Host: "zq.win007.com",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15",
        Referer: "http://www.win007.com/?from=m",
      },
    })
    .then(({ data }) => {
      let result = {
        future: {
          home: [],
          away: [],
        },
      };
      try {
        const $ = cheerio.load(data.replace(/(\r\n|\n|\r)/gm, " "));

        /* 賽程 */
        const futureTables = $("#porlet_20 table > tbody tr td table");
        $(futureTables).map((i, el) => {
          const team = $(el);
          const side = i === 0 ? "home" : "away";
          result.future[side] = team
            .find("tr[align=middle]")
            .map((_, row) => {
              const tds = $(row).find("td");
              return {
                date: tds.eq(0).text(),
                league: tds.eq(1).text(),
                teams: (tds.eq(2).text() || "").trim(),
                daysAfter: (tds.eq(5).text() || "").trim(),
              };
            })
            .get();
        });
        /* 賽程 */

        /* 往積 */
        const webmain = $("#webmain > script").eq(0).contents().text();
        eval(webmain);
        result.against = take(v_data, 10).map((d) => {
          const $homeTeam = cheerio.load(d[5]);
          const $awayTeam = cheerio.load(d[7]);

          const homeTeam = $homeTeam("span");
          const awayTeam = $awayTeam("span");

          return {
            date: d[0],
            league: {
              name: d[2],
            },
            homeTeam: {
              teamName: homeTeam.contents().text(),
              rank: (homeTeam.attr("title") || "").trim().replace("排名：", ""),
            },
            awayTeam: {
              teamName: awayTeam.contents().text(),
              rank: (awayTeam.attr("title") || "").trim().replace("排名：", ""),
            },
            result: {
              HT: {
                home: parseInt(d[10].split("-")[0]),
                away: parseInt(d[10].split("-")[1]),
              },
              FT: {
                home: d[8],
                away: d[9],
              },
              corner: {
                full: {
                  home: parseInt(d[16]),
                  away: parseInt(d[17]),
                  total: parseInt(d[16]) + parseInt(d[17]),
                },
              },
              HAD: d[8] > d[9] ? "H" : d[9] > d[8] ? "A" : "D",
            },
          };
        });
        /* 往積 */
      } catch (err) {
        console.log(err);
      }

      return result;
    });
};

const init = async (id) => {
  try {
    const result = await fetchMatch(id);
    return result;
  } catch (err) {
    console.log("win.result.js init() error");
    return {};
  }
};

module.exports = {
  init,
};
