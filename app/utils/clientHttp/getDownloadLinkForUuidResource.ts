export const getDownloadLinkForUuidResource = (uuid: string) => {
    console.log("getDownloadLinkForUuidResource: ", uuid);
    return `http://localhost:3001/api/karaoke/generated?uuid=${uuid}`;
};