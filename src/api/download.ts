import axios from 'axios'

export interface DownloadRequest {
  url: string
}

export interface UploadRequest {
  url: string
  file: Blob
}

export const downLoadFile = (request: DownloadRequest): void => {
  void axios.get<BlobPart>(request.url, { withCredentials: true })
    .catch()
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      const contentPosition = response.headers['content-disposition']
      const fileName = contentPosition?.split(';')[1].trim()
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
    })
}

export const uploadFile = (request: UploadRequest): void => {
  const formData = new FormData()
  formData.append('image', request.file)
  void axios.post(request.url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
