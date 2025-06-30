import "../App.css";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-[#E9F8FF]">
      <div className="h-16" id="navbarPlaceholder" />
      <div className="flex flex-1">
        <div className="w-[8.33%] lg:w-[21.4%] h-full" id="leftplaceholder" />
        {children}
      </div>
    </div>
  );
};

export default Layout;
