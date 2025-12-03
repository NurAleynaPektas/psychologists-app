import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./AuthForm.module.css";
import { registerUser } from "../../firebase/authService";

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

      if (onSubmit) onSubmit(user);
    } catch (error) {
      console.error(error);
      alert("Registration failed: " + error.message);
    }
  };


  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className={styles.input}
          {...register("name")}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          {...register("email")}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className={styles.input}
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
