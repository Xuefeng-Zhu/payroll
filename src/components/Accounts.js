import React from 'react';

export default function ArticleCard({
  accounts=[]
}) {
  return (
    <div>
      <h2>Account List</h2>
      <ul>
        { accounts.map(account => (<li key={account}>{account}</li>))}
      </ul>
    </div>
  );
}

