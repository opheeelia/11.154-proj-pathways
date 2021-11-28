const width = 500;
const height = 300;
const margin = { bottom: 100, top: 100, left: 100, right: 100 };

function plotBarChart(remData, apprData) {
    const gap = 2;
    const percentageGap = 20;
    const barWidth = (width - (remData.length * gap)) / remData.length;

    const svg = d3.select("#viz-enf")
        .select("svg")
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
                .html(`${d.Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} apprehended <br>
                     ${remData.find(x => x.Year == d.Year).Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} removed`);

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

function plotPoliticOverlay() {
    const svg = d3.select("#viz-enf")
        .append("svg")
        .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.bottom + margin.top]);

    const pTerms = [{ president: "Clinton", start: 2000, end: 2001 },
    { president: "Bush", start: 2001, end: 2009 },
    { president: "Obama", start: 2009, end: 2017 },
    { president: "Trump", start: 2017, end: 2019 }
    ];

    const xValues = Array.from({length: 19}, (_, i) => i + 2000);
    const x = d3.scaleLinear()
        .domain([d3.min(xValues), d3.max(xValues)])
        .range([0, width]);

    svg.append("g")
        .attr("class", "pterm")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("rect")
        .data(pTerms)
        .enter()
        .append("rect")
        .attr("x", d => x(d.start-0.5))
        .attr("y", 0)
        .attr("width", d =>  x(d.end - 0.5) - x(d.start - 0.5))
        .attr("height", height)
        .attr("fill", (d, i) => i % 2 == 0 ? "#999999" : "#000000")
        .attr("opacity", 0.1)
        .on("mouseover", function (event, d) {
            // d3.select("#tooltip")
            //     .style("left", event.pageX + "px")
            //     .style("top", event.pageY + "px")
            //     .select("#value")
            //     .html(`${d.Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} apprehended <br>
            //          ${remData.find(x => x.Year == d.Year).Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} removed`);

            // d3.select("#tooltip")
            //     .classed("hidden", false);
        })
        .on("mouseout", function () {
            // d3.select("#tooltip")
            //     .classed("hidden", true);
        });

}

// load csv data
d3.csv("./data/removed.csv", d3.autoType)
    .then(function (remData) {
        d3.csv("./data/apprehended.csv", d3.autoType)
            .then(function (apprData) {
                plotPoliticOverlay();
                plotBarChart(remData.filter(d => d.Country == "Total"), apprData.filter(d => d.Country == "Total"));
            })
    })