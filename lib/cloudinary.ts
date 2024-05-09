import cloudinary from "cloudinary";

const url = `https://api.cloudinary.com/v1_1/${
  process.env.CLOUD_NAME as string
}/image`;

export const upload = async (formData: FormData) => {
  try {
    const response = await fetch(`${url}/upload`, {
      method: "POST",
      body: formData,
    });
    console.log("After upload");
    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const destroy = async (public_id: string) => {
  try {
    cloudinary.v2.uploader.destroy(
      "sastagram/r7ihpdw2utdw0dxqnchv",
      function (error, result) {
        console.log(result, error);
      }
    );
    // console.log("Result after deletion: ", result);
    // return result;
  } catch (error) {
    return null;
  }
};
