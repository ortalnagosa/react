import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { TRootState } from "../store/store";

const GlobalSpinner = () => {
  const isLoading = useSelector((state: TRootState) => state.loadingSlice.isLoading);

    if (!isLoading)  return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Spinner
        color="purple"
        aria-label="Global loading spinner"
        className="animate-spin transition-opacity duration-500 size-16"
      />
    </div>
  );
};

export default GlobalSpinner;
