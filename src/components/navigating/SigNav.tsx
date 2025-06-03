import { useState } from 'react';
import LoginImage from '../modals/LoginImage';

const SigNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between bg-black">
          <Logo />
          <div className="hidden gap-6 lg:flex">
            <div className="mt-4 md:mt-2 text-right md:ml-auto">
              <nav className="text-2xl text-right text-sigvault-cream">
                <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                  <li>
                    <a href="/about" className="hover:underline">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/features" className="hover:underline">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="/pricing" className="hover:underline">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="/signup" className="hover:underline">
                      Sign Up
                    </a>
                  </li>
                  <li>
                    <button
                      className="bg-sigvault-gold text-black rounded-lg h-10 px-4 py-1 bottom-8 font-bold"
                      onClick={() => setIsOpen(true)}>
                      Login/User
                    </button>
                    <LoginImage isOpen={isOpen} setIsOpen={setIsOpen} />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        alt="Sigvault logo mark"
        src="https://c.animaapp.com/eCU0anp8/img/sigvault-logo-mark-final-complex-2@2x.png"
        loading="lazy"
      />
    </div>
  );
};
export default SigNav;
