export const Footer: React.FC = () => {
  //======================================return
  return (
    <div className="w-full h-12 text-lg font-light center bg-blueGray-100 gap-x-4">
      &copy; {new Date().getFullYear()} <span>|</span> Find-Meaning
    </div>
  );
};
