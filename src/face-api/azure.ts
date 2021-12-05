// ------------------------------- NODE MODULES -------------------------------

import { ApiKeyCredentials } from "@azure/ms-rest-js";
import  { FaceClient } from "@azure/cognitiveservices-face";
import { promises } from 'fs';

// ------------------------------ CUSTOM MODULES ------------------------------

import { Face, peopleDict, Person, Identifcations } from './faces';

// -------------------------------- VARIABLES ---------------------------------

const endpoint = process.env.FACEAPIENDPOINT!;
const key = process.env.FACEAPIKEY!;
const group = process.env.FACEAPIGROUP!;

const credentials = new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
const client = new FaceClient(credentials, endpoint);

// ----------------------------- FILE DEFINITION ------------------------------

export const identifyFaces = async (image: string): Promise<Identifcations | void> => {
    // Grab IDs from detectFacesFromImage('snapshot', client)

    // throw an error if no faces are detected (length = 0)

    // call client.face.identity, pass in the ids and the personGroupId

    // Process Detected Faces, 
        // for each result, go and call client.personGroupPerson.get

        // grab the name of that person from the person dictionary

}

const detectFacesFromImage = async (image: string, client: any): Promise<Face[]> => {

    // read in snapshot taken by photo as a data stream

    // get all detected with client.face.detectWithStream 
    // pass in the image stream

}
