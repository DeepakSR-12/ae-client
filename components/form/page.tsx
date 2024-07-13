import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./page.module.scss";
import toast from "react-hot-toast";

type FormData = {
  prompt: string;
  promptType: string;
  modelName1: string;
  text1?: string;
  image1?: FileList;
  modelName2: string;
  text2?: string;
  image2?: FileList;
};

const FormComponent: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const [promptType, setPromptType] = useState("text");

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
    reset();
    toast.success("Form submitted successfully");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="promptType">Prompt Type</label>
        <Controller
          name="promptType"
          control={control}
          defaultValue="text"
          render={({ field }) => (
            <select
              {...field}
              id="promptType"
              onChange={(e) => {
                field.onChange(e);
                setPromptType(e.target.value);
              }}
              className={styles.select}
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
            </select>
          )}
        />
      </div>

      {promptType === "text" && (
        <>
          <div className={styles.formGroup}>
            <Controller
              name="prompt"
              control={control}
              defaultValue=""
              rules={{ required: "Prompt name is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="prompt">AI Prompt</label>
                  <input {...field} id="prompt" className={styles.input} />
                  {error && <p className={styles.error}>{error.message}</p>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="modelName1"
              control={control}
              defaultValue=""
              rules={{ required: "Model name is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="modelName1">Model Name 1</label>
                  <input {...field} id="modelName1" className={styles.input} />
                  {error && <p className={styles.error}>{error.message}</p>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="text1"
              control={control}
              defaultValue=""
              rules={{ required: "Text is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="text1">Text 1</label>
                  <textarea {...field} id="text1" className={styles.textarea} />
                  {error && <p className={styles.error}>{error.message}</p>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="modelName2"
              control={control}
              defaultValue=""
              rules={{ required: "Model name is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="modelName2">Model Name 2</label>
                  <input {...field} id="modelName2" className={styles.input} />
                  {error && <p className={styles.error}>{error.message}</p>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="text2"
              control={control}
              defaultValue=""
              rules={{ required: "Text is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="text2">Text 2</label>
                  <textarea {...field} id="text2" className={styles.textarea} />
                  {error && <p className={styles.error}>{error.message}</p>}
                </div>
              )}
            />
          </div>
        </>
      )}

      {promptType === "image" && (
        <>
          <div className={styles.formGroup}>
            <Controller
              name="modelName1"
              control={control}
              defaultValue=""
              rules={{ required: "Model name is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="modelName1">Model Name 1</label>
                  <input {...field} id="modelName1" className={styles.input} />
                  {error && <p className={styles.error}>{error.message}</p>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="image1"
              control={control}
              defaultValue={undefined}
              rules={{ required: "Image upload is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="image1">Image Upload 1</label>
                  <input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files)}
                    id="image1"
                    className={styles.fileInput}
                  />
                  {error && <p className={styles.error}>{error.message}</p>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="modelName2"
              control={control}
              defaultValue=""
              rules={{ required: "Model name is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="modelName2">Model Name 2</label>
                  <input {...field} id="modelName2" className={styles.input} />
                  {error && <p className={styles.error}>{error.message}</p>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="image2"
              control={control}
              defaultValue={undefined}
              rules={{ required: "Image upload is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="image2">Image Upload 2</label>
                  <input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files)}
                    id="image2"
                    className={styles.fileInput}
                  />
                  {error && <p className={styles.error}>{error.message}</p>}
                </div>
              )}
            />
          </div>
        </>
      )}

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default FormComponent;
