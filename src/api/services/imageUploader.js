import axios from "axios";

const imageUploaderService = {
  uploadImage: async (data) => {
    return axios.post(
      "https://api.betterbeout.com/api/v1/image/uploader",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};
export default imageUploaderService;
