export type KaraokiRequest = {
    title: string;
    description: string;
    audioPath: string;
    backgroundPath: string;
    generatedVideoPath?: string;
    youtubePath?: string;
}
