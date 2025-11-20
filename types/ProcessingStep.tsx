import {Step} from "../app/app/mokaraoke/create/page";
import {EditorProps} from "../app/components/EditorDefinitions";
import {KaraokeRequest} from "./KaraokeRequest";


export const ProcessingStep : Step = {
    label: "Processing",
    editor: ({onNext, onSave} : EditorProps) => {
        let updates : Partial<KaraokeRequest> = {
            generatedVideoPath: "some generated video path",
        }
        return <div onClick={() => {
            onNext();
            onSave(updates);
        }}>editor</div>
    },
    preview: () => <div>Background Preview</div>,
}