const MyPage = () => {
  return (
    <div className="relative grid grid-cols-3 grid-rows-3 gap-4 rounded-lg text-center font-mono text-sm leading-6 font-bold text-white">
      <h1> hello </h1>
      <div className="absolute inset-0">
        <div className="h-full rounded-lg border text-black/10 dark:text-white/12.5 bg-[size:8px_8px] bg-top-left bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]"></div>
      </div>
      <div className="relative rounded-lg bg-fuchsia-500 p-4">01</div>
      <div className="relative rounded-lg bg-fuchsia-500 p-4">02</div>
      <div className="relative rounded-lg bg-fuchsia-500 p-4">03</div>
      <div className="relative rounded-lg bg-fuchsia-500 p-4">04</div>
      <div className="relative rounded-lg bg-fuchsia-500 p-4">05</div>
      <div className="relative rounded-lg bg-fuchsia-500 p-4">06</div>
      <div className="relative rounded-lg bg-fuchsia-500 p-4">07</div>
      <div className="relative rounded-lg bg-fuchsia-500 p-4">08</div>
      <div className="relative rounded-lg bg-fuchsia-500 p-4">09</div>
    </div>
  );
};

export default MyPage;
