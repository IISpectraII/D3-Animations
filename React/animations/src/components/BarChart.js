import React, { Component } from "react";
import * as d3 from 'd3';

export default class BarChart extends Component {
  componentDidMount() {
    const data = [
      { name: "Medellín", w2005: 3, w2006: 33 },
      { name: "Cali", w2005: 39, w2006: 45 },
      { name: "Bogotá", w2005: 7, w2006: 31 },
      { name: "Pereira", w2005: 35, w2006: 36 },
      { name: "Bucaramanga", w2005: 16, w2006: 23 },
      { name: "Cúcuta", w2005: 45, w2006: 45 },
      { name: "Armenia", w2005: 6, w2006: 16 }
    ];
    this.renderChart(data);
  }

  renderChart(data) {
    console.log("Refs", this.refs)
    console.log("Referencia a root", this.refs.root)
    const canvas = d3.select(this.refs.canvas);
    const width = 700;
    const height = 500;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;    

    const svg = canvas.append("svg");
    svg.attr("width", width);
    svg.attr("height", height);

    let g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const y = d3
      .scaleLinear()
      .domain([0, 45])
      .range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll("rect").data(data);

    const bar = bars
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "green")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.w2005))
      .attr("height", d => iheight - y(d.w2005))
      .attr("width", x.bandwidth());

    g.append("g")
      .classed("x--axis", true)
      .call(d3.axisBottom(x))
      .attr("transform", `translate(0, ${iheight})`);

    g.append("g")
      .classed("y--axis", true)
      .call(d3.axisLeft(y));

    d3.select(this.refs.avanzar).on("click", function() {
      //Cambiar los datos y la transición
      console.log("Realizando la transición");
      bar
        .transition()
        .style("fill", "red")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.w2006))
        .attr("height", d => iheight - y(d.w2006))
        .attr("width", x.bandwidth());
    });

    d3.select(this.refs.regresar).on("click", function() {
        //Cambiar los datos y la transición
        console.log("Realizando la transición");
        bar
          .transition()
          .style("fill", "green")
          .attr("x", d => x(d.name))
          .attr("y", d => y(d.w2005))
          .attr("height", d => iheight - y(d.w2005))
          .attr("width", x.bandwidth());
      });
  }

  render() {
    return (
      <div ref="canvas" className="container-fluid">
        <div className="col-lg-12 justify-content-center">
            <h1>Ciudades Colombianas</h1>
            <button ref="avanzar" className="btn-primary"> Avanzar </button>
            <button ref="regresar" className="btn-secondary"> Regresar </button>        
        </div>        
      </div>
    );
  }
}
