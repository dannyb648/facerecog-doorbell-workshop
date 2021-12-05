// ------------------------------- NODE MODULES -------------------------------
// ------------------------------ CUSTOM MODULES ------------------------------
// -------------------------------- VARIABLES ---------------------------------
// ----------------------------- FILE DEFINITION ------------------------------

export interface Face {
    faceId: string;
    recognitionModel: string;
    faceRectangle: {
        width: number;
        height: number;
        left: number;
        top: number;
    };
} 

export interface Identifcations {
    peopleTotal: number;
    people: string[];
}

export interface Person {
    name?: string;
    personId?: string;
    persistedFaceIds?: string[];
}

export const peopleDict = [];