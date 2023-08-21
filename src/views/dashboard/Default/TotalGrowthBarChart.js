import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import {createChartData} from './chart-data/total-growth-bar-chart';
import moment from 'moment';

const status = [
  {
    value: 'day',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
  const [value, setValue] = useState('month');
  const theme = useTheme();
  const appStore = useSelector(store => store.app);
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);
  const [chartData, setChartData] = useState();

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  const successColor = theme.palette.success.main;
  const rejectColor = theme.palette.error.main;
  const pendingColor = theme.palette.primary.main;

  useEffect(() => {
    if(!chartData) {
      return;
    }
    const newChartData = {
      ...chartData.options,
      colors: [successColor, rejectColor, pendingColor],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500, chartData]);

  useEffect(()=>{
    if(!appStore.utilizationsStats) {
      return;
    }
    const createdData = createChartData(appStore.utilizationsStats)
    setChartData(createdData);
  },[appStore.utilizationsStats])

  useEffect(()=>{
    dispatch({
      type: "UTILIZATIONS_STATS_FETCH_REQUESTED",
      payload: {
        query: `query UtilizationStats($fromT: String, $toT: String) {
          utilizationStats(fromT: $fromT, toT: $toT) {
            totalUtilizations
            totalApproved
            totalRejected
            totalInProgress
            totalCost
            stocks {
              id
              name
              totalUtilizations
              totalApproved
              totalRejected
              totalInProgress
              totalCost
              approvedQtyCost
              rejectedQtyCost
              inProgressQtyCost
            }
            approvedQtyCost
            rejectedQtyCost
            inProgressQtyCost
          }
        }`,
        variables: {
          fromT: moment().startOf(value).format('x'),
          toT: moment().endOf(value).format('x'),
        }
      }
    })
  },[value])

  return (
    <>
      {isLoading || !chartData ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Total Utilizations</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">{appStore.utilizationsStats.totalUtilizations}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
