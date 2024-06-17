import axios from "axios";

export interface FeatureItem {
  id: number;
  name: string;
  value: string;
}

export const fetchFeatures = async (): Promise<FeatureItem[]> => {
  try {
    const response = await axios.get("http://localhost:4000/features");
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error fetching features.");
    }
  } catch (error) {
    console.error("Error fetching features:", error);
    return [];
  }
};
