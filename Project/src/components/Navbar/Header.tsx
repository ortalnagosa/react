import {
  DarkThemeToggle,
  TextInput,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TRootState } from "../../store/store";
import { userActions } from "../../store/userSlice";
import { searchActions } from "../../store/searchSlice";
import { loadingActions } from "../../store/loadingSlice";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: TRootState) => state.userSlice.user);

  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );

  return (
    <>
      <Navbar fluid rounded className="w-full bg-green-300 px-4">
        <NavbarBrand
          className="cursor-pointer"
          onClick={() => {
            dispatch(searchActions.setSearchWord(""));
            setTimeout(() => {
              navigate("/");
            }, 300);
          }}
        >
          <span className="text-2xl font-bold hover:scale-95 dark:text-white">
            Ortal's App
          </span>
        </NavbarBrand>

        <div className="flex items-center gap-2">
          <NavbarToggle />
        </div>

        <div className="hidden w-1/3 md:block">
          <TextInput
            rightIcon={MdSearch}
            value={searchWord}
            onChange={(e) =>
              dispatch(searchActions.setSearchWord(e.target.value))
            }
            placeholder="Search"
          />
        </div>

        <NavbarCollapse>
          <div className="mb-3 md:hidden">
            <TextInput
              rightIcon={MdSearch}
              value={searchWord}
              onChange={(e) =>
                dispatch(searchActions.setSearchWord(e.target.value))
              }
              placeholder="Search"
            />
          </div>

          <div className="flex flex-col gap-7 text-lg font-light dark:text-white md:flex-row md:items-center ">
            <Link to="/about" className="hover:scale-95">
              About
            </Link>

            {user && (
              <>
                <Link to="/favourites" className="hover:scale-95">
                  Favourites
                </Link>
                {user.isBusiness && (
                  <Link to="/my-card" className="hover:scale-95">
                    My Cards
                  </Link>
                )}
              </>
            )}

            {user === null ? (
              <>
                <Link to="/signup">
                  <button className="hover:scale-95">SIGNUP</button>
                </Link>

                <Link to="/login">
                  <button className="hover:scale-95">LOGIN</button>
                </Link>
              </>
            ) : (
              <>
                <button
                  className="hover:scale-95"
                  onClick={() => {
                    dispatch(loadingActions.startLoading());
                    dispatch(userActions.logout());
                    localStorage.removeItem("token");
                    dispatch(searchActions.setSearchWord(""));
                    setTimeout(() => {
                      dispatch(loadingActions.stopLoading());
                      navigate("/login");
                    }, 1000);
                  }}
                >
                  LOGOUT
                </button>

                <Link to="/profile">
                  <img
                    src={
                      user.image.url ||
                      "https://dalicanvas.co.il/wp-content/uploads/2022/10/%D7%AA%D7%9E%D7%95%D7%A0%D7%94-%D7%9B%D7%9C%D7%91-%D7%A8%D7%95%D7%9E%D7%A0%D7%98%D7%99.jpg"
                    }
                    alt={user.image.alt || "profile"}
                    className="h-8 w-8 rounded-full border-2 border-white object-cover hover:scale-95"
                  />
                </Link>
              </>
            )}

            <DarkThemeToggle />
          </div>
        </NavbarCollapse>
      </Navbar>
    </>
  );
}
