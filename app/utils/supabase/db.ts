import {supabase} from "@/utils/supabase/fs";
import {SanitizedVideo} from "@/app/api/karaoke/generated/all/route";

export async function getPathOfGenVideo(uuid: string): Promise<string> {
    console.log("Getting path of gen video for uuid:", uuid);

    const { data, error } = await supabase
        .from('videos')
        .select('fspath')
        .eq('uuid', uuid)
        .maybeSingle();
    console.log("Data from Supabase:", data);
    console.log("Error from Supabase:", error);
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
            youtubeurl: null
        });

    if (error) {
        throw new Error(`Failed to insert gen_video row: ${error.message}`);
    }

    console.log(`Generated video row inserted for uuid ${uuid}`);
}


export async function updateTitleAndUrl(
    uuid: string,
    youtubeurl: string,
    title: string
) :Promise<void> {
    const { data, error } = await supabase
        .from('videos')
        .update({
            youtubeurl: youtubeurl,
            title: title
        })
        .eq('uuid', uuid)
        .select();

    if (error) {
        console.error('Error updating video:', error);
        throw new Error(`Failed to update video: ${error.message}`);
    }
}

export async function getAllUploadedVideos(): Promise<SanitizedVideo[]> {
    const { data, error } = await supabase
        .from('videos')
        .select('uuid, title, youtubeurl, created_at')
        .not('youtubeurl', 'is', null);

    if (error) throw error
    return data || []
}