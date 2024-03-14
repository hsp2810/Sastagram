import { CloudinaryImage } from "@/types";

// dipe21kuj
const url = `https://api.cloudinary.com/v1_1/dipe21kuj/image`;

export const upload = async (formData: FormData) => {
  try {
    const response = await fetch(`${url}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    return null;
  }
};

export const destroy = async (img: CloudinaryImage) => {
  try {
    const response = await fetch(`${url}/destroy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signature: img.signature,
        api_key: "194469519592376",
        public_id: img.public_id,
        timestamp: "173719931",
      }),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    return null;
  }
};
