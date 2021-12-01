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

    // define y linear scale and axis
    const x = d3.scaleLinear()
        .domain([2000, 2019])
        .range([0, width]);

    const xAxis = d3.axisBottom(x).ticks(8).tickFormat(d3.format("d"));

    svg.append("g")
        .attr("class", "axis x")
        .attr("transform", `translate(${margin.left}, ${margin.top + height})`)
        .call(xAxis);

    // Add the area for apprehended
    svg.append("path")
        .datum(apprData)
        .attr("fill", "#003869")
        .attr("fill-opacity", .3)
        .attr("stroke", "none")
        .attr("d", d3.area()
            .x(d => x(d.Year))
            .y0(height)
            .y1(d => y(d.Number))
        )
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // Add the line for appr
    svg.append("path")
        .datum(apprData)
        .attr("fill", "none")
        .attr("stroke", "#003869")
        .attr("stroke-width", 1)
        .attr("d", d3.line()
            .x(d => x(d.Year))
            .y(d => y(d.Number))
        )
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // Add the area for apprehended
    svg.append("path")
        .datum(remData)
        .attr("fill", "#003869")
        .attr("fill-opacity", .3)
        .attr("stroke", "none")
        .attr("d", d3.area()
            .x(d => x(d.Year))
            .y0(height)
            .y1(d => y(d.Number))
        )
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // Add the line for appr
    svg.append("path")
        .datum(remData)
        .attr("fill", "none")
        .attr("stroke", "#003869")
        .attr("stroke-width", 1)
        .attr("d", d3.line()
            .x(d => x(d.Year))
            .y(d => y(d.Number))
        )
        .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // Add the line
    svg.selectAll("myCircles")
        .data(apprData)
        .enter()
        .append("circle")
        .attr("fill", "#003869")
        .attr("stroke", "none")
        .attr("cx", d => x(d.Year))
        .attr("cy", d => y(d.Number))
        .attr("r", 3)
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
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

    // text percentage
    svg.append("g")
        .attr("class", "labels")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("text")
        .data(apprData)
        .enter()
        .append("text")
        .attr("x", d => x(d.Year))
        .attr("y", (d) => y(d.Number) - percentageGap)
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .attr("font-size", "0.6em")
        .attr("fill", "black")
        .text((d, i) => `${parseInt((remData[i].Number / d.Number) * 100)}%`);

    // title
    svg.append("text")
        .attr("class", "title")
        .text("Number of persons apprehended and removed 2000-2019")
        .attr("transform", `translate(${margin.left}, ${margin.top / 2})`);

    // axes label
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .text("Year")
        .attr("transform", `translate(${margin.left + (width / 2)}, ${height + margin.top + (margin.bottom / 2)})`);

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .text("People")
        .attr("transform", `translate(${margin.left / 3}, ${margin.top + (height / 2)}) rotate(-90)`);
}

function plotPoliticOverlay(data) {
    const svg = d3.select("#viz-enf")
        .select("svg")
        .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.bottom + margin.top]);

    const pTerms = [{ president: "Clinton", start: 2000, end: 2001 },
    { president: "Bush", start: 2001, end: 2009 },
    { president: "Obama", start: 2009, end: 2017 },
    { president: "Trump", start: 2017, end: 2019 }
    ];

    const x = d3.scaleLinear()
        .domain([2000, 2019])
        .range([0, width]);

    svg.append("g")
        .attr("class", "pterm")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("rect")
        .data(pTerms)
        .enter()
        .append("rect")
        .attr("x", d => x(d.start))
        .attr("y", 0)
        .attr("width", d => x(d.end) - x(d.start))
        .attr("height", height)
        .attr("fill", (d, i) => i % 2 == 0 ? "#999999" : "#000000")
        .attr("opacity", 0.1);

    // plot policies
    svg.append("g")
        .attr("class", "policies")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.Year + (1/12) * d.Month))
        .attr("y", 0)
        .attr("width", 2)
        .attr("height", height)
        .attr("fill", "#b60028")
        .on("mouseover", function (event, d) {
            d3.select("#tooltip")
                .style("left", event.pageX + "px")
                .style("top", event.pageY + "px")
                .select("#value")
                .html(`<b>${d.Name}</b> <p>${d.Details}</p>`);

            d3.select("#tooltip")
                .classed("hidden", false);
        })
        .on("mouseout", function () {
            d3.select("#tooltip")
                .classed("hidden", true);
        });
}

// function plotContext(contextData) {
//     const svg = d3.select("#viz-enf")
//         .select("svg")
//         .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.bottom + margin.top]);

//     const x = d3.scaleLinear()
//         .domain([2000, 2019])
//         .range([0, width]);

//     svg.append("g")
//         .attr("class", "pEvent")
//         .attr("transform", `translate(${margin.left}, ${margin.top})`)
//         .selectAll("rect")
//         .data(contextData)
//         .enter()
//         .append("rect")
//         .attr("x", d => x(d.Year))
//         .attr("y", 0)
//         .attr("width", 5)
//         .attr("height", height)
//         .attr("fill", "#b60028")
//         .attr("opacity", 0.3)
//         .on("mouseover", function (event, d) {
//             // d3.select("#tooltip")
//             //     .style("left", event.pageX + "px")
//             //     .style("top", event.pageY + "px")
//             //     .select("#value")
//             //     .html(`${d.Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} apprehended <br>
//             //          ${remData.find(x => x.Year == d.Year).Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} removed`);

//             // d3.select("#tooltip")
//             //     .classed("hidden", false);
//         })
//         .on("mouseout", function () {
//             // d3.select("#tooltip")
//             //     .classed("hidden", true);
//         });

// }

const svg = d3.select("#viz-enf")
    .append("svg")
    .attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.bottom + margin.top]);

// load csv data
d3.csv("./data/policies.csv", d3.autoType)
    .then(function (data) {
        plotPoliticOverlay(data.filter(d => d.Year >= 2000));
    });

// d3.csv("./data/context.csv", d3.autoType)
//     .then(function (contextData) {
//         plotContext(contextData);
//     });


d3.csv("./data/removed.csv", d3.autoType)
    .then(function (remData) {
        d3.csv("./data/apprehended.csv", d3.autoType)
            .then(function (apprData) {
                plotBarChart(remData.filter(d => d.Country == "Total"), apprData.filter(d => d.Country == "Total"));
            })
    });

