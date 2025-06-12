import axios from 'axios';
import DOMPurify from 'dompurify';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, CircleAlert, Info, TriangleAlert } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { stripHtml, useAuth } from '../../Context/Context';
import { Toastify } from '../../utils/toastify';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000/';

interface LoginModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const imageRef = useRef<HTMLImageElement>(null);
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  let [password, setPassword] = useState('');
  let [verifyPassword, setVerifyPassword] = useState('');
  const [showVerify, setShowVerify] = useState(false);
  const [urlDynamic, setUrl] = useState(`${baseURL}login`);

  const { login } = useAuth();

  useEffect(() => {
    axios
      .get(urlDynamic)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [urlDynamic]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanEmail = DOMPurify.sanitize(email.trim());
    password = stripHtml(password);
    verifyPassword = stripHtml(verifyPassword);

    if (showVerify) {
      // Only validate passwords for registration
      if (verifyPassword !== password) {
        Toastify('error', 'Passwords do not match');
        return;
      }
    }

    axios
      .post(
        urlDynamic,
        { email: cleanEmail, password, verifyPassword },
        { withCredentials: true },
      )
      .then((response) => {
        Toastify('success', response.data.message || 'Login successful!');
        // Update auth context with user data
        login({ email });
        navigate('/dashboard');
        setIsOpen(false);
      })
      .catch((err) => {
        Toastify('error', err.response?.data?.message || 'Login failed!');
        console.error('Error:', err);
      });
  };

  const handleClear = () => {
    setPassword('');
    setVerifyPassword('');
    Toastify('info', 'password fields cleared');
  };

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur p-8 cursor-pointer">
              {/* Image Container (prevents modal close on image click) */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative flex justify-center items-center w-1/2">
                {/* Background Image */}
                <img
                  ref={imageRef}
                  src="/img/loginModal.png"
                  alt="Login and Register pop-up for Sigvault"
                  className="max-w-full h-auto cursor-pointer"
                />

                <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%]">
                  {/* Label Positioned Top-Left */}
                  <span className="absolute top-0 left-3 text-white text-xl font-bold mb-8">
                    E-mail Address
                  </span>
                  <br></br>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-[#917c67] text-red-400 bg-[#262425] px-4 py-2 pt-2 rounded-lg hover:scale-110 transition duration-300"
                  />
                  <br></br>
                  <br></br>
                  <span className="absolute top-{40%] left-3 text-white text-xl font-bold mb-8">
                    Password
                  </span>
                  <br></br>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                    className="w-full border border-[#917c67] text-red-400 bg-[#262425] px-4 py-2 pt-2 rounded-lg hover:scale-110 transition duration-300"
                  />

                  {showVerify && (
                    <>
                      <br></br>
                      <div className="relative w-[100%]">
                        <label className="position- left flex text-white text-xl font-bold mt-4 mb-2">
                          Verify Password
                        </label>
                        <input
                          type="password"
                          value={verifyPassword}
                          onChange={(e) => setVerifyPassword(e.target.value)}
                          required
                          className="w-full border border-[#917c67] text-red-400 bg-[#262425] px-4 py-2 pt-2 rounded-lg hover:scale-110 transition duration-300"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Login Button */}
                {!showVerify && (
                  <Button
                    type="submit"
                    className="w-[25%] border-none absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sigvault-gold text-sigvault-black px-4 py-2 rounded-lg font-extrabold">
                    Login
                  </Button>
                )}
                <p
                  onClick={() => handleClear()}
                  className="text-xl text-right underline w-[80%] border-none absolute top-[66%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sigvault-gold px-4 py-2 rounded-lg hover:text-sigvault-light-gold hover:scale-110 transition duration-300">
                  clear form
                </p>

                {showVerify && (
                  <Button
                    type="submit"
                    className="w-[25%] border-none absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sigvault-gold text-sigvault-black px-4 py-2 rounded-lg font-extrabold">
                    Register
                  </Button>
                )}
                {!showVerify && (
                  <p
                    onClick={() => {
                      setShowVerify((prev) => !prev);
                      setUrl((prevUrl) =>
                        prevUrl === `${baseURL}login` ? `${baseURL}` : prevUrl,
                      );
                    }}
                    className="text-xl text-center underline w-[35%] border-none absolute top-[66%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sigvault-gold px-4 py-2 rounded-lg hover:text-sigvault-light-gold hover:scale-110 transition duration-300">
                    or Register
                  </p>
                )}

                {showVerify && (
                  <p
                    onClick={() => {
                      setShowVerify(!showVerify);
                      handleClear();
                      if (urlDynamic !== `${baseURL}login`)
                        setUrl(`${baseURL}login`);
                    }}
                    className="text-xl text-center underline w-[35%] border-none absolute top-[66%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sigvault-gold px-4 py-2 rounded-lg hover:text-sigvault-light-gold hover:scale-110 transition duration-300">
                    or Login
                  </p>
                )}

                {/* Keychain Button */}
                <img
                  src="/img/keychain button.png"
                  alt="Login with Hive Keychain"
                  className="w-[45%] border-none absolute top-[88%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sigvault-gold px-4 py-2 rounded-lg hover:scale-110 transition duration-300"
                  onClick={() => alert('Button clicked!')}
                />
              </div>

              <ToastContainer
                position="top-left"
                autoClose={15000}
                icon={({ type }) => {
                  // theme is not used in this example but you could
                  switch (type) {
                    case 'info':
                      return <Info className="stroke-indigo-400" />;
                    case 'error':
                      return <CircleAlert className="stroke-red-500" />;
                    case 'success':
                      return <BadgeCheck className="stroke-green-500" />;
                    case 'warning':
                      return <TriangleAlert className="stroke-yellow-500" />;
                    default:
                      return null;
                  }
                }}
              />
            </motion.div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginModal;
