export const getDownloadLinkForUuidResource = (uuid: string) => {
    return `http://localhost:3000/api/karaoke/generated?uuid=${uuid}`;
};