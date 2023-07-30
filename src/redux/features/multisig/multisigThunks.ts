import { createAsyncThunk } from '@reduxjs/toolkit';
import { KeychainKeyTypes } from 'hive-keychain-commons';
import { HiveMultisigSDK } from 'hive-multisig-sdk/src';
import {
  ITransaction,
  SignatureRequestCallback,
  SignerConnect,
} from 'hive-multisig-sdk/src/interfaces/socket-message-interface';

import { State } from '../../../interfaces/multisig.interface';
const multisig = new HiveMultisigSDK(window);

export const signerConnectActive = createAsyncThunk<
  State,
  string,
  { rejectValue: string }
>('multisig/signerConnectActive', async (username: string, { getState }) => {
  const currentState = getState() as State;
  const connObj: SignerConnect = {
    username,
    keyType: KeychainKeyTypes.active,
  };
  const signerConnectResponse = await multisig.singleSignerConnect(connObj);
  const newState: State = {
    ...currentState,
    signerConnectActive: signerConnectResponse,
  };
  return newState;
});

export const signerConnectPosting = createAsyncThunk<
  State,
  string,
  { rejectValue: string }
>('multisig/signerConnectPosting', async (username: string, { getState }) => {
  const currentState = getState() as State;
  const connObj: SignerConnect = {
    username,
    keyType: KeychainKeyTypes.posting,
  };
  const signerConnectResponse = await multisig.singleSignerConnect(connObj);
  const newState: State = {
    ...currentState,
    signerConnectPosting: signerConnectResponse,
  };
  return newState;
});

export const subscribeToSignRequests = createAsyncThunk<
  boolean,
  SignatureRequestCallback,
  { rejectValue: string }
>(
  'multisig/subscribeToSignRequests',
  async (callback: SignatureRequestCallback) => {
    const response = await multisig.subscribeToSignRequests(callback);
    return response;
  },
);

export const addSignRequest = createAsyncThunk(
  'multisig/addSignRequest',
  async (signRequest: ITransaction[]) => {
    return signRequest;
  },
);

export const showSignRequests = createAsyncThunk(
  'multisig/showSignRequests',
  async (show: boolean) => {
    return show;
  },
);

export const setSignRequestCount = createAsyncThunk(
  'multisig/setSignRequestCount',
  async (count: number) => {
    return count;
  },
);
export const subscribeToBroadcastedTransactions = createAsyncThunk<
  boolean,
  SignatureRequestCallback,
  { rejectValue: string }
>(
  'multisig/subscribeToBroadcastedTransactions',
  async (callback: SignatureRequestCallback) => {
    const response = await multisig.subscribeToBroadcastedTransactions(
      callback,
    );
    return response;
  },
);
