import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import vowels from "../constants/vowels";

// eslint-disable-next-line react/prop-types
const VowelFormants = ({ formants, korean, size = "big" }) => {
  const svgRef = useRef(null);

  let width, height;

  if (size == "big") {
    width = 800;
    height = 600;
  } else if (size == "small") {
    width = 333;
    height = 250;
  }
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    if (korean) {
      const F1KoreanData = [700, 530, 470, 350, 370, 300, 580];
      const F2KoreanData = [1230, 1840, 840, 1020, 1300, 2200, 2200];

      svg.selectAll(".dot-korean").remove();
      svg.selectAll(".text-korean").remove();

      svg
        .selectAll(".dot-korean")
        .data(F1KoreanData)
        .enter()
        .append("circle")
        .attr("class", "dot-korean")
        .attr("r", 5)
        .attr("cx", (d, i) => xScale(F2KoreanData[i]))
        .attr("cy", (d, i) => yScale(F1KoreanData[i]))
        .style("fill", "red");

      svg
        .selectAll(".text-korean")
        .data(vowels)
        .enter()
        .append("text")
        .attr("class", "text-korean")
        .attr("x", (d, i) => xScale(F2KoreanData[i]))
        .attr("y", (d, i) => yScale(F1KoreanData[i]) - 10)
        .attr("text-anchor", "middle")
        .text((d) => d);
    } else {
      svg.selectAll(".dot-korean").remove();
      svg.selectAll(".text-korean").remove();
    }
  }, [korean, formants]);

  const F1 = Object.values(formants).map((item) => item.f1);
  const F2 = Object.values(formants).map((item) => item.f2);

  const margin = { top: 20, right: 20, bottom: 50, left: 50 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear().domain([3000, 500]).range([0, innerWidth]);

  const yScale = d3.scaleLinear().domain([1000, 200]).range([innerHeight, 0]);

  return (
    <svg
      ref={svgRef}
      id="plot"
      className="max-w-full max-h-full"
      width={width}
      height={height}
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
        {F1.map((f1, i) => (
          <circle
            key={i}
            className="dot"
            r={5}
            cx={xScale(F2[i])}
            cy={yScale(f1)}
            fill="#4299e1"
          />
        ))}
        {vowels.map((vowel, i) => (
          <text
            key={i}
            className="text"
            x={xScale(F2[i])}
            y={yScale(F1[i]) - 10}
            textAnchor="middle"
          >
            {vowel}
          </text>
        ))}
        <g
          className="axis"
          transform={`translate(0,${innerHeight})`}
          ref={(node) => d3.select(node).call(d3.axisBottom(xScale).ticks(4))}
        />
        <g className="grid">
          {yScale.ticks().map((tick) => (
            <line
              key={tick}
              x1={0}
              y1={yScale(tick)}
              x2={innerWidth}
              y2={yScale(tick)}
              stroke="gray"
              strokeWidth={1}
              opacity={0.3}
            />
          ))}
          {xScale.ticks().map((tick) => (
            <line
              key={tick}
              x1={xScale(tick)}
              y1={0}
              x2={xScale(tick)}
              y2={innerHeight}
              stroke="gray"
              strokeWidth={1}
              opacity={0.3}
            />
          ))}
        </g>
        <g
          className="axis"
          ref={(node) => d3.select(node).call(d3.axisLeft(yScale).ticks(4))}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${innerWidth / 2},${
            innerHeight + margin.top + 10
          })`}
        >
          F2 Frequency (Hz)
        </text>
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-margin.left + 15},${
            innerHeight / 2
          })rotate(-90)`}
        >
          F1 Frequency (Hz)
        </text>
      </g>
    </svg>
  );
};

export default VowelFormants;
