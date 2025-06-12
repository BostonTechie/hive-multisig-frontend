import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../../Context/Context';
import Hivelogin from '../page/HiveLogin';
import { Landing } from '../page/Landing';
import { DarkGridAuth } from '../page/MyPage';
import { HomePage, SearchBar } from '../page/SearchPage';
import { SigDashBoard } from '../page/SigDashboard';
import { SigHome } from '../page/SigHome';
import { SigVaultAdmin } from '../page/SigVaultAdmin';
import { SignRequestsPage } from '../page/SignRequestPage';
import { TransactionPage } from '../page/TransactionsPage';
import { TwoFactorAuthPage } from '../page/TwoFactorAuthPage';
import UnderConstruction from './UnderConst';

const AuthenticatedRoute = ({ element }: { element: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/landing" />;
};

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/:id"
          element={<AuthenticatedRoute element={<HomePage />} />}
        />
        <Route
          path="/dashboard"
          element={<AuthenticatedRoute element={<SigDashBoard />} />}
        />
        <Route
          path="/my"
          element={<AuthenticatedRoute element={<DarkGridAuth />} />}
        />{' '}
        <Route
          path="/admin"
          element={<AuthenticatedRoute element={<SigVaultAdmin />} />}
        />
        <Route
          path="/sig"
          element={<AuthenticatedRoute element={<SigHome />} />}
        />
        <Route
          path="/search"
          element={<AuthenticatedRoute element={<SearchBar />} />}
        />
        <Route
          path="/transaction"
          element={<AuthenticatedRoute element={<TransactionPage />} />}
        />
        <Route
          path="/signRequest"
          element={<AuthenticatedRoute element={<SignRequestsPage />} />}
        />
        <Route
          path="/twoFactor"
          element={<AuthenticatedRoute element={<TwoFactorAuthPage />} />}
        />
        {/* no auth routes */}
        <Route path="/login" element={<Hivelogin />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </div>
  );
};

export default Routing;
