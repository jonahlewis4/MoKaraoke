

export type GenerationRequest = {
    audioPath: string;
    backgroundPath: string;
}
export type UploadRequest = {
    title: string;
    description: string;
    generatedVideoPath: string;
}

export type KaraokeInputs = {
    Generate: GenerationRequest;
    Upload: UploadRequest;
}
export type KaraokeOutputs = {
    youtubePath: string;
}

export type KaraokeLifetime = {
    Inputs: KaraokeInputs;
    Outputs: KaraokeOutputs;
}

export type PartialKaraokeInputs = {
    Generate?: Partial<GenerationRequest>;
    Upload?: Partial<UploadRequest>;
}
export type PartialKaraokeLifetime = Partial<({
    Inputs: PartialKaraokeInputs;
    Outputs: Partial<KaraokeOutputs>;
})>;

export type SavedKaraoke = {
    youtubeUrl: string;
    title: string;
}

export const downloadKInputs = async (inputs: KaraokeInputs) => {
    //download json version of the karaoke lifetime

    const json = JSON.stringify(inputs);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "karaokeLifetime.json";
    a.click();

    URL.revokeObjectURL(url);
}