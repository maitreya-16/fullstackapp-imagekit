'use client'
import React from 'react'
import FileUpload from '../components/FileUpload'
import { apiClient } from '@/lib/api-client'

const UploadPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload a Video</h1>
      <FileUpload
        fileType="video"
        onSuccess={(res) => {
          console.log("Upload success")
          apiClient.createVideo(res)
        }}
        onProgress={(percent) => console.log("Progress", percent)}
      />
    </div>
  )
}

export default UploadPage
