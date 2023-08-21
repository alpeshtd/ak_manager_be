import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const appStore = useSelector(store => store.app)
  useEffect(() => {
    setLoading(false);
    dispatch({
      type: "INCOME_EXPENSE_STATS_FETCH_REQUESTED",
      payload: {
        query: `query IncomeExpenseStats($fromT: String, $toT: String) {
          incomeExpenseStats(fromT: $fromT, toT: $toT) {
            totalIncome
            totalExpense
            paidExpense
            remainingExpense
          }
        }`,
        variables: {}
      }
    })
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <EarningCard isLoading={isLoading} incomeExpense={appStore.incomeExpenseStats} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalOrderLineChartCard isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeDarkCard isLoading={isLoading} incomeExpense={appStore.incomeExpenseStats} />
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeLightCard isLoading={isLoading} incomeExpense={appStore.incomeExpenseStats} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <PopularCard isLoading={isLoading} />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      {/* <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%', background: '#ffffffc7', zIndex: 20}}><span style={{position:'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', fontSize: 40, lineHeight: '44px'}}>Coming Soon...</span></div> */}
    </div>
  );
};

export default Dashboard;
