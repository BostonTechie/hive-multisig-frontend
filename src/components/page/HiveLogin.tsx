import { HiveMultisig } from 'hive-multisig-sdk/src';

import { KeychainKeyTypes } from 'hive-keychain-commons';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { Config } from '../../config';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { login } from '../../redux/features/login/loginSlice';
import {
  addBroadcastNotifications,
  addSignRequest,
  signerConnectActive,
  signerConnectMessageActive,
  signerConnectMessagePosting,
  signerConnectPosting,
} from '../../redux/features/multisig/multisigThunks';
import { MultisigUtils } from '../../utils/multisig.utils';
import { getTimestampInSeconds } from '../../utils/utils';

const HiveLogin = () => {
  const [multisig, setMultisig] = useState<HiveMultisig>(undefined);
  const [posting, setPosting] = useState(true);
  const [active, setActive] = useState(true);

  const loginExpirationInSec = Config.login.expirationInSec;

  const [username, setUsername] = useState<string>('');

  const isLoginSucceed = useAppSelector(
    (state) => state.login.isSignatureSuccess,
  );

  const signedAccountObj = useAppSelector((state) => state.login.accountObject);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [isLoggedIn, setStorageIsLoggedIn] = useLocalStorage(
    'loginStatus',
    isLoginSucceed,
  );

  const [accountDetails, setStorageAccountDetails] = useLocalStorage(
    'accountDetails',
    signedAccountObj,
  );

  const [loginTimestamp, setLoginTimestamp] = useLocalStorage(
    'loginTimestap',
    null,
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    if (!multisig) {
      setMultisig(
        HiveMultisig.resetInstance(window, MultisigUtils.getOptions()),
      );
    }
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn && accountDetails) {
  //     navigate(`/dashboard`);
  //   } else {
  //   }
  // }, [accountDetails]);

  useEffect(() => {
    if (isLoginSucceed) {
      loginInitAsync();
    }
  }, [isLoginSucceed]);

  useEffect(() => {
    if (isFocused) {
      const keyDownHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          handleOnLoginSubmit();
        }
      };
      document.addEventListener('keydown', keyDownHandler);
      return () => {
        document.removeEventListener('keydown', keyDownHandler);
      };
    }
  });

  const loginInitAsync = async () => {
    await setStorageIsLoggedIn(isLoginSucceed);
    await setStorageAccountDetails(signedAccountObj);
    await setLoginTimestamp(getTimestampInSeconds());
  };

  const connectActive = async () => {
    const signerConnectResponse = await multisig.wss.subscribe({
      username,
      keyType: KeychainKeyTypes.active,
    });
    if (signerConnectResponse.result) {
      dispatch(
        signerConnectMessageActive({
          username,
          message: signerConnectResponse.message,
          publicKey: signerConnectResponse.publicKey,
          keyType: KeychainKeyTypes.active,
        }),
      );
      if (!posting)
        dispatch(
          login({
            data: {
              key: 'active',
              message: signerConnectResponse.message,
              method: KeychainKeyTypes.active,
              username: username,
            },
            result: signerConnectResponse.message,
            publicKey: signerConnectResponse.publicKey,
            success: true,
          }),
        );

      if (signerConnectResponse.result.pendingSignatureRequests) {
        const pendingReqs =
          signerConnectResponse.result.pendingSignatureRequests[username];
        if (pendingReqs?.length > 0) {
          await dispatch(addSignRequest(pendingReqs));
        }
      }

      if (signerConnectResponse.result.notifications) {
        const notifications =
          signerConnectResponse.result.notifications[username];
        if (notifications?.length > 0) {
          await dispatch(addBroadcastNotifications(notifications));
        }
      }
      await dispatch(signerConnectActive(signerConnectResponse));
    } else {
      console.log('connectActive Failed');
    }
  };

  const connectPosting = async () => {
    const signerConnectResponse = await multisig.wss.subscribe({
      username,
      keyType: KeychainKeyTypes.posting,
    });
    if (signerConnectResponse.result) {
      dispatch(
        signerConnectMessagePosting({
          username,
          message: signerConnectResponse.message,
          publicKey: signerConnectResponse.publicKey,
          keyType: KeychainKeyTypes.posting,
        }),
      );
      dispatch(
        login({
          data: {
            key: 'posting',
            message: signerConnectResponse.message,
            method: KeychainKeyTypes.posting,
            username: username,
          },
          result: signerConnectResponse.message,
          publicKey: signerConnectResponse.publicKey,
          success: true,
        }),
      );
      if (signerConnectResponse.result.pendingSignatureRequests) {
        const pendingReqs =
          signerConnectResponse.result.pendingSignatureRequests[username];
        if (pendingReqs.length > 0) {
          await dispatch(addSignRequest(pendingReqs));
        }
      }
      if (signerConnectResponse.result.notifications) {
        const notifications =
          signerConnectResponse.result.notifications[username];
        if (notifications?.length > 0) {
          await dispatch(addBroadcastNotifications(notifications));
        }
      }
      await dispatch(signerConnectPosting(signerConnectResponse));
    } else {
      console.log('connectPosting Failed');
    }
  };

  const handleOnLoginSubmit = async () => {
    try {
      if (!active && !posting) alert(`Choose at least one login method!`);
      if (posting) await connectPosting();
      if (active) await connectActive();
    } catch (error) {
      alert(`Login Failed loginform 204 \n ${error.message}`);
    }
  };

  return (
    <div
      className="grid grid-cols-3  grid-rows-3 gap-4 h-screen w-screen"
      style={{ gridTemplateRows: '10vh 80vh 10vh' }}>
      <div className="bg-customDark grid grid-flow-col grid-rows-3 mx-auto col-start-2 row-start-2">
        <ul className="bg-customDark">
          <li>
            <img
              src="/img/KeychainModal.png"
              alt="Login with Hive Keychain"
              className="row-start-2"
              onClick={() => alert('Button clicked!')}
            />
          </li>
          <li className="pb-6">
            <a
              href="https://hive-keychain.com/"
              className="text-blue-500 underline underline-offset-4 flex justify-center items-center"
              target="_blank"
              rel="noopener noreferrer">
              Hive-KeyChain Link
            </a>
          </li>
          <li className="flex justify-center items-center w-[100%]">
            <InputGroup className="row-start-2 h-[15%] w-[85%] pb-4">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                placeholder={username !== '' ? username : 'Username'}
                aria-label="Username"
                aria-describedby="basic-addon2"
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={username}
                ref={inputRef}
              />

              <Button
                variant="outline-secondary"
                id="button-addon2"
                className="bg-sigvault-gold text-black"
                onClick={() => handleOnLoginSubmit()}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}>
                Login
              </Button>
            </InputGroup>
          </li>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: '20px',
            }}>
            Login with:
            <Form.Check
              type={'checkbox'}
              label={`Posting Key`}
              className="text-sigvault-cream"
              checked={posting}
              onChange={() => setPosting(!posting)}
            />
            <Form.Check
              type={'checkbox'}
              className="text-sigvault-cream"
              label={`Active Key`}
              checked={active}
              onChange={() => setActive(!active)}
            />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default HiveLogin;
