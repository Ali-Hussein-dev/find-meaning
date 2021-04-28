export const Footer: React.FC = () => {
  //======================================return
  return (
    <div className="sticky bottom-0 z-[-1] center w-full h-12 text-lg bg-blueGray-100 gap-x-4 font-light">
      &copy; {new Date().getFullYear()} <span>|</span> Find-Meaning
    </div>
  );
};
