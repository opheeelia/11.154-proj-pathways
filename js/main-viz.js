
function plotBarChart(remData, apprData) {
    const width = 500;
    const height = 300;

    const gap = 2;
    const percentageGap = 20;
    const barWidth = (width - (remData.length * gap)) / remData.length;
    const margin = { bottom: 100, top: 100, left: 100, right: 100 };

    const svg = d3.select("#viz-enf")
        .append("svg")
        .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.bottom + margin.top]);

    // define y linear scale and axis
    const yValues = apprData.map(d => d.Number);
    const y = d3.scaleLinear()
        .domain([0, d3.max(yValues)])
        .range([height, 0]);

    const yAxis = d3.axisLeft(y).ticks(6);

    svg.append("g")
        .attr("class", "axis y")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

    // rectangle bars for removed
    svg.append("g")
        .attr("class", "bars")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("rect")
        .data(remData)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * (barWidth + gap))
        .attr("y", (d) => y(d.Number))
        .attr("width", barWidth)
        .attr("height", d => height - y(d.Number))
        .attr("fill", "#003869")
        .attr("opacity", 0.5);

    // rectangle bars for apprehended
    svg.append("g")
        .attr("class", "bars")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("rect")
        .data(apprData)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * (barWidth + gap))
        .attr("y", (d) => y(d.Number))
        .attr("width", barWidth)
        .attr("height", d => height - y(d.Number))
        .attr("fill", "#003869")
        .attr("opacity", 0.5)
        .on("mouseover", function (event, d) {
            d3.select("#tooltip")
                .style("left", event.pageX + "px")
                .style("top", event.pageY + "px")
                .select("#value")
                .html(`<p> ${d.Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} apprehended </p>`); // access data by object property

            d3.select("#tooltip")
                .classed("hidden", false);
        })
        .on("mouseout", function () {
            d3.select("#tooltip")
                .classed("hidden", true);
        });

    // text percenntage
    svg.append("g")
        .attr("class", "labels")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("text")
        .data(apprData)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * (barWidth + gap) + barWidth / 2)
        .attr("y", (d) => y(d.Number) - percentageGap)
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .attr("font-size", "0.6em")
        .attr("fill", "black")
        .text((d, i) => `${parseInt((remData[i].Number / d.Number) * 100)}%`);

    // text on x-axis
    svg.append("g")
        .attr("class", "labels")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("text")
        .data(remData)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * (barWidth + gap) + barWidth / 2)
        .attr("y", height + gap)
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .attr("font-size", "0.6em")
        .attr("fill", "black")
        .text(d => d.Year);
};

// load csv data
d3.csv("./data/removed.csv", d3.autoType)
    .then(function (remData) {
        d3.csv("./data/apprehended.csv", d3.autoType)
            .then(function (apprData) {
                console.log(remData)
                console.log(apprData)
                plotBarChart(remData.filter(d => d.Country == "Total"), apprData.filter(d => d.Country == "Total"));
            })
    })