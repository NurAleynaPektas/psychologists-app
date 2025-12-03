import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./AuthForm.module.css";
import { loginUser } from "../../firebase/authService";

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

      if (onSubmit) onSubmit(user);
    } catch (error) {
      console.error(error);
      alert("Login failed: " + error.message);
    }
  };


  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="email"
            type="email"
            className={styles.input}
            {...register("email")}
          />
        </div>
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <div className={styles.inputWrapper}>
          <input
            id="password"
            type="password"
            className={styles.input}
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
