import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import BaseURL from '../../../config';

export default function BarChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('admintoken');
        const id = localStorage.getItem('adminId');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${BaseURL}admin/movieschart/${id}`, config);

        const movieData = response.data.movieCollection;
      

        const data = {
          labels: movieData.map((movie) => movie[0]), 
          datasets: [
            {
              label: 'Bookings',
              data: movieData.map((movie) => movie[1]), 
              backgroundColor: ['rgba(255, 0, 0, 0.4)', 'rgba(0, 128, 0, 0.4)'], // Set background colors to red and green
              borderColor: ['darkred', 'darkgreen'],
              borderWidth: 5,
            },
          ],
        };

        const options = {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
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
    <div className="card">
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
}
