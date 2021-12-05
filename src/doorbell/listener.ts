// ------------------------------- NODE MODULES -------------------------------
require('dotenv').config();
import { RingApi, RingCamera } from 'ring-client-api';

// ------------------------------ CUSTOM MODULES ------------------------------

import { authentication } from "./authentication";
import { identifyFaces } from '../face-api/azure';
import { getSnapshotFromRing } from './snapshot';

// -------------------------------- VARIABLES ---------------------------------
// ----------------------------- FILE DEFINITION ------------------------------

export const doorbellListener = async (): Promise<void> => {
    let ring: RingApi;

    try {

        console.log('SET UP: Setting up RING API');

        // Initiate a new RingAPI and log in pretending to be the mobile app.
        ring = new RingApi({
            refreshToken: process.env.RINGKEY!,
            cameraDingsPollingSeconds: 2,
        });
    } catch (err) {
        throw err;
    }

    // We pass in our authentication function to an event listener. 
    // When onRefreshTokenUpdated fires, we save the token to our .env file
    ring.onRefreshTokenUpdated.subscribe(authentication);
    
    let allCameras: RingCamera[];
    try {
        allCameras = await ring.getCameras();
    } catch (err) {
        console.log(err);
        throw new Error('No Cameras Retreived from Ring')
    }

    allCameras[0].onDoorbellPressed.subscribe(async (event: any) => {                   
        
        const fileLocation = await getSnapshotFromRing(allCameras[0].id, ring);

        const faces = await identifyFaces(fileLocation);

        if (!faces) {
            console.log(`There is something moving outside, but I don't think it is a person`);
    
            return;
        }

        let string;
        if (faces.people.length > 0) {
            console.log(`${faces.people.join(' and ')} ${(faces.peopleTotal > 1 ? 'are' : 'is')} at the door!`);
        } else {
            console.log(`There ${(faces.peopleTotal > 1 ? 'are some people' : 'is someone')} at the door, but I don't recognise them!`);
        }
    });
};

