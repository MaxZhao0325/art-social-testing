import { ChakraProvider, Stack } from '@chakra-ui/react';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ReviewItem from '@/components/reviews/reivewItem';
import ReviewActionBar from '@/components/reviews/reviewActionBar';

export default () => {
  const seoTitle = ``;

  return (
    <ChakraProvider>
      <Layout>
        <main>
          <section className='bg-white'>
            <span>Reviews Page</span>
            <Stack direction='column' spacing='10'>
              <ReviewActionBar></ReviewActionBar>
              <ReviewItem></ReviewItem>
              <ReviewItem></ReviewItem>
            </Stack>
          </section>
        </main>
      </Layout>
    </ChakraProvider>
  );
};
