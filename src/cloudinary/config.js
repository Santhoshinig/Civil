import axios from 'axios';

// Cloudinary configuration
const cloudName = "dqj5tpfdr";
const uploadPreset = "civildoctor"; // Matches your specific Unsigned Preset

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "civildoctor/products"); // Store images in this specific folder

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};
