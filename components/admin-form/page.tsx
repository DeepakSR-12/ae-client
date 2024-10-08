import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, Button, Upload, Image as AntImage } from "antd";
import { TypeAnimation } from "react-type-animation";
import styles from "./page.module.scss";
import {
  cardBackgroundColors,
  convertUrlsToFiles,
  dalleModels,
  imageModelsLabelValue,
  modelTypes,
  promptTypeOptions,
  textModelsLabelValue,
} from "@/utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export type AIFormData = {
  promptType: string;
  prompt: string;
  modelName1: string;
  text1?: string;
  image1?: string;
  imageUpload1?: File | null;
  modelName2: string;
  text2?: string;
  image2?: string;
  imageUpload2?: File | null;
  modelName3: string;
  text3?: string;
  image3?: string;
  imageUpload3?: File | null;
  modelName4: string;
  text4?: string;
  image4?: string;
  imageUpload4?: File | null;
};

const AdminFormComponent: React.FC = () => {
  const form = useForm<AIFormData>({
    defaultValues: {
      promptType: "text",
      prompt: "",
      modelName1: "",
      text1: "",
      image1: "",
      imageUpload1: null,
      modelName2: "",
      text2: "",
      image2: "",
      imageUpload2: null,
      modelName3: "",
      text3: "",
      image3: "",
      imageUpload3: null,
      modelName4: "",
      text4: "",
      image4: "",
      imageUpload4: null,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = form;

  const prompt = watch("prompt");
  const promptType = watch("promptType");
  const textFields = [
    watch("text1"),
    watch("text2"),
    watch("text3"),
    watch("text4"),
  ];
  const imageFields = [
    watch("image1"),
    watch("image2"),
    watch("image3"),
    watch("image4"),
  ];
  const [isTextGenerating, setIsTextGenerating] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const [isImageGenerating, setIsImageGenerating] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const refs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const isAnyOneTextGenerating = isTextGenerating.some(
    (isGenerating) => isGenerating
  );

  const isAnyOneImageGenerating = isImageGenerating.some(
    (isGenerating) => isGenerating
  );

  const onSubmit = async (data: AIFormData) => {
    if (promptType === "imageUpload") {
      if (
        !data.imageUpload1 ||
        !data.imageUpload2 ||
        !data.imageUpload3 ||
        !data.imageUpload4
      ) {
        if (!data.imageUpload1) {
          toast.error("Image Upload 1 is required");
          return;
        }
        if (!data.imageUpload2) {
          toast.error("Image Upload 2 is required");
          return;
        }
        if (!data.imageUpload3) {
          toast.error("Image Upload 3 is required");
          return;
        }
        if (!data.imageUpload4) {
          toast.error("Image Upload 4 is required");
          return;
        }

        return;
      }
    }

    const formSubmitData = new FormData();

    formSubmitData.append("prompt", data.prompt);
    formSubmitData.append("promptType", data.promptType);
    formSubmitData.append("modelName1", modelTypes[data.modelName1]);
    if (data.text1) formSubmitData.append("text1", data.text1);
    formSubmitData.append("modelName2", modelTypes[data.modelName2]);
    if (data.text2) formSubmitData.append("text2", data.text2);
    formSubmitData.append("modelName3", modelTypes[data.modelName3]);
    if (data.text3) formSubmitData.append("text3", data.text3);
    formSubmitData.append("modelName4", modelTypes[data.modelName4]);
    if (data.text4) formSubmitData.append("text4", data.text4);

    // Convert image URLs to File objects and append them to form data
    const imageUrls = {
      image1: data.image1 ?? "",
      image2: data.image2 ?? "",
      image3: data.image3 ?? "",
      image4: data.image4 ?? "",
    };

    const imageFiles = await convertUrlsToFiles(imageUrls);

    data.imageUpload1
      ? formSubmitData.append("imageUpload1", data.imageUpload1)
      : imageFiles.image1
      ? formSubmitData.append("image1", imageFiles.image1)
      : null;

    data.imageUpload2
      ? formSubmitData.append("imageUpload2", data.imageUpload2)
      : imageFiles.image2
      ? formSubmitData.append("image2", imageFiles.image2)
      : null;

    data.imageUpload3
      ? formSubmitData.append("imageUpload3", data.imageUpload3)
      : imageFiles.image3
      ? formSubmitData.append("image3", imageFiles.image3)
      : null;

    data.imageUpload4
      ? formSubmitData.append("imageUpload4", data.imageUpload4)
      : imageFiles.image4
      ? formSubmitData.append("image4", imageFiles.image4)
      : null;

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
    }
  };

  const generateText = async (modelName: string, index: number) => {
    const newIsTextGenerating = [...isTextGenerating];
    newIsTextGenerating[index] = true;
    setIsTextGenerating(newIsTextGenerating);
    try {
      if (!prompt) {
        toast.error(`Prompt is required`);
        return;
      }

      if (!modelName) {
        toast.error(`Model Name is required`);
        return;
      }

      const response = await axios.post("/api/text", {
        prompt,
        modelName,
      });

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      setValue(`text${index + 1}` as keyof AIFormData, response.data.text);
    } catch (error) {
      toast.error(`Text generation failed`);
    } finally {
      setIsTextGenerating([false, false, false, false]);
    }
  };

  const generateImage = async (modelName: string, index: number) => {
    const newIsImageGenerating = [...isImageGenerating];
    newIsImageGenerating[index] = true;
    setIsImageGenerating(newIsImageGenerating);

    try {
      if (!prompt) {
        toast.error(`Prompt is required`);
        return;
      }

      if (!modelName) {
        toast.error(`Model Name is required`);
        return;
      }

      const response = await axios.post("/api/image", {
        prompt,
        modelName,
      });

      if (!response.data) {
        throw new Error("Network response was not ok");
      }

      setValue(
        `image${index + 1}` as keyof AIFormData,
        dalleModels.includes(modelName)
          ? `data:image/png;base64,${response.data.imageUrl}`
          : response.data.imageUrl
      );
    } catch (error) {
      toast.error(`Image generation failed`);
    } finally {
      setIsImageGenerating([false, false, false, false]);
    }
  };

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const renderModelSection = (
    modelName: string,
    item: string | undefined,
    index: number,
    type: "text" | "image" | "imageUpload"
  ) => {
    const imageUploaded = watch(`imageUpload${index + 1}` as any);
    return (
      <div
        className={styles.modelSection}
        key={`${modelName}-${item}`}
        style={{ background: cardBackgroundColors[index] }}
      >
        <Controller
          name={modelName as keyof AIFormData}
          control={control}
          rules={{ required: `Model name is required` }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className={styles.chooseModelSection}>
              <div className={styles.label}>Model:</div>
              <div style={{ width: "100%" }}>
                <Select
                  className={styles.select}
                  placeholder="Choose an AI model"
                  value={value || null}
                  onChange={(selected) => {
                    setValue(`text${index + 1}` as keyof AIFormData, "");
                    onChange(selected);
                  }}
                  options={
                    promptType === "text"
                      ? textModelsLabelValue
                      : imageModelsLabelValue
                  }
                />
                {error && <div className={styles.error}>{error.message}</div>}
              </div>
            </div>
          )}
        />
        {type === "text" ? (
          <div
            ref={refs[index]}
            style={{
              display: "flex",
              overflow: "auto",
              justifyContent: item ? "flex-start" : "center",
              alignItems: item ? "flex-start" : "center",
              height: "100%",
            }}
          >
            {item ? (
              <TypeAnimation
                key={item}
                splitter={(str) => str.split(/(?= )/)}
                sequence={[item]}
                wrapper="span"
                cursor={true}
                speed={60}
                repeat={1}
                style={{ display: "inline-block" }}
              />
            ) : (
              <div className={styles.generateButton}>
                <Button
                  loading={isTextGenerating[index]}
                  disabled={
                    isTextGenerating[index] ||
                    isSubmitting ||
                    isAnyOneTextGenerating
                  }
                  onClick={() =>
                    // @ts-ignore
                    generateText(watch(`${modelName}`), index)
                  }
                >
                  Generate
                </Button>
              </div>
            )}
          </div>
        ) : type === "image" ? (
          <div
            style={{
              display: "flex",
              overflow: "auto",
              justifyContent: item ? "flex-start" : "center",
              alignItems: item ? "flex-start" : "center",
              height: "100%",
            }}
          >
            {item ? (
              <div className={styles.imageCard}>
                <Image
                  src={item}
                  layout="fill"
                  objectFit="cover"
                  alt="Mountains"
                />
              </div>
            ) : (
              <div className={styles.generateButton}>
                <Button
                  loading={isImageGenerating[index]}
                  disabled={
                    isImageGenerating[index] ||
                    isSubmitting ||
                    isAnyOneImageGenerating
                  }
                  onClick={() =>
                    // @ts-ignore
                    generateImage(watch(`${modelName}`), index)
                  }
                >
                  Generate
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              overflow: "auto",
              justifyContent: item ? "flex-start" : "center",
              alignItems: item ? "flex-start" : "center",
              height: "100%",
              position: "relative",
            }}
          >
            <Upload
              maxCount={1}
              listType="picture-card"
              showUploadList={{
                showRemoveIcon: false,
              }}
              onPreview={handlePreview}
              onChange={(e) =>
                setValue(
                  `imageUpload${index + 1}` as keyof AIFormData,
                  e.file.originFileObj
                )
              }
            >
              {uploadButton}
            </Upload>
            {previewImage && (
              <AntImage
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </div>
        )}

        {item && type === "text" ? (
          <div style={{ display: "flex", marginTop: "auto" }}>
            <div className={styles.generateButton}>
              <Button
                loading={isTextGenerating[index]}
                disabled={
                  isTextGenerating[index] ||
                  isSubmitting ||
                  isAnyOneTextGenerating
                }
                onClick={() =>
                  // @ts-ignore
                  generateText(watch(`${modelName}`), index)
                }
              >
                Regenerate
              </Button>
            </div>
          </div>
        ) : type === "image" && item ? (
          <div style={{ display: "flex", marginTop: "auto" }}>
            <div className={styles.generateButton}>
              <Button
                loading={isImageGenerating[index]}
                disabled={
                  isImageGenerating[index] ||
                  isSubmitting ||
                  isAnyOneImageGenerating
                }
                onClick={() =>
                  // @ts-ignore
                  generateImage(watch(`${modelName}`), index)
                }
              >
                Regenerate
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const scrollToBottom = (index: number) => {
    if (refs[index].current) {
      refs[index].current.scrollTop = refs[index].current.scrollHeight;
    }
  };

  useEffect(() => {
    const observers = refs.map((ref, index) => {
      const observer = new MutationObserver(() => scrollToBottom(index));
      if (ref.current) {
        observer.observe(ref.current, { childList: true, subtree: true });
      }
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <Controller
          name="promptType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className={styles.promptTypeSection}>
              <div className={styles.label}>Prompt Type:</div>
              <Select
                placeholder="Select a prompt type"
                className={styles.select}
                value={value || null}
                onChange={(e) => {
                  setValue("prompt", "");
                  setValue("modelName1", "");
                  setValue("modelName2", "");
                  setValue("modelName3", "");
                  setValue("modelName4", "");
                  setValue("text1", "");
                  setValue("text2", "");
                  setValue("text3", "");
                  setValue("text4", "");
                  setValue("image1", "");
                  setValue("image2", "");
                  setValue("image3", "");
                  setValue("image4", "");
                  onChange(e);
                }}
                options={promptTypeOptions}
              />
            </div>
          )}
        />
      </div>

      <div className={styles.formGroup}>
        <Controller
          name="prompt"
          control={control}
          rules={{ required: "Prompt is required" }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className={styles.aiPromptSection}>
              <div className={styles.label}>AI Prompt:</div>
              <div className={styles.inputSection}>
                <Input
                  className={styles.input}
                  placeholder="Type your prompt here"
                  onChange={(e) => {
                    setValue("modelName1", "");
                    setValue("modelName2", "");
                    setValue("modelName3", "");
                    setValue("modelName4", "");
                    setValue("text1", "");
                    setValue("text2", "");
                    setValue("text3", "");
                    setValue("text4", "");
                    setValue("image1", "");
                    setValue("image2", "");
                    setValue("image3", "");
                    setValue("image4", "");
                    onChange(e.target.value);
                  }}
                  value={value}
                />
                {error && <div className={styles.error}>{error.message}</div>}
              </div>
            </div>
          )}
        />

        {promptType === "text" && (
          <div className={styles.contentSection}>
            {["modelName1", "modelName2", "modelName3", "modelName4"].map(
              (modelName, index) =>
                renderModelSection(modelName, textFields[index], index, "text")
            )}
          </div>
        )}

        {promptType === "image" && (
          <div className={styles.contentSection}>
            {["modelName1", "modelName2", "modelName3", "modelName4"].map(
              (modelName, index) =>
                renderModelSection(
                  modelName,
                  imageFields[index],
                  index,
                  "image"
                )
            )}
          </div>
        )}

        {promptType === "imageUpload" && (
          <div className={styles.contentSection}>
            {["modelName1", "modelName2", "modelName3", "modelName4"].map(
              (modelName, index) =>
                renderModelSection(
                  modelName,
                  imageFields[index],
                  index,
                  "imageUpload"
                )
            )}
          </div>
        )}
      </div>

      <div className={styles.submit}>
        <Button
          loading={isSubmitting}
          disabled={isSubmitting || isAnyOneTextGenerating}
          htmlType="submit"
          className={styles.submitButton}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AdminFormComponent;
