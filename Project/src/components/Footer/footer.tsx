import { Footer, FooterCopyright } from "flowbite-react";

const Ffooter = () => {
  return (
    <Footer
      container
      className="mt-3 flex flex-col items-center justify-center bg-green-300 py-4 text-center dark:bg-slate-800"
    >
      <FooterCopyright
        href="#"
        by="Ortal Nagosa"
        className="text-sm text-black dark:text-white"
      />
    </Footer>
  );
};

export default Ffooter;



