import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "../styles/AddSchool.module.css";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const fd = new FormData();
    for (let key in data) {
      if (key === "image") fd.append("image", data.image[0]);
      else fd.append(key, data[key]);
    }
    const res = await fetch("/api/schools", { method: "POST", body: fd });
    setLoading(false);
    if (res.ok) {
      alert("School added!");
      reset();
    } else {
      alert("Error saving school.");
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Add School</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input className={styles.inputField} placeholder="Name" {...register("name", { required: true })} />
        {errors.name && <small className={styles.error}>Name is required</small>}

        <input className={styles.inputField} placeholder="Address" {...register("address", { required: true })} />
        {errors.address && <small className={styles.error}>Address is required</small>}

        <input className={styles.inputField} placeholder="City" {...register("city", { required: true })} />
        {errors.city && <small className={styles.error}>City is required</small>}

        <input className={styles.inputField} placeholder="State" {...register("state", { required: true })} />
        {errors.state && <small className={styles.error}>State is required</small>}

        <input className={styles.inputField} type="number" placeholder="Contact" {...register("contact", { required: true })} />
        {errors.contact && <small className={styles.error}>Contact is required</small>}

        <input className={styles.inputField} type="email" placeholder="Email" {...register("email_id", { required: true })} />
        {errors.email_id && <small className={styles.error}>Email is required</small>}

        <input className={styles.inputField} type="file" accept="image/*" {...register("image", { required: true })} />
        {errors.image && <small className={styles.error}>Image is required</small>}

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </main>
  );
}
