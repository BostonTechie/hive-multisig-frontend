import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useRef } from 'react';
import { toast } from 'react-toastify';

const notify = () => toast('Wow so easy !');

interface LoginImageProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginButton = {
  xMin: 30.5,
  xMax: 69.45,
  yMin: 55.3,
  yMax: 60.5,
};

const LoginImage: React.FC<LoginImageProps> = ({ isOpen, setIsOpen }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

    if (
      xPercent >= LoginButton.xMin &&
      xPercent <= LoginButton.xMax &&
      yPercent >= LoginButton.yMin &&
      yPercent <= LoginButton.yMax
    ) {
      console.log('Triggered special action!');
    }
    // Log the click position
    console.log(
      `Clicked at: X=${xPercent.toFixed(2)}% Y=${yPercent.toFixed(2)}%`,
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer">
          {/* Stop propagation to prevent modal from closing when clicking on the image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer',
              width: '50%',
            }}>
            <img
              ref={imageRef}
              src="/img/loginModal.png"
              alt="Login and Register pop-up for Sigvault"
              style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
              onClick={() => {
                handleClick;
                notify();
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginImage;
