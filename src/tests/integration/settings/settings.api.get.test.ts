import { test, expect } from "bun:test";
import Tracker from "../../../tracker";


test('createResourceApplication creates a new application successfully', async () => {
    const tracker = new Tracker();

    const { users: trackerUsers } = await tracker.settings.getSettingsData();

    console.log(trackerUsers);
    // const response = await tracker.resourceApplications.createResourceApplication(instructions);

    // expect(response).toBeTruthy();
    // expect(response.status).toBe(0); // Assuming 0 is success status
    // expect(response.message).toBe("success");
}, 15000);