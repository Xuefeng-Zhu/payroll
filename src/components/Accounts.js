import React from 'react';

export default function ArticleCard({
  accounts=[]
}) {
  return (
    <div className="pure-menu">
        <span className="pure-menu-heading">Account List</span>

        <ul className="pure-menu-list">
          { accounts.map(account => (
            <li className="pure-menu-item" key={account}>
              <a href="#" className="pure-menu-link">{account}</a>
            </li>))
          }
        </ul>
    </div>
  );
}

