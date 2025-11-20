import {Step} from "../app/app/mokaraoke/create/page";
import {EditorProps} from "../app/components/EditorDefinitions";
import {KaraokeRequest} from "./KaraokeRequest";


export const AudioStep : Step = {
    label: "Audio",
    editor: ({onNext, onSave} : EditorProps) => {
        let updates : Partial<KaraokeRequest> = {
            audioPath: "audioPath",
        }
        return <div onClick={() => {
            onNext();
            onSave(updates);
        }}>editor</div>
    },
    preview: () => <div>Background Preview</div>,
}