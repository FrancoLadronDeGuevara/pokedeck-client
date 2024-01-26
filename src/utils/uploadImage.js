import axios from "axios";
import { autoCloseAlert } from "./alerts";

const preset_key = import.meta.env.VITE_CLOUDINARY_PRESET;
const cloudname = import.meta.env.VITE_CLOUDINARY_NAME;

export const handleAvatarUpload = async (uploadedImage, folderName) => {
    let avatarUrl;

    const formData = new FormData();

    formData.append('file', uploadedImage);
    formData.append('upload_preset', preset_key);
    formData.append('folder', folderName)

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudname}/upload`, formData);
        avatarUrl = response.data.secure_url;
    } catch (error) {
        console.log(error);
    }


    return avatarUrl;

}

export const handleUploadImage = (e, setter) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (!file.type.startsWith('image/')) return autoCloseAlert('Archivo no válido', 'error', 'red');

    reader.onload = (e) => {
        const previewImage = e.target.result;
        setter(previewImage);
    };
    return reader.readAsDataURL(file);
};