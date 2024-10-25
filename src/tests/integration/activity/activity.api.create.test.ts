import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { 
    ActivityData
} from "../../../types/activity";

test('createActivity creates a new activity successfully', async () => {
    const tracker = new Tracker();

    const activity: ActivityData = {
        subject: "Integration Test",
        type: "Telephone",
        date: "2024-10-29",
        time: "11:30 AM",
        status: "Waiting",
        priority: "High",
        contactType: "Outbound",
        note: "Follow up call regarding recent job opportunity.",
        userId: 21,
        linkRecordType: "N", // C for Contact
        linkRecordId: 1992,  // Contact ID from the example
    };

    const response = await tracker.activities.createActivity(activity);

    console.log(response)
    expect(response).toBeTruthy();
    expect(response.message).toEqual("success");
}, 15000);