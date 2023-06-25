import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import AdminHeader from '../../components/AdminHeader';
import { adminFetchData, adminChartFetch } from "../../api-helpers/api-helpers"
import Linechart from '../../components/AdminDashBoard/charts/Linechart';

const AdminHome = () => {
  const [cardData, setCardData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDataFromBackend();
    fetchChartDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    try {
      const data = await adminFetchData();
      setCardData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChartDataFromBackend = async () => {
    try {
      const chart = await adminChartFetch();
     
      setChartData(chart.dailyRevenueArray);
      console.log(chartData);
    } catch (error) {
      console.log(error);
    }
  };
  const transformedChartData = [
    {
      id: 'Revenue',
      data: chartData.map((item, index) => ({ x: item.date, y: item.revenue })),
    },
  ]
console.log("transfor:",transformedChartData);
  return (
    <>
      <AdminHeader />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                width: '400px',
                height: '200px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                border: '3px solid #ccc',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" mt={8}>
                  <b>Total Revenue: ₹{cardData.totalAmount}/-</b>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                width: '400px',
                height: '200px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                border: '3px solid #ccc',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" mt={8}>
                  <b>Total Users: {cardData.totalUsers}</b>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                width: '400px',
                height: '200px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                border: '3px solid #ccc',
                textAlign: 'center',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" mt={8}>
                  <b>Total Owners: {cardData.totalOwners}</b>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '60vw',
              height: '80vh',
              margin: 'auto',
              marginTop: '100px',
              border: '3px solid black',
              marginBottom: "40px"
            }}
          >
            <Typography variant="h5" component="div" mt={8} pl={4}>
              <b>Revenue Chart</b>
            </Typography>
            <Linechart data={transformedChartData} width="80%" height="80%" />

          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminHome;
