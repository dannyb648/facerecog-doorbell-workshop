// ------------------------------- NODE MODULES -------------------------------
require('dotenv').config();

import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { FaceClient } from "@azure/cognitiveservices-face";
import { promises } from 'fs';

// ------------------------------ CUSTOM MODULES ------------------------------

import { Face, peopleDict, Person, Identifcations } from './faces';

// -------------------------------- VARIABLES ---------------------------------

const endpoint = process.env.FACEAPIENDPOINT!;
const key = process.env.FACEAPIKEY!;
const group = process.env.FACEAPIGROUP!;

// These are the key objects Azure Faces provide as an SDK
const credentials = new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
const client = new FaceClient(credentials, endpoint);

// ----------------------------- FILE DEFINITION ------------------------------

export const identifyFaces = async (image: string): Promise<Identifcations | void> => {
    // Grab IDs from detectFacesFromImage('snapshot', client)
    const faceIds = (await detectFacesFromImage(image, client)).map((face: Face) => face.faceId);
    if (faceIds.length === 0) {
        console.log('No face IDs');

        return;
    }

    // call client.face.identity, pass in the ids and the personGroupId
    let results;
    try {
        results = await client.face.identify(faceIds, { personGroupId : group});

        console.log(results[0].candidates);

    } catch (err) {
        console.log(err);
        throw new Error('Azure Face API is unavailable');
    }

    // Response object we are going to populate
    const detections: Identifcations = {
        peopleTotal: results.length,
        people: [],
    };

    // Process Detected Faces
    await Promise.all(results.map (async (result: any) => { 
        if (result.candidates.length > 0) {
            // for each result, go and call client.personGroupPerson.get
            const person: Person = await client.personGroupPerson.get(group, result.candidates[0].personId);

            const id = person.personId;

            // Filter down to the name of the face
            const [name] = peopleDict.filter(person => {
                return person.id === id;
            });

            // Push the name onto our response object
            detections.people.push(name.name);
        }
    }));
    
    return detections;
}

const detectFacesFromImage = async (image: string, client: any): Promise<Face[]> => {
    // read in snapshot taken by photo as a data stream
    const filename = `snapshot.jpg`;
    const stream = await promises.readFile(filename);

    // get all detected with client.face.detectWithStream 
    // pass in the image stream
    const detectedFaces = await client.face.detectWithStream(stream,
        {
            detectionModel: "detection_02",
            recognitionModel: "recognition_03"
        });

    return detectedFaces;
}
