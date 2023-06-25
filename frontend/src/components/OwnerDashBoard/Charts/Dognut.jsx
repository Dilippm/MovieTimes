import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseURL from '../../../config';
import { Chart } from 'primereact/chart';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';


export default function DoughnutChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('ownertoken');
        const id = localStorage.getItem('ownerId');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
            const response = await axios.get(`${BaseURL}owner/movieschart/${id}`, config);
            const movieData = response.data.movieCollection;

      const documentStyle = getComputedStyle(document.documentElement); 
      console.log("modvie",movieData);
      const labels = movieData.map((movie) => movie[0]);
      const dataValues = movieData.map((movie) => movie[1]);

      // Set the chart data
      const data = {
        labels: labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500')
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--yellow-400'),
              documentStyle.getPropertyValue('--green-400')
            ]
          }
        ]
      };

      const options = {
        cutout: '60%'
      };

      setChartData(data);
      setChartOptions(options);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);
      
    return (
        <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} style={{ height:"550px",marginLeft:"160px" }} />
        </div>
    )
}
