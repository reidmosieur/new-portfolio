type File = {
    id: string,
    name: string,
    active: boolean,
    filePath: string,
    jsonPath: string,
}

type Folder = {
    name?: string,
    files?: File[],
    folder?: Folder[],
}

type CodeSample = {
    id: string,
    codeString: string,
    title: string,
    explanation: string,
    file: string,
    displayPath: string,
    toDo: string[],
}

export type { Folder, File, CodeSample, };