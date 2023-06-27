import { ChakraProvider } from '@chakra-ui/react';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import NewPostsLayout from '@/components/newposts/NewPostsLayout';

export default () => {
  const seoTitle = ``;

  return (
    <ChakraProvider>
      <Layout>
        <main>
          <section className='bg-white'>
            <span>New Posts Page</span>
            <NewPostsLayout />
          </section>
        </main>
      </Layout>
    </ChakraProvider>
  );
};
