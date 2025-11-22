export type audio = {
    id: number;
    path: string;
}

export type audioUploadRequest = {
    audio: File;
    id: number;
}