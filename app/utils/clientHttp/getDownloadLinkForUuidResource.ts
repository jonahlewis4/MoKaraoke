export const getDownloadLinkForUuidResource = (uuid: string) => {
    console.log("getDownloadLinkForUuidResource: ", uuid);
    return `/api/karaoke/generated?uuid=${uuid}`;
};