import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "./page.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";

export type AIFormData = {
  prompt: string;
  promptType: string;
  modelName1: string;
  text1?: string;
  image1?: FileList | null;
  modelName2: string;
  text2?: string;
  image2?: FileList | null;
  modelName3: string;
  text3?: string;
  image3?: FileList | null;
  modelName4: string;
  text4?: string;
  image4?: FileList | null;
};

const FormComponent: React.FC = () => {
  const { control, handleSubmit, reset, watch } = useForm<AIFormData>({
    defaultValues: {
      prompt: "",
      promptType: "",
      modelName1: "",
      text1: "",
      image1: null,
      modelName2: "",
      text2: "",
      image2: null,
      modelName3: "",
      text3: "",
      image3: null,
      modelName4: "",
      text4: "",
      image4: null,
    },
  });
  const [promptType, setPromptType] = useState("text");
  const router = useRouter();

  const onSubmit = async (data: AIFormData) => {
    const formSubmitData = new FormData();

    formSubmitData.append("prompt", data.prompt);
    formSubmitData.append("promptType", data.promptType);
    formSubmitData.append("modelName1", data.modelName1);
    if (data.text1) formSubmitData.append("text1", data.text1);
    if (data.image1) formSubmitData.append("image1", data.image1[0]);
    formSubmitData.append("modelName2", data.modelName2);
    if (data.text2) formSubmitData.append("text2", data.text2);
    if (data.image2) formSubmitData.append("image2", data.image2[0]);
    formSubmitData.append("modelName3", data.modelName3);
    if (data.text3) formSubmitData.append("text3", data.text3);
    if (data.image3) formSubmitData.append("image3", data.image3[0]);
    formSubmitData.append("modelName4", data.modelName4);
    if (data.text4) formSubmitData.append("text4", data.text4);
    if (data.image4) formSubmitData.append("image4", data.image4[0]);

    try {
      const response = await axios.post("/api/submit", formSubmitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      toast.success("Form submitted successfully");
    } catch (error) {
      toast.error("Form submission failed");
    } finally {
      reset();
      router.refresh();
    }
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

      <div className={styles.formGroup}>
        <Controller
          name="prompt"
          control={control}
          defaultValue=""
          rules={{ required: "Prompt name is required" }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles.section}>
              <label htmlFor="prompt">AI Prompt</label>
              <input {...field} id="prompt" className={styles.input} />
              {error && <div className={styles.error}>{error.message}</div>}
            </div>
          )}
        />
      </div>

      {promptType === "text" && (
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
                  {error && <div className={styles.error}>{error.message}</div>}
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
                  {error && <div className={styles.error}>{error.message}</div>}
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
                  {error && <div className={styles.error}>{error.message}</div>}
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
                  {error && <div className={styles.error}>{error.message}</div>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="modelName3"
              control={control}
              defaultValue=""
              rules={{ required: "Model name is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="modelName3">Model Name 3</label>
                  <input {...field} id="modelName3" className={styles.input} />
                  {error && <div className={styles.error}>{error.message}</div>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="text3"
              control={control}
              defaultValue=""
              rules={{ required: "Text is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="text3">Text 3</label>
                  <textarea {...field} id="text3" className={styles.textarea} />
                  {error && <div className={styles.error}>{error.message}</div>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="modelName4"
              control={control}
              defaultValue=""
              rules={{ required: "Model name is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="modelName4">Model Name 4</label>
                  <input {...field} id="modelName4" className={styles.input} />
                  {error && <div className={styles.error}>{error.message}</div>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="text4"
              control={control}
              defaultValue=""
              rules={{ required: "Text is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="text4">Text 4</label>
                  <textarea {...field} id="text4" className={styles.textarea} />
                  {error && <div className={styles.error}>{error.message}</div>}
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
                  {error && <div className={styles.error}>{error.message}</div>}
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
                    accept=".png, .jpg, .jpeg"
                  />
                  {error && <div className={styles.error}>{error.message}</div>}
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
                  {error && <div className={styles.error}>{error.message}</div>}
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
                    accept=".png, .jpg, .jpeg"
                  />
                  {error && <div className={styles.error}>{error.message}</div>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="modelName3"
              control={control}
              defaultValue=""
              rules={{ required: "Model name is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="modelName3">Model Name 3</label>
                  <input {...field} id="modelName3" className={styles.input} />
                  {error && <div className={styles.error}>{error.message}</div>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="image3"
              control={control}
              defaultValue={undefined}
              rules={{ required: "Image upload is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="image3">Image Upload 3</label>
                  <input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files)}
                    id="image3"
                    className={styles.fileInput}
                    accept=".png, .jpg, .jpeg"
                  />
                  {error && <div className={styles.error}>{error.message}</div>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="modelName4"
              control={control}
              defaultValue=""
              rules={{ required: "Model name is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="modelName4">Model Name 4</label>
                  <input {...field} id="modelName4" className={styles.input} />
                  {error && <div className={styles.error}>{error.message}</div>}
                </div>
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Controller
              name="image4"
              control={control}
              defaultValue={undefined}
              rules={{ required: "Image upload is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="image4">Image Upload 4</label>
                  <input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files)}
                    id="image4"
                    className={styles.fileInput}
                    accept=".png, .jpg, .jpeg"
                  />
                  {error && <div className={styles.error}>{error.message}</div>}
                </div>
              )}
            />
          </div>
        </>
      )}

      <div className={styles.formGroup}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
