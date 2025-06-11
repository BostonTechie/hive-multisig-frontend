import { Navigate, Route, Routes } from 'react-router-dom';
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

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/:id" element={<HomePage />} />
        <Route path="/dashboard" element={<SigDashBoard />} />
        <Route path="/my" element={<DarkGridAuth />} />
        <Route path="/admin" element={<SigVaultAdmin />} />
        <Route path="/sig" element={<SigHome />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/login" element={<Hivelogin />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/signRequest" element={<SignRequestsPage />} />
        <Route path="/twoFactor" element={<TwoFactorAuthPage />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Navigate to="/landing" replace />} />
        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </div>
  );
};

export default Routing;
