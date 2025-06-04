import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginImageProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const notify = () => toast('Wow so easy!');

const LoginImage: React.FC<LoginImageProps> = ({ isOpen, setIsOpen }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [showVerify, setShowVerify] = useState(false);

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
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
                onClick={() => notify()}
              />

              <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%]">
                {/* Label Positioned Top-Left */}
                <span className="absolute top-0 left-3 text-white text-xl font-bold mb-8">
                  E-mail Address
                </span>
                <br></br>

                <input
                  type="email"
                  className="w-full border border-[#917c67] text-[#262425] bg-[#262425] px-4 py-2 pt-2 rounded-lg hover:bg-sigvault-light-gold hover:scale-110 transition duration-300"
                />
                <br></br>
                <br></br>
                <span className="absolute top-{40%] left-3 text-white text-xl font-bold mb-8">
                  Password
                </span>
                <br></br>

                <input
                  type="password"
                  className="w-full border border-[#917c67] text-[#262425] bg-[#262425] px-4 py-2 pt-2 rounded-lg hover:bg-sigvault-light-gold hover:scale-110 transition duration-300"
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
                        className="w-full border border-[#917c67] text-[#262425] bg-[#262425] px-4 py-2 rounded-lg transition duration-300"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Login Button */}
              {!showVerify && (
                <Button className="w-[25%] border-none absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sigvault-gold text-sigvault-black px-4 py-2 rounded-lg font-extrabold">
                  Login
                </Button>
              )}

              {showVerify && (
                <Button className="w-[25%] border-none absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sigvault-gold text-sigvault-black px-4 py-2 rounded-lg font-extrabold">
                  Register
                </Button>
              )}

              <p
                onClick={() => setShowVerify(!showVerify)}
                className="text-xl text-center underline w-[35%] border-none absolute top-[66%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sigvault-gold px-4 py-2 rounded-lg hover:text-sigvault-light-gold hover:scale-110 transition duration-300">
                or Register
              </p>

              {/* Keychain Button */}
              <img
                src="/img/keychain button.png"
                alt="Login with Hive Keychain"
                className="w-[45%] border-none absolute top-[88%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sigvault-gold px-4 py-2 rounded-lg hover:scale-110 transition duration-300"
                onClick={() => alert('Button clicked!')}
              />
            </div>

            <ToastContainer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginImage;
