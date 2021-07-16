import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";

// url to call for graph generator
// https://disease.sh/v3/covid-19/historical/all?lastdays=120

// https://disease.sh/v3/covid-19/historical/India?lastdays=120

//designed a function that would use the data to calculate the new cases that are upcoming between two cases.
const buildChartData = (data, caseType) => {
    let chartData = [];
    let lastDataPoint;

    for(let date in data.cases){
        if(lastDataPoint) {
            let newDataPoint = {
                x:date,
                y:data[caseType][date] - lastDataPoint,
            };

            chartData.push(newDataPoint);
        }
        lastDataPoint = data[caseType][date];
    }

    return chartData;
};

function Linegraph({caseType}) {
    const[data, setData] = useState({});
     

    useEffect(() => {
        const fetchData = async () => {
            fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
            let chartData = buildChartData(data, caseType);
            setData(chartData);
        });
    };

    fetchData();
        
    }, [caseType]);
    return (

        <div className  = "linegraph">
            <h1>This is a Graph</h1>
            {/* <Line data options/> */}
        </div>
    )
}

export default Linegraph
