import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import Flex, { Aligns, FlexDirectionTypes } from "../../types/Flex";
import { Button } from "flowbite-react";
import { useState } from "react";
import EditUserModal from "./editProfile";
import { userActions } from "../../store/userSlice";
import { TupdateUser } from "../../types/editProfileUser";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.userSlice.user);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  if (!user) return null;

  const handleUserUpdated = (formData: TupdateUser) => {
    dispatch(
      userActions.setUser({
        ...user,
        ...formData,
        name: { ...user.name, ...formData.name },
        address: { ...user.address, ...formData.address },
        image: { ...user.image, ...formData.image },
      }),
    );
    setOpenModal(false);
  };

  return (
    <Flex
      direction={FlexDirectionTypes.Col}
      justify={Aligns.START}
      items={Aligns.CENTER}
      className="animate-fade-in h-screen w-screen dark:text-white"
    >
      <h1 className="m-4 text-4xl font-bold">Profile</h1>

      <div className="mt-4 flex w-full max-w-md flex-col items-center rounded-md border-2 border-black bg-white/5 p-4 shadow-md dark:border-white">
        <div className="mb-4 w-fit rounded-md border-2 border-black p-2 dark:border-white">
          <img
            src={
              user.image.url ||
              "https://dalicanvas.co.il/wp-content/uploads/2022/10/%D7%AA%D7%9E%D7%95%D7%A0%D7%94-%D7%9B%D7%9C%D7%91-%D7%A8%D7%95%D7%9E%D7%A0%D7%98%D7%99.jpg"
            }
            alt={user.image.alt || "Profile picture"}
            className="m-2 h-44 w-44 rounded-md dark:bg-white"
          />
        </div>

        <div className="m-3 w-fit text-lg">
          <h2>
            <span className="font-bold">Name:</span> {user.name.first}
            {user.name.middle} {user.name.last}
          </h2>

          <h2>
            <span className="font-bold">Email:</span>
            <a href={`mailto:${user.email}`} className="hover:underline">
              {user.email}
            </a>
          </h2>

          <h2>
            <span className="font-bold">Phone:</span> {user.phone}
          </h2>

          <h2>
            <span className="font-bold">Auth Level:</span>{" "}
            {user.isAdmin ? "Admin" : user.isBusiness ? "Business" : "Normal"}
          </h2>

          <h2>
            <span className="font-bold">Address:</span> {user.address.street}{" "}
            {user.address.houseNumber}, {user.address.city},{" "}
            {user.address.country}, {user.address.zip}
          </h2>
        </div>

        <Button onClick={() => setOpenModal(true)}> Edit Profile</Button>
      </div>

      <EditUserModal
        show={openModal}
        onClose={() => setOpenModal(false)}
        initialData={user}
        cardId={user._id}
        onCardUpdated={handleUserUpdated}
      />
    </Flex>
  );
};

export default Profile;
