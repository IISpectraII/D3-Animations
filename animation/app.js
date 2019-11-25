const data = [
  { name: "Medellín", w2005: 3, w2006: 33 },
  { name: "Cali", w2005: 39, w2006: 45 },
  { name: "Bogotá", w2005: 7, w2006: 31 },
  { name: "Pereira", w2005: 35, w2006: 36 },
  { name: "Bucaramanga", w2005: 16, w2006: 23 },
  { name: "Cúcuta", w2005: 45, w2006: 45 },
  { name: "Armenia", w2005: 6, w2006: 16 }
];

const canvas = d3.select("#canvas");
let cambiarVista = false;

const svg = d3
  .select("#canvas")
  .append("svg")
  .attr("width", 400)
  .attr("height", 200)
  .style("border-color", "black")
  .style("border-style", "solid")
  .style("border-width", "1px");

const circle = svg
  .append("circle")
  .attr("cx", 50)
  .attr("cy", 50)
  .attr("width", 50)
  .attr("r", 4)
  .attr("height", 50);

d3.select("#start").on("click", function() {
  circle
    .transition()
    .attr("cx", 250)
    .attr("cy", 250)
    .attr("r", 100)
    .attr("opacity", 0.5)
    .delay(500)
    .duration(5000) //Duracion de la transicion.
    .ease(d3.easeBounce)
    .on("end", function() {
      d3.select(this)
        .transition()
        .attr("x", 150)
        .attr("width", 75)
        .attr("height", 75)
        .attr("opacity", 0.75)
        .attr("fill", "blue")
        .delay(500)
        .duration(2500)
        .ease(d3.easeBounce);
    }); //Nuevo efecto al terminar
});

d3.select("#reset").on("click", function() {
  circle
    .transition()
    .attr("cx", 50)
    .attr("cy", 50)
    .attr("r", 100)
    .attr("opacity", 1);
});

const generarGrafico = (data, title) => {
  const width = 700;
  const height = 500;
  const margin = { top: 10, left: 50, bottom: 40, right: 10 };
  const iwidth = width - margin.left - margin.right;
  const iheight = height - margin.top - margin.bottom;

  //Poner el titulo
  const h2 = canvas.append("h2");
  h2.text(title); 

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
    .style("fill", "steelblue")
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

  d3.select("#avanzar").on("click", function() {
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
};

generarGrafico(data, "Ciudades Colombianas");
