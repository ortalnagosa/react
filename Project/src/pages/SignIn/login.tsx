import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel, HelperText } from "flowbite-react";
import { loginSchema } from "../../validations/loginSchema.joi";
import { useForm } from "react-hook-form";
import axios from "axios";
import Flex, { Aligns, FlexDirectionTypes } from "../../types/Flex";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userActions } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const initialFormData = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: "onChange",
    resolver: joiResolver(loginSchema),
  });

  const submitForm = async (form: typeof initialFormData) => {
    try {
      const token = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        form,
      );

      localStorage.setItem("token", token.data);
      const parsedToken = JSON.parse(atob(token.data.split(".")[1]));
      axios.defaults.headers.common["x-auth-token"] = token.data;

      const res = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
          parsedToken._id,
      );
      dispatch(userActions.login(res.data));

      nav("/");
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("הכניסה נכשלה");
    }
  };

  return (
    <Flex
      direction={FlexDirectionTypes.Col}
      justify={Aligns.CENTER}
      items={Aligns.CENTER}
      className=" h-screen w-screen"
    >
      <h1 className="mb-6 text-3xl font-bold text-green-300 dark:text-white sm:text-4xl">
        Login
      </h1>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex w-full max-w-md flex-col gap-2 px-4 sm:w-3/4 md:w-1/2 lg:w-1/4"
      >
        <FloatingLabel
          {...register("email")}
          variant="standard"
          label="email"
          type="email"
          color={errors.email ? "error" : "success"}
        />

        {errors.email && (
          <HelperText className="text-left" color="failure">
            {errors.email.message}
          </HelperText>
        )}

        <FloatingLabel
          {...register("password")}
          variant="standard"
          label="password"
          type="password"
          color={errors.password ? "error" : "success"}
        />

        {errors.password?.message && (
          <HelperText className="text-left" color="failure">
            {errors.password.message}
          </HelperText>
        )}

        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
      </form>
    </Flex>
  );
};

export default Login;
