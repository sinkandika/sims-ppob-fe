import api from "./api"

// get API for profile update

export const updateProfile = async (firstName, lastName) => {
  try {
    const response = await api.put("/profile/update", {
        first_name: firstName,
        last_name: lastName,
    });

    if (response.data.status === 0) {
        return response.data.status;
    }

    throw new Error(response.data.message);
  } catch (error) {
    if (error.status === 108) {
        throw new Error("UNAUTHORIZED");
    }
    throw error;
  }
};

export const updateImage = async (imgUpd) => {
  try {
    const imageData = new FormData();
    imageData.append("file", imgUpd);

    const response = await api.put("/profile/image", imageData, {
        headers: {
            "Content-Type" : "multipart/form-data",
        },
    });

    if (response.data.status === 0) {
        return response.data.data;
    }

    throw new Error(response.status.message);
  } catch (error) {
    if (error.status === 108) {
        throw new Error("UNAUTHORIZED");
    }
    if (error.status === 102) {
        throw new Error("INVALID_IMAGE_FORMAT");
    }
    throw error;
  }
};
