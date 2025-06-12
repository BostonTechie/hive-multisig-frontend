import { useAuth } from '../../Context/Context';

const FooterNav = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <div className=" bg-black grid grid-cols-8 gap-4 min-h-min 100">
        <ul className="col-start-2">
          <li>
            <Logo />
          </li>
          <li>
            <h3 className="text-sigvault-cream">
              © 2025 SigVault, all rights reserved
            </h3>
          </li>
        </ul>
        <ul className="col-start-4 pt-[15%]">
          <li>
            <h1 className="text-sigvault-cream font-bold ">Help</h1>
          </li>
        </ul>
        <ul className="col-start-5 pt-[15%]">
          <li>
            <h3 className="text-sigvault-cream font-bold">Offerings</h3>
          </li>
        </ul>
        <ul className="col-start-6 pt-[15%]">
          <li>
            <h3 className="text-sigvault-cream font-bold">Contact</h3>
          </li>
        </ul>
        <ul className="col-start-7 pt-[15%]">
          <li>
            <h3 className="text-sigvault-cream font-bold">Partner with Us</h3>
          </li>
        </ul>
      </div>
    </>
  );
};

const Logo = () => {
  return (
    <div className="flex items-center gap-2 ">
      <img
        className="w-[70%] my-6"
        alt="Sigvault logo mark"
        src="https://c.animaapp.com/eCU0anp8/img/sigvault-logo-mark-final-complex-2@2x.png"
        loading="lazy"
      />
    </div>
  );
};

export default FooterNav;
