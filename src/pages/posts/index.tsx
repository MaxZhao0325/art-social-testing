import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import * as React from 'react';

import Layout from '@/components/layout/Layout';

export default () => {
  const seoTitle = ``;

  return (
    <Layout>
      <main>
        <section className='bg-white'>
          <span>Posts Page</span>
          <Link href='/newposts' passHref legacyBehavior>
            <Button colorScheme='teal' variant='solid'>
              New Posts
            </Button>
          </Link>
        </section>
      </main>
    </Layout>
  );
};
