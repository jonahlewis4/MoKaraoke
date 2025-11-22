import {randomUUID} from "node:crypto";

export const saveFile = async (file: File) : Promise<string> => {
    return randomUUID();
}