import axios from "axios";

const preset_key = import.meta.env.VITE_CLOUDINARY_PRESET;
const cloudname = import.meta.env.VITE_CLOUDINARY_NAME;

export const handleAvatarUpload = async (uploadedImage) => {
    let avatarUrl;

    const formData = new FormData();

    formData.append('file', uploadedImage);
    formData.append('upload_preset', preset_key);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudname}/upload`, formData);
        avatarUrl = response.data.secure_url;
    } catch (error) {
        console.log(error);
    }


    return avatarUrl;

}