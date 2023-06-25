import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import BaseURL from '../../../config';

export default function BasicDemo() {
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
        const response = await axios.get(`${BaseURL}owner/theaterchart/${id}`, config);

        const movieData = response.data.theaterCollection;

        const data = {
          labels: movieData.map((movie) => movie[0]), 
          datasets: [
            {
              label: 'Theaters',
              data: movieData.map((movie) => movie[1]), 
              backgroundColor: ['darkred', 'green'],
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
