// ------------------------------- NODE MODULES -------------------------------

import { readFile, writeFile } from 'fs';
import { promisify } from 'util';

// ------------------------------ CUSTOM MODULES ------------------------------
// -------------------------------- VARIABLES ---------------------------------
// ----------------------------- FILE DEFINITION ------------------------------

interface RingKeys {
    newRefreshToken?: string; 
    oldRefreshToken?: string;
};

/*
 *  This function is pretty simple - we take the new auth key from Ring, and overwrite the old key with in. 
 *  This means when we restart the API, the doorbell login process still works dispite 2FA
 *  You can find out quite a bit more about this here: https://github.com/dgreif/ring/wiki/Refresh-Tokens
 */
export const authentication = async (ringKeys: RingKeys) => {

    const { newRefreshToken, oldRefreshToken } = ringKeys;
    
    if (!oldRefreshToken || !newRefreshToken) {
        console.log('EVENT LOOP: Didnt get tokens from RING');
        return
    }

    const currentConfig = await promisify(readFile)('.env');

    const updatedConfig = currentConfig.toString().replace(oldRefreshToken, newRefreshToken)

    await promisify(writeFile)('.env', updatedConfig);

    console.log('EVENT LOOP: Updated Refresh Token');
}