import axios from "axios";


export interface DownloadRequest {
    url: string;
}

export interface UploadRequest {
    url: string;
    file: Blob;
}

export const downLoadFile = (request: DownloadRequest) => {
    axios.get<BlobPart>(request.url, {withCredentials: true})
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            let contentPosition = response.headers['content-disposition'];
            const fileName = contentPosition?.split(";")[1].trim()!;
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        })
}

export const uploadFile = (request: UploadRequest) => {
    const formData = new FormData();
    formData.append("image", request.file);
    axios.post(request.url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}