import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = "https://api.unsplash.com";
const ACCESS_KEY: string = "ZWw0K9zedynerthYprdMBlcfJimPtavBiy9zgT8r1bE";

interface Image {
  id: string;
  description: string;
  alt_description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

interface FetchImagesResponse {
  total: number;
  total_pages: number;
  results: Image[];
}

export async function fetchImages(
  query: string,
  page: number,
): Promise<FetchImagesResponse> {
  try {
    const response: AxiosResponse<FetchImagesResponse> = await axios.get(
      '/search/photos',
      {
        params: {
          query: query,
          page: page,
          per_page: 12,
          client_id: ACCESS_KEY,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message);
    } else {
      console.error('Unexpected error', error);
    }
    throw error;
  }
}