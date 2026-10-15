import { json } from "https://esm.sh/d3-fetch";
import { select } from "https://esm.sh/d3-selection";

const data = await json(
  "https://dannyvo23.github.io/nba-box-score-analysis/games.json"
);

const games = data.slice(0, 10);

const svg = select("svg");
svg.selectAll("*").remove();

svg.append("text")
  .attr("x", 20)
  .attr("y", 30)
  .style("font-size", "22px")
  .text("NBA Rebounds: Home (blue) vs Away (orange)");

svg.append("text")
  .attr("x", 20)
  .attr("y", 55)
  .text("First 10 game records. Date color: green = home win, red = home loss.");

svg.selectAll(".home")
  .data(games)
  .join("rect")
  .attr("class", "home")
  .attr("x", (d, i) => 30 + i * 120)
  .attr("y", d => 400 - d.REB_home * 5)
  .attr("width", 28)
  .attr("height", d => d.REB_home * 5)
  .style("fill", "steelblue");

svg.selectAll(".away")
  .data(games)
  .join("rect")
  .attr("class", "away")
  .attr("x", (d, i) => 62 + i * 120)
  .attr("y", d => 400 - d.REB_away * 5)
  .attr("width", 28)
  .attr("height", d => d.REB_away * 5)
  .style("fill", "orange");

svg.selectAll(".date")
  .data(games)
  .join("text")
  .attr("class", "date")
  .attr("x", (d, i) => 60 + i * 120)
  .attr("y", 425)
  .attr("text-anchor", "middle")
  .style("font-size", "12px")
  .style("fill", d => d.HOME_TEAM_WINS == 1 ? "green" : "red")
  .text(d => d.GAME_DATE_EST);