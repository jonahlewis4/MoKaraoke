

export type GenerationRequest = {
    audioPath: string;
    backgroundPath: string;
}
export type UploadRequest = {
    title: string;
    description: string;
    generatedVideoPath: string;
}

export type KaraokeLifetime = {
    generationRequest: GenerationRequest;
    uploadRequest: UploadRequest;
    youtubePath: string;
}

export type PartialKaraokeLifetime = Partial<({
    generationRequest: Partial<GenerationRequest>;
    uploadRequest: Partial<UploadRequest>;
    youtubePath: string;
})>;

