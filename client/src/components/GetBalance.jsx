import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// import './GetBalance.css'; // Add your CSS file for styling if needed

const GetBalance = ({ state }) => {
  const { provider, contract } = state;
  const [userAddress, setUserAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Ensure provider and contract are available
    if (!provider || !contract) return;

    // Function to fetch balance
    const fetchBalance = async () => {
      try {
        setLoading(true);
        setError('');

        // Get the user's account address from Metamask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        const userAccount = accounts[0];

        // Call the smart contract function to get the balance
        const userBalance = await contract.getBalance(userAccount);

        // Update state with the balance
        setBalance(userBalance);
        setUserAddress(userAccount);
      } catch (error) {
        setError(`Error fetching balance: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchBalance function when provider or contract changes
    fetchBalance();
  }, [provider, contract]);

  return (
    <div className="get-balance-container">
      <h2>Check Account Balance</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {balance !== null && (
        <div className="balance-info">
          <p><strong>Account Address:</strong> {userAddress}</p>
          <p><strong>Balance:</strong> {ethers.utils.formatEther(balance)} ETH</p>
        </div>
      )}
    </div>
  );
};

export default GetBalance;
