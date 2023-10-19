'use client'

import { UploadDropzone } from '@/lib/uploadthing'

const UploadPage = () => {
  return (
    <div>
      <UploadDropzone
        endpoint='imageUploader'
        config={{ mode: 'auto' }}
        onClientUploadComplete={res => {
          // Do something with the response
          console.log('Files: ', res)
          alert('Upload Completed')
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
      />
    </div>
  )
}

export default UploadPage
