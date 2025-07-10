import {createClient} from "@supabase/supabase-js"
import toast from "react-hot-toast"
const supabaseClient = createClient(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_ANON_KEY)
export default function MediaUpload(file){
    
    return new Promise(
        (reslove,reject)=>{
          
            if(file==null){
                toast.error("Please select a file")
            }else{
                const timpStamp = new Date().getTime();
                const fileName = timpStamp+file.name;

                supabaseClient.storage.from("images").upload(fileName,file).then(
                    ()=>{
                       const url = supabaseClient.storage.from("images").getPublicUrl(fileName).data.publicUrl
                       reslove(url)
                    }
                ).catch(
                    (error)=>{
                        console.log(error)
                        reject(error)
                    }
                )
            }
        }
    )
}


  