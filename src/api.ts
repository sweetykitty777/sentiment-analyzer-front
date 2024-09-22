import axios, { AxiosInstance } from 'axios';
import { Upload, UploadAccess, UploadFull } from './models/api';

export const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL + "/api/v1",
    timeout: 20000,
});

export type FileDownloadExtension = 'xlsx' | 'csv';

export const downloadUpload = async ({ client, uploadId, extension }: { client: AxiosInstance, uploadId: number, extension: FileDownloadExtension }) => {
    const response = await client.get(`/uploads/${uploadId}/download`, {
        responseType: 'blob',
        params: {
            type: extension
        }

    });
    return response.data;
}

export const fetchUploads = async ({ client }: { client: AxiosInstance }) => {
    const { data } = await client.get<Upload[]>('/uploads');
    return data;
}

export const fetchUploadFull = async ({ client, uploadId }: { client: AxiosInstance, uploadId: string }) => {
    const { data } = await client.get<UploadFull>(`/uploads/${uploadId}`);
    return data;
}

export const uplaodFile = async ({ client, file }: { client: AxiosInstance, file: File }) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await client.post<Upload>('/uploads', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data;
}

export const deleteUpload = async ({ client, uploadId }: { client: AxiosInstance, uploadId: number }) => {
    await client.delete(`/uploads/${uploadId}`);
}


export const checkText = async ({ client, text }: { client: AxiosInstance, text: string }): Promise<string> => {
    const { data } = await client.get("/check", {
        params: {
            text: text
        }
    });
    return data.results[0].sentiment;
}

export const shareUpload = async ({ client, uploadId, recipientId, recipientType }: { client: AxiosInstance, uploadId: number, recipientId: string, recipientType: "user" | "org" }) => {
    await client.post(`/uploads/${uploadId}/share`, {
        recipient_id: recipientId,
        recipient_type: recipientType
    });
}

export const getShareUploadsRecipients = async ({ client, uploadId }: { client: AxiosInstance, uploadId: number }) => {
    const { data } = await client.get<UploadAccess[]>(`/uploads/${uploadId}/share`, {
    });
    return data;
}

export const deleteShareUpload = async ({ client, uploadId, recipientId, recipientType }: { client: AxiosInstance, uploadId: number, recipientId: string, recipientType: "user" | "org" }) => {
    await client.delete(`/uploads/${uploadId}/share`, {
        data: {
            recipient_id: recipientId,
            recipient_type: recipientType
        }
    });
}