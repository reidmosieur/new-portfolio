import { Folder } from "../types/types";

const findLeastNestedItem = <T>(folder: Folder, itemType: 'file' | 'folder'): T | undefined => {
    if (itemType === 'file' && folder.files && folder.files.length >  0) {
        return folder.files[0] as unknown as T;
    } else if (itemType === 'folder' && folder.folder && folder.folder.length >  0) {
        return findLeastNestedItem(folder.folder[0], itemType);
    }
    return undefined;
};

export default findLeastNestedItem;