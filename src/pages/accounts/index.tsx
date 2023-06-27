import * as React from 'react';

import Layout from '@/components/layout/Layout';
import AccountsLayout from '@/components/accounts/AccountsLayout';

export default () => {
  const seoTitle = ``;

  return (
    <Layout>
      <main>
        <section className='bg-white'>
          <AccountsLayout />
        </section>
      </main>
    </Layout>
  );
};
