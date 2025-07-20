"use client"
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUpLoadPorps {
    onSuccess: (res: any) => void
    onProgress?: (progress: number) => void
    fileType?: "image" | "video"
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUpLoadPorps) => {

    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Please upload a valid video file")
            }
        }
        if (file.size > 100 * 1023 * 1024) {
            setError("File size must be less than 100 MB")
        }
        return true
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !validateFile(file)) {
            return;
        }
        setUploading(true);
        setError(null);

        try {
            const authRes = await fetch("/api/imagekit-auth")
            const auth = await authRes.json();
            console.log("Imagekit auth : ", auth)

            const res  = await upload({
                file,
                fileName: file.name,
                expire: auth.authenticationParameters.expire,
                token: auth.authenticationParameters.token,
                signature: auth.authenticationParameters.signature,
                publicKey: auth.publicKey,
                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percent = (event.loaded / event.total) * 100;
                        onProgress(Math.round(percent))
                    }
                },
            })
            const videoData = {
                ...res,
                title:title,
                description:description,
                thumbnailUrl :res.url+"/ik-thumbnail.jpg",
                videoUrl:res.url
            }


            console.log("Videodata : ",videoData);


            onSuccess(videoData);

        } catch (error) {

            console.error("Upload Failed", error);
        }
        finally {
            setUploading(false);
        }
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-4 ">
                <input type="text" className="bg-gray-300 text-black" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <textarea value={description} onChange={e=>{setDescription(e.target.value)}} className="bg-gray-700" />
                <input className="block" type="file"
                    accept={fileType === "video" ? "video/*" : "image/*"}
                    onChange={handleFileChange}
                />
                {uploading && (<span>Loading...</span>)}
            </div>
        </>
    );
};

export default FileUpload;