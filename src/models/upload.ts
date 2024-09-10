

export type UploadEntries = {
    id: string;
    text: string;
    sentiment: "VERY_NEGATIVE" | "NEGATIVE" | "NEUTRAL" | "POSITIVE" | "VERY_POSITIVE";
}
export type Upload = {
    id: string;
    name: string;
    entries: number | null;
    uplaodedAt: Date;
    uploadedBy: string;
    status: "PROCESSING" | "COMPLETED" | "FAILED";
}