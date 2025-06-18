import { FloatingLabel, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { TupdateUser } from "../../types/editProfileUser";
import { updateProfileSchema } from "../../validations/profileSchema";


type EditUserModalProps = {
  show: boolean;
  onClose: () => void;
  initialData: TupdateUser;
  cardId: string;
  onCardUpdated: (formData: TupdateUser) => void;
};

const EditUserModal = ({
  show,
  onClose,
  initialData,
  cardId,
  onCardUpdated,
}: EditUserModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<TupdateUser>({
    resolver: joiResolver(updateProfileSchema),
    mode: "onChange",
  });
  

  useEffect(() => {
    if (initialData) {
      const cleanData: TupdateUser = {
        name: {
          first: initialData.name.first || "",
          middle: initialData.name.middle || "",
          last: initialData.name.last || "",
        },
        phone: initialData.phone || "",
        image: {
          url: initialData.image.url || "",
          alt: initialData.image.alt || "",
        },
        address: {
          state: initialData.address.state || "",
          country: initialData.address.country || "",
          city: initialData.address.city || "",
          street: initialData.address.street || "",
          houseNumber: initialData.address.houseNumber || "",
          zip: initialData.address.zip || "",
        },
      };

      reset(cleanData);
    }
  }, [initialData, reset]);
  

  const onSubmit = async (formData: TupdateUser) => {
 
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${cardId}`,
        formData,
        { headers: { "x-auth-token": token || "" } },
      );
      toast.success("הפרופיל עודכן בהצלחה!");
       onCardUpdated(formData);
      onClose();
    } catch (error) {
      console.error("שגיאה בעדכון:", error);
      toast.error("אירעה שגיאה בעדכון הפרופיל");
    }
  };
 
  

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Editing a profile</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FloatingLabel
            variant={"filled"}
            {...register("name.first")}
            label="First name"
          />
          {errors.name?.first && (
            <p className="text-red-500">{errors.name.first.message}</p>
          )}

          <FloatingLabel
            variant={"filled"}
            {...register("name.middle")}
            label="Middle name"
          />
          {errors.name?.middle && (
            <p className="text-red-500">{errors.name.middle.message}</p>
          )}

          <FloatingLabel
            variant={"filled"}
            {...register("name.last")}
            label="Last name"
          />
          {errors.name?.last && (
            <p className="text-red-500">{errors.name.last.message}</p>
          )}

          <FloatingLabel
            variant={"filled"}
            {...register("phone")}
            label="Phone"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}

          <FloatingLabel
            variant={"filled"}
            {...register("address.state")}
            label="State"
          />
          <FloatingLabel
            variant={"filled"}
            {...register("address.street")}
            label="Street"
          />
          <FloatingLabel
            variant={"filled"}
            type="number"
            {...register("address.houseNumber")}
            label="House number"
          />
          <FloatingLabel
            variant={"filled"}
            {...register("address.city")}
            label="City"
          />
          <FloatingLabel
            variant={"filled"}
            {...register("address.country")}
            label="Country"
          />
          <FloatingLabel
            variant={"filled"}
            type="number"
            {...register("address.zip")}
            label="Zip"
          />

          <FloatingLabel
            variant={"filled"}
            {...register("image.url")}
            label="Link to image"
          />
          <FloatingLabel
            variant={"filled"}
            {...register("image.alt")}
            label="Text to Image"
          />

          <div className="mt-4 flex justify-center gap-4">
            <Button type="submit" disabled={!isDirty || !isValid}>
              Save
            </Button>

            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </ModalBody>
      <ModalFooter />
    </Modal>
  );
};

export default EditUserModal;
