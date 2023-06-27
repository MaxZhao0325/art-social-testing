import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Image,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { Sort, useContext, useEffect, useState } from 'react';

import { useUserAccount } from '../../contexts/userContext';

export default function AccountSelectedPanel() {
  // record the information of stored accounts
  const { addAccount, accounts, setAccounts } = useUserAccount();
  // record the information(account_id) of checked accounts
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  // record whether checkbox of selecting all is checked
  const [selectAll, setSelectAll] = useState(false);
  //record accounts_id with invalid access_token
  const [invalidAccounts, setInvalidAccounts] = useState([]);

  const toast = useToast();

  // this useEffect is called whenever we add a new account and return from the callback
  useEffect(() => {
    // Retrieve the access token from sessionStorage
    try {
      const account = JSON.parse(sessionStorage.getItem('account'));
      if (account) {
        addAccount(account);
        // Remove the access token from sessionStorage
        sessionStorage.removeItem('account');
      }
    } catch {
      console.error('error adding the account');
      sessionStorage.removeItem('account');
    }
  }, [addAccount]);

  // check if the accounts' accessTokens are valid. If not, remind the user to refresh the token
  useEffect(() => {
    // For each account, check if the access token is valid
    accounts.forEach(async (account) => {
      const response = await fetch('/api/auth/token_validation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: account.access_token,
          // linkedin will have null for token key
          accessTokenKey: account.access_token_key,
          mediaType: account.social_media,
        }),
      });

      const data = await response.json();
      if (!data.isValid) {
        // If the response status is not ok (e.g., 401 Unauthorized), the token is invalid.
        // toast({
        //   title: 'Token expired',
        //   description: `The access token for account ${account.full_name} is expired or invalid, please refresh it as soon as possible.`,
        //   status: 'error',
        //   duration: 5000,
        //   isClosable: true,
        // });

        // instead of toast, we use a red text to indicate the account needs refresh

        // Add the invalid account to the invalidAccounts state
        setInvalidAccounts((prevInvalidAccounts) => [
          ...prevInvalidAccounts,
          account.account_id,
        ]);
      }
    });
  }, [accounts, toast]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedAccounts(accounts.map((account) => account.account_id));
    } else {
      setSelectedAccounts([]);
    }
  };

  const handleRemoveSelected = () => {
    if (selectedAccounts.length === 0) {
      toast({
        title: 'Account Removed Failed',
        description: `You did not select any accounts.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      const updatedAccounts = accounts.filter(
        (account) => !selectedAccounts.includes(account.account_id)
      );
      // Update the accounts in context and localStorage here
      localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
      setAccounts(updatedAccounts); // Update context state
      setSelectedAccounts([]); // Clear selected accounts
      toast({
        title: 'Account Removed',
        description: `All selected accounts have been removed successfully.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSelectAccount = (accountId) => {
    if (selectedAccounts.includes(accountId)) {
      setSelectedAccounts(selectedAccounts.filter((id) => id !== accountId));
    } else {
      setSelectedAccounts([...selectedAccounts, accountId]);
    }
  };

  const handleRemoveAccount = (accountId) => {
    const updatedAccounts = accounts.filter(
      (account) => account.account_id !== accountId
    );
    // Update the accounts in context and localStorage here
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    setAccounts(updatedAccounts); // Update context state
    setSelectedAccounts(selectedAccounts.filter((id) => id !== accountId)); // remove this account from selected accounts
    toast({
      title: 'Account Removed',
      description: `Account has been removed successfully.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  // set the breakpoint for mobile devices
  const stackSpacing = useBreakpointValue({ base: 3, md: 4 });

  // function used to select the image source for a given account
  const media_type = (account) => {
    if (account.social_media === 'LinkedIn') {
      return 'images/linkedin_icon.png';
    } else if (account.social_media === 'Twitter') {
      return 'images/twitter_icon.png';
    } else if (account.social_media === 'Instagram') {
      return 'images/instagram_icon.png';
    } else if (account.social_media === 'Facebook') {
      return 'images/facebook_icon.png';
    }
  };

  return (
    <Box p={5}>
      <Flex mb={4} flexDir={['column', 'row']} alignItems='flex-start'>
        <Checkbox
          isChecked={selectAll}
          onChange={handleSelectAll}
          mb={['2', '0']}
        >
          Select All
        </Checkbox>
        <Spacer />
        <Button colorScheme='red' onClick={handleRemoveSelected}>
          Remove Selected Accounts
        </Button>
      </Flex>

      <Stack spacing={stackSpacing}>
        {accounts.map((account) => (
          <Flex
            key={account.account_id}
            p={4}
            borderWidth={1}
            borderRadius='md'
            alignItems='center'
            flexWrap='wrap'
          >
            <Checkbox
              isChecked={selectedAccounts.includes(account.account_id)}
              onChange={() => handleSelectAccount(account.account_id)}
              mr={2}
            />
            <Image
              src={media_type(account)}
              alt='Social Media Icon'
              boxSize='24px'
              mr={2}
            />
            {account.profile_image ? (
              <Image
                boxSize='50px'
                borderRadius='full'
                src={account.profile_image}
                alt={`${account.account_id}`}
                mr={2}
              />
            ) : (
              <Image
                boxSize='50px'
                borderRadius='full'
                src='images/null_icon.png'
                alt={`${account.account_id}`}
                mr={2}
              />
            )}
            <Box flex='1'>
              <Text fontSize='lg' mr={2}>
                {account.full_name}
              </Text>
              {invalidAccounts.includes(account.account_id) && (
                <Text color='red.500' fontSize='sm'>
                  Access token is not valid
                </Text>
              )}
            </Box>
            <Icon
              as={
                invalidAccounts.includes(account.account_id)
                  ? CloseIcon
                  : CheckIcon
              }
              color={
                invalidAccounts.includes(account.account_id)
                  ? 'red.500'
                  : 'green.500'
              }
              w={5}
              h={5}
              mr={2}
            />
            <Button
              colorScheme='red'
              variant='ghost'
              onClick={() => handleRemoveAccount(account.account_id)}
            >
              Remove
            </Button>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}
