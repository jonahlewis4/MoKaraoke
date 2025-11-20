import {Step} from "../app/app/mokaraoke/create/page";
import {EditorProps} from "../app/components/EditorDefinitions";
import {KaraokeRequest} from "./KaraokeRequest";


export const TitleStep : Step = {
    label: "Title",
    editor: ({onNext, onSave} : EditorProps) => {
        let updates : Partial<KaraokeRequest> = {
            title: "title",
            description: "description",
        }
        return <div onClick={() => {
            onNext();
            onSave(updates);
        }}>editor</div>
    },
    preview: () => <div>Background Preview</div>,
}