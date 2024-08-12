import appLogo from "/logo.svg";
function Logo() {
  return (
    <div className="flex items-center gap-3 font-semibold">
      <img src={appLogo} alt="around-the-world-logo" />
      <p className="text-sm sm:text-lg">Around The World</p>
    </div>
  );
}

export default Logo;
