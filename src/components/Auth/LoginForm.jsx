import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./AuthForm.module.css";
import { loginUser } from "../../firebase/authService";
import iziToast from "izitoast";

const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
});

export default function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (data) => {
    try {
      const user = await loginUser(data);
      console.log("Logged in:", user);

      
      iziToast.success({
        title: "Success",
        message: "You have logged in successfully.",
        position: "topRight",
      });

      if (onSubmit) onSubmit(user); 
    } catch (error) {
      console.error(error);

      
      iziToast.error({
        title: "Login failed",
        message: error.message || "Something went wrong. Please try again.",
        position: "topRight",
      });
     
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <p>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
      </p>

      <div className={styles.field}>
        <div className={styles.inputWrapper}>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder="Email"
            {...register("email")}
          />
        </div>
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <div className={styles.inputWrapper}>
          <input
            id="password"
            type="password"
            className={styles.input}
            placeholder="Password"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>

      <button
        className={styles.submitBtn}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}
