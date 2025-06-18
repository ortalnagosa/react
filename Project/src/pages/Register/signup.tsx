import axios from "axios";
import { Button, FloatingLabel, HelperText, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../validations/FormSchema.joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Tsignup } from "../../types/signupType";
import Flex, { Aligns, FlexDirectionTypes } from "../../types/Flex";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Tsignup>({
    defaultValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
      email: "",
      password: "",

      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
      },
    },
    mode: "onChange",
    resolver: joiResolver(registerSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  const submitForm = async (data: Tsignup) => {
    console.log("Form submitted", data);
    setIsSubmitting(true);
    try {
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        data,
      );

      console.log("Success");
      toast.success("ההרשמה הושלמה בהצלחה");
      navigate("/login");
    } catch (error: any) {
      const msg = error?.response?.data?.message || "ההרשמה נכשלה. אנא נסה שוב";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex
      direction={FlexDirectionTypes.Col}
      justify={Aligns.CENTER}
      items={Aligns.CENTER}
      className=" h-screen w-screen "
    >
      <h1 className="mb-6 text-4xl font-bold text-green-300 dark:text-white">
        Register
      </h1>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="mt-3 flex w-full max-w-md flex-wrap items-center justify-center gap-2"
      >
        <FloatingLabel
          {...register("name.first")}
          variant="standard"
          label="first name"
          type="text"
          color={errors.name?.first ? "error" : undefined}
        />
        {errors.name?.first && (
          <p className="text-sm text-red-500">{errors.name.first.message}</p>
        )}

        <FloatingLabel
          {...register("name.middle")}
          variant="standard"
          label="middle name"
          type="text"
          color={errors.name?.middle ? "error" : undefined}
        />
        {errors.name?.middle && (
          <p className="text-sm text-red-500">{errors.name.middle.message}</p>
        )}

        <FloatingLabel
          {...register("name.last")}
          variant="standard"
          label="last name"
          type="text"
          color={errors.name?.last ? "error" : undefined}
        />
        {errors.name?.last && (
          <p className="text-sm text-red-500">{errors.name.last.message}</p>
        )}

        <FloatingLabel
          {...register("phone")}
          variant="standard"
          label="Phone"
          type="phone"
          color={errors.phone ? "error" : undefined}
        />
        {errors.phone && (
          <HelperText className="text-left" color="failure">
            {errors.phone?.message}
          </HelperText>
        )}

        <FloatingLabel
          {...register("email")}
          variant="standard"
          label="email"
          type="email"
          color={errors.email ? "error" : undefined}
        />

        {errors.email && (
          <HelperText className="text-left" color="failure">
            {errors.email.message}
          </HelperText>
        )}

        <FloatingLabel
          {...register("image.url")}
          variant="standard"
          label="image url"
          color={errors.image?.url ? "error" : undefined}
        />

        {errors.image?.url && (
          <HelperText className="text-left" color="failure">
            {errors.image.url.message}
          </HelperText>
        )}

        <FloatingLabel
          {...register("image.alt")}
          variant="standard"
          label="image alt"
          color={errors.image?.alt ? "error" : undefined}
        />

        {errors.image?.alt && (
          <HelperText className="text-left" color="failure">
            {errors.image.alt.message}
          </HelperText>
        )}

        <FloatingLabel
          {...register("address.state")}
          variant="standard"
          label="State"
          color={errors.address?.state ? "error" : undefined}
        />

        {errors.address?.state && (
          <HelperText className="text-left" color="failure">
            {errors.address.state.message}
          </HelperText>
        )}

        <FloatingLabel
          {...register("address.country")}
          variant="standard"
          label="Country"
          color={errors.address?.country ? "error" : undefined}
        />

        {errors.address?.country && (
          <HelperText className="text-left" color="failure">
            {errors.address.country.message}
          </HelperText>
        )}

        <FloatingLabel
          {...register("address.city")}
          variant="standard"
          label="City"
          color={errors.address?.city ? "error" : undefined}
        />

        {errors.address?.city && (
          <HelperText className="text-left" color="failure">
            {errors.address.city.message}
          </HelperText>
        )}

        <FloatingLabel
          {...register("address.street")}
          variant="standard"
          label="Street"
          color={errors.address?.street ? "error" : undefined}
        />

        {errors.address?.street && (
          <HelperText className="text-left" color="failure">
            {errors.address.street.message}
          </HelperText>
        )}

        <FloatingLabel
          {...register("address.houseNumber")}
          variant="standard"
          label="House Number"
          type="number"
          color={errors.address?.houseNumber ? "error" : undefined}
        />

        {errors.address?.houseNumber && (
          <HelperText className="text-left" color="failure">
            {errors.address.houseNumber.message}
          </HelperText>
        )}

        <FloatingLabel
          {...register("address.zip")}
          variant="standard"
          label="Zip Code"
          type="number"
          color={errors.address?.zip ? "error" : undefined}
        />

        {errors.address?.zip && (
          <HelperText className="text-left" color="failure">
            {errors.address.zip.message}
          </HelperText>
        )}

        <FloatingLabel
          {...register("password")}
          variant="standard"
          label="password"
          type="password"
          color={errors.password ? "error" : undefined}
        />

        {errors.password && (
          <HelperText className="text-left" color="failure">
            {errors.password.message}
          </HelperText>
        )}

        <div className="flex flex-col items-center gap-2">
          <div>
            <input
              type="checkbox"
              {...register("isBusiness")}
              id="isBusiness"
              className="h-4 w-4 rounded-sm text-green-800 transition-all"
            />
            <label htmlFor="isBusiness" className="m-2  dark:text-white">
              is Business
            </label>
          </div>

          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" /> Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Flex>
  );
};

export default Signup;
