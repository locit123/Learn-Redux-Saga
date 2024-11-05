import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import {
  dashboardAction,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from './dashboardSlice';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { StatisticItem } from './components/StatisticItem';
import { EmojiEvents, FitnessCenter, Girl, Man } from '@mui/icons-material';
import Widget from './components/Widget';
import StudentRankingList from './components/StudentRankingList';
interface DashboardFeatureProps {}

const DashboardFeature = (props: DashboardFeatureProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  useEffect(() => {
    dispatch(dashboardAction.fetchData());
  }, [dispatch]);
  const DATA = [
    { icon: <Man fontSize="large" color="primary" />, label: 'male', value: statistics.maleCount },
    {
      icon: <Girl fontSize="large" color="primary" />,
      label: 'female',
      value: statistics.femaleCount,
    },
    {
      icon: <EmojiEvents fontSize="large" color="primary" />,
      label: 'high >= 8',
      value: statistics.highMarkCount,
    },
    {
      icon: <FitnessCenter fontSize="large" color="primary" />,
      label: 'low <= 5',
      value: statistics.lowMarkCount,
    },
  ];
  return (
    <Box sx={{ position: 'relative', pt: 0.5 }}>
      {/* loading */}
      {loading && <LinearProgress sx={{ position: 'absolute', top: '-8px', left: 0, right: 0 }} />}
      {/* Statistic Section */}
      <Grid container spacing={3}>
        {DATA.map((item, idx) => (
          <Grid item xs={12} md={6} lg={3} key={idx}>
            <StatisticItem icon={item.icon} label={item.label} value={item.value} />
          </Grid>
        ))}
      </Grid>
      {/* All students ranking */}
      <Box mt={5}>
        <Typography variant="h4">All Students</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="Student with highest mark">
              <StudentRankingList studentList={highestStudentList} />
            </Widget>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Widget title="Student with lowest mark">
              <StudentRankingList studentList={lowestStudentList} />
            </Widget>
          </Grid>
        </Grid>
      </Box>
      {/* Ranking by city*/}
      <Box mt={5}>
        <Typography variant="h4">Ranking by city</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid item xs={12} md={6} lg={4} key={ranking.cityId}>
                <Widget title={`TP.${ranking.cityName}`}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardFeature;
