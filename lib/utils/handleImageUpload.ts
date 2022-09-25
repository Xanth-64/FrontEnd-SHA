import axios from 'axios';

const handleImageUpload = (file: File) => {
  const uploadUrl = 'https://api.cloudinary.com/v1_1/unimet/upload';
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64data = reader.result;
        const response = await axios.post(uploadUrl, {
          file: base64data,
          upload_preset: 'ml_default',
        });
        resolve(response.data.url);
      } catch (error: any) {
        reject(error);
      }
    };
  });
};

export default handleImageUpload;
