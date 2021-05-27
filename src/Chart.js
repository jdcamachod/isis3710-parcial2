import React, { useEffect } from "react";
import * as d3 from "d3";

function Chart(props) {
  useEffect(() => {
    const series = props.series;
    const language = window.navigator.language || navigator.browserLanguage;
    const axisXLabel =
      language === "es-Es" || language === "es" ? "Episodios" : "Episodes";
    const axisYLabel =
      language === "es-Es" || language === "es" ? "Temporadas" : "Seasons";
    const margin = { top: 20, right: 30, bottom: 100, left: 100 },
      width = (2 * window.innerWidth) / 3 - margin.left - margin.right,
      height = (2 * window.innerHeight) / 3 - margin.top - margin.bottom;
    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear().domain([0, 350]).range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", width / 2 + margin.left)
      .attr("y", height + margin.top + 20)
      .text(axisXLabel);

    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 50)
      .attr("x", -margin.top - height / 2 + 20)
      .text(axisYLabel);

    const y = d3.scaleLinear().domain([0, 20]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("g")
      .selectAll("dot")
      .data(series)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.episodes);
      })
      .attr("cy", function (d) {
        return y(d.seasons);
      })
      .attr("r", 5.5)
      .style("fill", "orange");

    svg
      .append("g")
      .selectAll("dot")
      .data(series)
      .enter()
      .append("text")
      .text((d) => d.name)
      .attr("x", function (d) {
        return x(d.episodes) + 8;
      })
      .attr("y", function (d) {
        return y(d.seasons) + 4;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id={"#" + props.id}></div>;
}

export default Chart;
