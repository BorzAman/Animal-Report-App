export const postImage = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  // Optional safety checks
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be under 5MB");
  }

  const formData = new FormData();
  formData.append("image", file);

  const API_KEY = "81a452e378849dfb2f6fb05315eb8297"; // 👈 paste here

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  // 🔴 Hard validation (important)
  if (!data.success || !data.data?.url) {
    console.error("IMGBB RESPONSE:", data);
    throw new Error("ImgBB upload failed");
  }

  // ✅ Always a direct image URL
  return data.data.url;
};
