// ------------------------------- NODE MODULES -------------------------------

import { RingApi } from 'ring-client-api';

// ------------------------------ CUSTOM MODULES ------------------------------

import { authentication } from "./authentication";

// -------------------------------- VARIABLES ---------------------------------
// ----------------------------- FILE DEFINITION ------------------------------

export const doorbellListener = async (): Promise<void> => {
    let ring;

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
    
    let allCameras;
    try {
        allCameras = await ring.getCameras();
    } catch (err) {
        console.log(err);
    }

    if (!allCameras) {
        throw new Error('No Cameras Retreived from Ring')
    }

    allCameras[0].onDoorbellPressed.subscribe();
};

