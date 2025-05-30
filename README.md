# Sig Vault

const baseURL = import.meta.env.VITE_BASE_URL

Hive multisig accounts which facilitate the creation and management of essentilly businesses and organizations
www.sigvault.com

The owner key is the master key for the account and is required to change the other keys

The active key is used to make transfers and place orders in the internal market

The posting key is used for posting and voting

An account is a container for all of the activity associated with a particular user's wallet on the blockchain. This includes all of their tokens, posts, comments, upvotes, transfers, etc.

Each Account has multiple authority and keys to manager different permissions on the platform

Keys are used to authenticate transactions. Each key contains a public/private pair. When a transaction is submitted to the Hive blockchain, it is signed by the account owner using their private key. The blockchain is able to determine that the transaction is valid by validating the signature against the public key from the pair.

Public key of account's certain authority

Minimal Viable product
Landing page
Sign in / Sign up Modal
Details about how a user pays for Sigvault
User agreement? ( must allow access to “Sigauthority” account for feature functionality)
Create a hive account
• Business process
o spending cap business process for which no approval needed
o budgetary allocation business process
o Creation of roles assign which can be assigned to user
o Creation of portfolio of accounts
o Assignment of roles to group or business process
o Assignment of groups to a portfolio or business process
o Dynamic approvals based on transaction types
o Board vote / shareholder votes
o throttle list

Nice to have – future versions

- Send invoices to a customer "pay with hive"
  https://qr.hive-keychain.com/

- GUI what are my account or my portfolio balances?
  https://portfolio.dtools.dev/#/

-Filter past transactions
