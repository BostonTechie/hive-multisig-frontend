import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LoginImageProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const notify = () => toast('Wow so easy!');

const LoginImage: React.FC<LoginImageProps> = ({ isOpen, setIsOpen }) => {
  const imageRef = useRef<HTMLImageElement>(null);

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
              <img
                ref={imageRef}
                src="/img/loginModal.png"
                alt="Login and Register pop-up for Sigvault"
                className="max-w-full h-auto cursor-pointer"
                onClick={() => notify()}
              />
            </div>

            {/* Toast Notification */}
            <ToastContainer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginImage;
