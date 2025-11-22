import {supabase} from "@/utils/supabase/fs";

export async function getPathOfGenVideo(uuid: string): Promise<string> {
    const { data, error } = await supabase
        .from('videos')
        .select('fspath')
        .eq('uuid', uuid)
        .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) throw new Error(`No video found for uuid ${uuid}`);

    return data.fspath;
}

export async function addGenVideoRow(uuid: string, fspath: string): Promise<void> {
    const { error } = await supabase
        .from('videos')
        .insert({
            uuid,
            fspath,
            title: null,
            youtubeUrl: null
        });

    if (error) {
        throw new Error(`Failed to insert gen_video row: ${error.message}`);
    }
}
