import React from 'react';
import GetList from '../features/list/GetList';
import Layout from '../components/Layout'

const Home = () => {
   return (
      <Layout>
         <GetList />
      </Layout>
   );
};

export default Home;
