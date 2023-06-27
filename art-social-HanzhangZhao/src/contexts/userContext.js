import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const UserAccountContext = createContext();

export const UserAccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [pendingAccount, setPendingAccount] = useState(null);

  const toast = useToast();

  // This effect is just for initial population of state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAccounts = localStorage.getItem('accounts');
      if (storedAccounts) {
        // if storedAccounts cannot be parsed in JSon format
        // setaccounts to an empty list and clean the localstorage
        try {
          setAccounts(JSON.parse(storedAccounts));
        } catch {
          console.error('accounts parsing error');
          setAccounts([]);
          localStorage.setItem('accounts', []);
        }
      }
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized && pendingAccount) {
      // check if the adding account exists
      // if exist, delete the original account

      // if an existing_account has the same account_id as the new account, then it is the same as new account
      const isDiff = (existing_account) =>
        existing_account.account_id !== pendingAccount.account_id;
      setAccounts((prevAccounts) => {
        const updatedAccounts = prevAccounts.filter(isDiff);
        return updatedAccounts;
      });

      // add the new account to the account list
      setAccounts((prevAccounts) => {
        const updatedAccounts = [...prevAccounts, pendingAccount];

        // function used to sort the accounts so that
        // accounts with the same media_type can be arranged together
        const sortById = (a, b) => {
          if (a.account_id > b.account_id) {
            return 1;
          }
          return -1;
        };

        updatedAccounts.sort(sortById);

        // Save to localStorage if on client-side
        if (typeof window !== 'undefined') {
          localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
        }
        return updatedAccounts;
      });
      setPendingAccount(null); // Reset the pending account

      toast({
        title: 'Account Added',
        description: `Account ${pendingAccount.full_name} has been added successfully.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isInitialized, pendingAccount]);

  const addAccount = (account) => {
    setPendingAccount(account);
  };

  return (
    <UserAccountContext.Provider value={{ accounts, addAccount, setAccounts }}>
      {children}
    </UserAccountContext.Provider>
  );
};

export const useUserAccount = () => useContext(UserAccountContext);
