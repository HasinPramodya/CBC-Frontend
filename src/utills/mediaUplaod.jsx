import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

console.log("URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

const supabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function MediaUpload(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      toast.error("Please select a file");
      reject("No file selected");
      return;
    }

    const timeStamp = Date.now();
    const fileName = timeStamp + file.name;

    supabaseClient.storage
      .from("images")
      .upload(fileName, file)
      .then(() => {
        const url = supabaseClient.storage
          .from("images")
          .getPublicUrl(fileName).data.publicUrl;
        resolve(url);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
