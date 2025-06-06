import '../../css/style.css';
import SigNav from '../navigating/SigNav';

export const SigDashBoard = () => {
  return (
    <>
      <div className="flex w-full">
        <div className="grid-rows-2  w-full">
          <div className="fixed w-full">
            <SigNav />
          </div>
          <div>
            <img
              src="/img/SigBackgroundDashboard.png"
              alt="Dashboard page for Sigvault"
              className="w-full h-auto cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};
