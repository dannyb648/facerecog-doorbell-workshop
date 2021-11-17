// ------------------------------- NODE MODULES -------------------------------
// ------------------------------ CUSTOM MODULES ------------------------------

import { doorbellListener } from "./doorbell/listener";

// -------------------------------- VARIABLES ---------------------------------
// ----------------------------- FILE DEFINITION ------------------------------


const run = async () => {
    
    console.log(`SET UP: Smart AI Doorbell - Starting Up`);

    doorbellListener();
    
};

run();