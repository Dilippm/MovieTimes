import React from 'react';
import {Grid, Typography} from '@mui/material';
import Cards from '../../components/OwnerDashBoard/Cards'
import LineDemo from '../../components/OwnerDashBoard/Charts/Line';
import BasicDemo from '../../components/OwnerDashBoard/Charts/Bar';
import DoughnutChartDemo from '../../components/OwnerDashBoard/Charts/Dognut';
const OwnerHome = () => {
    return (
        <Grid container="container" spacing={2}>
            <Grid item="item" xs={12}>
                <div
                    style={{
                        height: '25vh',
                        marginTop: "30px"
                    }}>
                    <Cards/>
                </div>
            </Grid>
            <Grid item="item" xs={12}>
                <Grid container="container" spacing={2}>
                    <Grid item="item" xs={6}>
                        <div
                            style={{
                                background: '#e1e1e1',
                                height: '600px',
                                marginLeft: "40px",
                                border: "1px solid white",
                                boxShadow: '0 2px 10px rgba(0, 0.6, 0, 0.5)'
                            }}>
                            <Typography
                                variant="h5"
                                component="div"
                                mt={8}
                                pl={4}
                                style={{
                                    marginTop: "10px"
                                }}>
                                <b>Revenue Chart</b>
                            </Typography>
                            <LineDemo/>
                        </div>
                    </Grid>
                    <Grid item="item" xs={6}>
                        <div
                            style={{
                                background: '#e1e1e1',
                                height: '600px',
                                marginRight: "40px",
                                border: "1px solid white",
                                boxShadow: '0 2px 10px rgba(0, 0.6, 0, 0.5)'
                            }}>
                            <Typography
                                variant="h5"
                                component="div"
                                mt={8}
                                pl={4}
                                style={{
                                    marginTop: '10px'
                                }}>
                                <b>Movie Chart</b>
                            </Typography>
                            <DoughnutChartDemo/>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item="item" xs={12}>
                <Grid container="container" spacing={2}>
                    <Grid item="item" xs={6}>
                        <div
                            style={{
                                background: '#e1e1e1',
                                height: '55vh',
                                marginLeft: "40px",
                                marginBottom: "10px",
                                border: "1px solid white",
                                boxShadow: '0 2px 10px rgba(0, 0.6, 0, 0.5)'
                            }}>
                            <Typography
                                variant="h5"
                                component="div"
                                mt={8}
                                pl={4}
                                style={{
                                    marginTop: "10px"
                                }}>
                                <b>Theater Chart</b>
                            </Typography>
                            <BasicDemo/>
                        </div>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    );
}

export default OwnerHome;
