import { clsx, type ClassValue } from 'clsx';
import axios from 'axios';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const downloadImg = async (
  imageUrl: string,
  fileName: string = 'place.jpg',
) => {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'blob',
    });

    const blobUrl = URL.createObjectURL(response.data);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
  }
};

interface ApiRes<T> {
  success: boolean;
  message?: string;
  data: T;
}

export async function handleRequest<T>(
  requestFn: () => Promise<{ data: ApiRes<T> }>,
): Promise<T> {
  const { data } = await requestFn();

  if (!data.success) throw new Error(data.message);

  console.log(data);
  const { success, message, ...rest } = data;

  return rest as T;
}
