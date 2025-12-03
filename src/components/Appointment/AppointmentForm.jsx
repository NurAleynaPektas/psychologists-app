import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../Auth/AuthForm.module.css";
import { useAuth } from "../../context/AuthContext";

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Minimum 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  phone: yup
    .string()
    .required("Phone is required")
    .min(6, "Minimum 6 characters"),
  comment: yup
    .string()
    .required("Comment is required")
    .min(10, "Minimum 10 characters"),
});

export default function AppointmentForm({ psychologist, onSuccess }) {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      phone: "",
      comment: "",
    },
  });

  const submitHandler = async (data) => {
    
    console.log("Appointment request:", {
      ...data,
      psychologistName: psychologist?.name,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    alert("Your appointment request has been sent.");
    reset();

    if (onSuccess) onSuccess();
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
        <label className={styles.label} htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          className={styles.input}
          {...register("phone")}
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="comment">
          Comment
        </label>
        <textarea
          id="comment"
          className={styles.input}
          rows={3}
          {...register("comment")}
        />
        {errors.comment && (
          <p className={styles.error}>{errors.comment.message}</p>
        )}
      </div>

      <button
        className={styles.submitBtn}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send request"}
      </button>
    </form>
  );
}
