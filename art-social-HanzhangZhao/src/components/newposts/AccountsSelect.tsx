import React, { useState } from 'react';

const AccountSelector = () => {
  const accounts = [
    { id: 1, name: 'Account 1', image: 'account1.jpg' },
    { id: 2, name: 'Account 2', image: 'account2.jpg' },
    { id: 3, name: 'Account 3', image: 'account3.jpg' },
    // add your other accounts
  ];

  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([]);

  const toggleAccountSelection = (id) => {
    if (selectedAccounts.includes(id)) {
      setSelectedAccounts(
        selectedAccounts.filter((accountId) => accountId !== id)
      );
    } else {
      setSelectedAccounts([...selectedAccounts, id]);
    }
  };

  return (
    <div>
      <h1>Accounts Select</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {accounts.map((account) => (
          <div
            key={account.id}
            onClick={() => toggleAccountSelection(account.id)}
            style={{
              border: selectedAccounts.includes(account.id)
                ? '2px solid blue'
                : 'none',
            }}
          >
            <img
              src={account.image}
              /*alt={account.name}*/ width='50'
              height='50'
            />
            <p>{account.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSelector;
