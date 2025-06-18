import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { TRootState } from "../store/store";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

type RouteGuardProps = {
  children: ReactNode;
  isBiz?: boolean;
  isAdmin?: boolean;
};

const RouteGuard = (props: RouteGuardProps) => {
  const { children, isBiz = false, isAdmin = false } = props;
  const user = useSelector((state: TRootState) => state.userSlice.user);
  const location = useLocation();
  


  if (!user) {
    toast.dismiss();
     toast.error("עליך להתחבר כדי לגשת לעמוד זה");
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  if (isBiz && !(user.isBusiness)) {
    toast.dismiss();
    toast.error("אין לך הרשאה לעמוד זה (משתמש עסקי בלבד)");
    return <Navigate to="/" replace />;
  }
  if (isAdmin && !user.isAdmin) {
    toast.dismiss();
    toast.error("אין לך הרשאה לעמוד זה (משתמש אדמין בלבד)");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;
