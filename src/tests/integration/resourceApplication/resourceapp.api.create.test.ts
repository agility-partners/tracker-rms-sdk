import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { CreateResourceApplicationOptions } from "../../../types/resourceApplication/api";


test('createResourceApplication creates a new application successfully', async () => {
    const tracker = new Tracker();

    const instructions: CreateResourceApplicationOptions = {
        opportunityid: "1239",
        resourceid: "754",
        assigntolist: "short",
        shortlistedby: "user",
        source: "Website"
    };

    const response = await tracker.resourceApplications.createResourceApplication(instructions);

    expect(response).toBeTruthy();
    expect(response.status).toBe(0); // Assuming 0 is success status
    expect(response.message).toBe("success");
}, 15000);