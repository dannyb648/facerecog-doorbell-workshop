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

/* 
 Youll need to create a person group, then extract the Ids and label them here
 https://docs.microsoft.com/en-us/azure/cognitive-services/face/quickstarts/client-libraries?tabs=visual-studio&pivots=programming-language-javascript#create-a-persongroup
*/
export const peopleDict = [
    {
        id: '64bitguid from Azure PersonGroup',
        name: 'Person A'
    },
    {
        id: '64bitguid from Azure PersonGroup',
        name: 'Person B'
    },
    {
        id: '64bitguid from Azure PersonGroup',
        name: 'Person C'
    },
    {
        id: '64bitguid from Azure PersonGroup',
        name: 'Person D'
    },
    {
        id: '64bitguid from Azure PersonGroup',
        name: 'PErson E'
    }
]