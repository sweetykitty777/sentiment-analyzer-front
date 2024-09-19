import axios from 'axios';
import { AuthContextProps } from 'react-oidc-context';
import { Upload, UploadAccess, UploadFull } from './models/api';

export const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL + "/api/v1",
    timeout: 20000,
});

export type FileDownloadExtension = 'xlsx' | 'csv';

export const downloadUpload = async ({ auth, uploadId, extension }: { auth: AuthContextProps, uploadId: number, extension: FileDownloadExtension }) => {
    const response = await client.get(`/uploads/${uploadId}/download`, {
        headers: {
            Authorization: `Bearer ${auth?.user?.access_token}`
        },
        responseType: 'blob',
        params: {
            type: extension
        }

    });
    return response.data;
}

export const fetchUploads = async ({ auth }: { auth: AuthContextProps }) => {
    console.log(auth);
    const { data } = await client.get<Upload[]>('/uploads', {
        headers: {
            Authorization: `Bearer ${auth?.user?.access_token}`,
        }
    });
    return data;
}

export const fetchUploadFull = async ({ auth, uploadId }: { auth: AuthContextProps, uploadId: string }) => {
    const { data } = await client.get<UploadFull>(`/uploads/${uploadId}`, {
        headers: {
            Authorization: `Bearer ${auth?.user?.access_token}`
        }
    });
    return data;
}

export const uplaodFile = async ({ auth, file }: { auth: AuthContextProps, file: File }) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await client.post<Upload>('/uploads', formData, {
        headers: {
            Authorization: `Bearer ${auth?.user?.access_token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return data;
}

export const deleteUpload = async ({ auth, uploadId }: { auth: AuthContextProps, uploadId: number }) => {
    await client.delete(`/uploads/${uploadId}`, {
        headers: {
            Authorization: `Bearer ${auth?.user?.access_token}`
        }
    });
}


export const checkText = async ({ auth, text }: { auth: AuthContextProps, text: string }): Promise<string> => {
    const { data } = await client.get("/check", {
        headers: {
            Authorization: `Bearer ${auth?.user?.access_token}`
        },
        params: {
            text: text
        }
    });
    return data.results[0].sentiment;
}

export const shareUpload = async ({ auth, uploadId, recipientId, recipientType }: { auth: AuthContextProps, uploadId: number, recipientId: string, recipientType: "user" | "org" }) => {
    await client.post(`/uploads/${uploadId}/share`, {
        recipient_id: recipientId,
        recipient_type: recipientType
    }, {
        headers: {
            Authorization: `Bearer ${auth?.user?.access_token}`
        }
    });
}

export const getShareUploadsRecipients = async ({ auth, uploadId }: { auth: AuthContextProps, uploadId: number }) => {
    const { data } = await client.get<UploadAccess[]>(`/uploads/${uploadId}/share`, {
        headers: {
            Authorization: `Bearer ${auth?.user?.access_token}`
        }
    });
    return data;
}

