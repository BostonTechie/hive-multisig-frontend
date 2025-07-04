import '../../css/style.css';
import FooterNav from '../navigating/Footer';
import SigNav from '../navigating/SigNav';
export const Landing = () => {
  return (
    <>
      <div className="flex w-full">
        <div className="grid-rows-2  w-full">
          <div className="fixed w-full">
            <SigNav />
          </div>
          <div>
            <img
              src="/img/SigBackgroundLanding.png"
              alt="Login and Register pop-up for Sigvault"
              className="w-full h-auto cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <FooterNav />
      </div>
    </>
  );
};
