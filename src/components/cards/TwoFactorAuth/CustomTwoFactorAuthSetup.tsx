import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/app/hooks';
import { AuthorityCard } from '../Account/AuthorityCard';
import { MultisigTwoFAHooks } from './Multisig2FAHooks';
const defaultBot = process.env.TWOFA_BOT;
export interface TwoFATabProp {
  isManageTwoFA: boolean;
}
export const CustomTwoFactorAuthSetup = ({ isManageTwoFA }: TwoFATabProp) => {
  const [originalActive, newActive] = MultisigTwoFAHooks.useActiveAuthority();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div>
      src/components/cards/TwoFactorAuth/CustomTwoFactorAuthSetup.tsx
      {isManageTwoFA ? (
        <div>
          <p className="justify-content-md-center">
            Removing the default bot <strong>@{`${defaultBot}`}</strong> will
            automatically reduce the threshold by its weight.
          </p>

          <p className="justify-content-md-center">
            You may customize the weight and remove the bots as you want. Make
            sure you know what you are doing before submitting the changes.
          </p>
        </div>
      ) : (
        <div>
          <p className="justify-content-md-center">
            {' '}
            To complete the Two Factor Authentication setup, it is required to
            add a multisig bot account in your account authorities.
          </p>
          <p className="justify-content-md-center">
            Add the 2FA bot to your authorities below and make sure to set the
            proper weight and threshold.
          </p>
          <p className="justify-content-md-center">
            Threshold must be at least equal to 2 for the 2FA to work properly.
          </p>
        </div>
      )}
      <div>
        <AuthorityCard authorityName="Active" />
      </div>
    </div>
  );
};
