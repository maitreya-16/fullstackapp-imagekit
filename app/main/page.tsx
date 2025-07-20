// 'use client'
// import React, { useState, useEffect } from 'react'
// import FileUpload from '../components/FileUpload'
// import { apiClient } from '@/lib/api-client'
// import { Video } from '@imagekit/next';
// import { IVideo } from '@/models/Video';
// import Link from 'next/link';

// const Fileupload = () => {

//   const [videos, setVideos] = useState<IVideo[]>([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       const vids: IVideo[] = await apiClient.getVideos();
//       setVideos(vids);
//       console.log(videos);
//     };
//     fetchVideos();
//   }, []);
//   return (
//     <>
//       {videos.map((video, index) => {
//         const downloadlink = video.videoUrl+"?ik-attachment=true"
//         return (
//           <div key={index}>
//           <Video
//             key={index}
//             src={video.videoUrl}
//             controls
//             preload="none"
//             poster={video.thumbnailUrl}
//             transformation={[{ width: 500, height: 500, rotation: 90, overlay: { type: "text", text: "maitreya" } }]}
//           />
//           <div>
//           <Link className='bg-amber-200' href={downloadlink}>Download</Link>
//           </div>
//           </div>
//         )
//       }
//       )}
//       <FileUpload
//         fileType="video"
//         onSuccess=
//         {
//           (res) => {
//             console.log("Upload success")
//             apiClient.createVideo(res)
//           }
//         }
//         onProgress={(percent) => console.log("Progress", percent)}
//       />

//     </>
//   )
// }

// export default Fileupload

'use client'
import React, { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { Video } from '@imagekit/next'
import { IVideo } from '@/models/Video'
import Link from 'next/link'

const Fileupload = () => {
  const [videos, setVideos] = useState<IVideo[]>([])
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const fetchVideos = async () => {
      const vids: IVideo[] = await apiClient.getVideos()
      setVideos(vids)
    }
    fetchVideos()
  }, [])

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link href="/upload" className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
          Go to Upload Page
        </Link>
      </div>

      {videos.map((video, index) => {
        const downloadlink = video.videoUrl + '?ik-attachment=true'
        return (
          <div key={index} className="mb-6 w-[250px] h-[400px]">



            <Video
            className="w-[250px] h-[400px] "
              src={video.videoUrl}
              controls
              preload="none"
              poster={video.thumbnailUrl}
              transformation={[
                {
                  overlay: { type: 'text', text: 'maitreya' },
                },
              ]}
            />
            <div className="mt-2">
              <Link href={downloadlink} className="text-blue-600 underline">
                Download
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Fileupload
