import { Box, Divider, Heading } from '@chakra-ui/react';
import { useState } from 'react';

import AccountSelectedPanel from '@/components/accounts/AccountSelectedPanel';
import AccountSelectPanel from '@/components/accounts/AccountSelectPanel';

import { useUserAccount } from '../../contexts/userContext';

export default function AccountsLayout() {
  const { accounts } = useUserAccount();
  return (
    <Box p={8}>
      <Heading mb={4}>Account Connection</Heading>
      <AccountSelectPanel />

      <Divider my={6} />

      <Heading mb={4}>{accounts.length} Accounts Connected</Heading>
      <AccountSelectedPanel />
    </Box>
  );
}
