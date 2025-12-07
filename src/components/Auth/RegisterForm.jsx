import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./AuthForm.module.css";
import { registerUser } from "../../firebase/authService";
import iziToast from "izitoast";

const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Minimum 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
});

export default function RegisterForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitHandler = async (data) => {
    try {
      const user = await registerUser(data);
      console.log("Registered:", user);

     
      iziToast.success({
        title: "Welcome 🎉",
        message: "Your account has been created successfully.",
        position: "topRight",
      });

      reset(); 

      if (onSubmit) onSubmit(user);
    } catch (error) {
      console.error(error);

   
      iziToast.error({
        title: "Registration failed",
        message: error.message || "Something went wrong. Please try again.",
        position: "topRight",
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <p>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <div className={styles.field}>
        <input
          id="name"
          type="text"
          className={styles.input}
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <input
          id="email"
          type="email"
          className={styles.input}
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <input
          id="password"
          type="password"
          className={styles.input}
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button
        className={styles.submitBtn}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Sign Up"}
      </button>
    </form>
  );
}
