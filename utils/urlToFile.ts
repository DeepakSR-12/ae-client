export async function urlToFile(
  url: string,
  filename: string,
  mimeType: string
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}

export async function base64ToFile(
  base64: string,
  filename: string,
  mimeType: string
): Promise<File> {
  const res = await fetch(base64);
  const blob = await res.blob();
  return new File([blob], filename, { type: mimeType });
}

interface FileData {
  [key: string]: string;
}

interface FileObject {
  [key: string]: File;
}

export async function convertUrlsToFiles(data: FileData): Promise<FileObject> {
  const filePromises = Object.entries(data).map(async ([key, value]) => {
    let file: File;
    const filename = `${key}.png`;
    const mimeType = "image/png";

    if (value.startsWith("data:")) {
      file = await base64ToFile(value, filename, mimeType);
    } else {
      file = await urlToFile(value, filename, mimeType);
    }

    return { key, file };
  });

  const files = await Promise.all(filePromises);
  return files.reduce((acc, { key, file }) => {
    acc[key] = file;
    return acc;
  }, {} as FileObject);
}
