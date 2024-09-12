

export type UploadEntry = {
    id: string;
    text: string;
    sentiment: "very_negative" | "negative" | "neutral" | "positive" | "very_positive";
}

export type User = {
    id: string;
    email: string;
    organization: string;
}

export type Upload = {
    id: number;
    name: string;
    entries: number | null;
    created_at: string;
    created_by: User;
    status: "pending" | "processing" | "ready" | "error";
}

export type UploadFull = Upload & {
    entries: UploadEntry[];
}