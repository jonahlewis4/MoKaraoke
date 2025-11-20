import {Step} from "../app/app/mokaraoke/create/page";
import {EditorProps} from "../app/components/EditorDefinitions";
import {KaraokeRequest} from "./KaraokeRequest";


export const BackgroundStep : Step = {
    label: "Background",
    editor: ({onNext, onSave} : EditorProps) => {
        let updates : Partial<KaraokeRequest> = {
            backgroundPath: "backgroundPath",
        }
        return <div onClick={() => {
            onNext();
            onSave(updates);
        }}>editor</div>
    },
    preview: () => <div>Background Preview</div>,
}