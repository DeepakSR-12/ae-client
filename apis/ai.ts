import axiosInstance from '@/utils/axiosInstance';

export const fetchOCR = (payload: any) => {
  console.log("payload:::", payload)
  return axiosInstance.post('openai/fetch-ocr-data', payload).then((data) => data.data)
}

export const fetchQueryOCR = async (payload: any, onChunk: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL_V1}openai/fetch-query-ocr-data`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  });

  const stream = response.body;

  const decoder = new TextDecoder('utf-8');

  const reader = stream.getReader();

  let result = '';

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      console.log('Stream ended');
      // if (callbackCompletion) {
      //   callbackCompletion(result)
      // }
      break;
    }
    const decodedValue = new TextDecoder().decode(value);
    result += decodedValue
    console.log("::::::result:::::>>>>>>>>>", result)
    onChunk(result)
    // callback(decodedValue)
  }
  
  return result
};
