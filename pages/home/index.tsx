import type { NextPage } from 'next';
import { Grid } from '@mantine/core';
import WelcomeCard from '../../components/organisms/WelcomeCard';
const Home: NextPage = () => {
  return (
    <Grid gutter={20}>
      <Grid.Col span={12} xs={6} offsetXs={3}>
        <WelcomeCard />
      </Grid.Col>
    </Grid>
  );
};

export default Home;
