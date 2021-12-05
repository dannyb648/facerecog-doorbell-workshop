// ------------------------------- NODE MODULES -------------------------------
import { promises } from 'fs';
import { RingApi } from 'ring-client-api'
// ------------------------------ CUSTOM MODULES ------------------------------
// -------------------------------- VARIABLES ---------------------------------
// ----------------------------- FILE DEFINITION ------------------------------

export const getSnapshotFromRing = async (cameraId: number, doorbellClient: RingApi): Promise<string> => {
    
    const [location] = await doorbellClient.getLocations();

    const cameras = location.cameras;

    const camera = cameras.find(camera => camera.data.id === cameraId);

    if (!camera) {
        throw new Error('Camera ID cant be found');
    }

    const buffer = await camera.getSnapshot();

    const img = buffer!.toString('base64');

    try {
        const imageBuffer = Buffer.from(img, 'base64');

        const filepath = `./snapshot.png`

        try {
            await promises.writeFile(filepath, imageBuffer);
        } catch (err) {
            throw err;
        }

        return filepath;
    } catch (err) {
        console.log(err);
        throw err;
    }

}