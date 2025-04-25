import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from '../page/LoginForm';
import { DarkGridAuth } from '../page/MyPage';
import { HomePage, SearchBar } from '../page/SearchPage';
import { SignRequestsPage } from '../page/SignRequestPage';
import { TransactionPage } from '../page/TransactionsPage';
import { TwoFactorAuthPage } from '../page/TwoFactorAuthPage';

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/:id" element={<HomePage />} />
        <Route path="/my" element={<DarkGridAuth />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/signRequest" element={<SignRequestsPage />} />
        <Route path="/twoFactor" element={<TwoFactorAuthPage />} />
        <Route path="/" element={<Navigate to={'/login'} />} />
      </Routes>
    </div>
  );
};

export default Routing;
