import { SignatureRequest } from 'hive-multisig-sdk/src/interfaces/signature-request';
import {
  SignerConnectResponse,
  UserNotification,
} from 'hive-multisig-sdk/src/interfaces/socket-message-interface';
export interface IMultisig {
  signerConnectActive: SignerConnectResponse;
  signerConnectPosting: SignerConnectResponse;
  subscribeToSignRequest: boolean;
  subscribeToBroadcast: boolean;
  signRequests: SignatureRequest[];
  userNotifications: UserNotification[];
  broadcastedTransactions: SignatureRequest[];
}

export interface State extends IMultisig {
  showSignRequests?: boolean;
  signRequestCount?: number;
  newSignRequestCount?: number;
  success: boolean;
  error: string;
}
