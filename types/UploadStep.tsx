import {Step} from "../app/app/mokaraoke/create/page";
import {EditorProps} from "../app/components/EditorDefinitions";
import {KaraokeRequest} from "./KaraokeRequest";


export const UploadStep : Step = {
    label: "Upload",
    editor: ({onSave} : EditorProps) => {
        let updates : Partial<KaraokeRequest> = {
            youtubePath: "some youtube path",
        }
        return <div onClick={() => {
            onSave(updates);
        }}>editor</div>
    },
    preview: () => <div>Background Preview</div>,
}