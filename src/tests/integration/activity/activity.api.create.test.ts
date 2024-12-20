import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { 
    ActivityData
} from "../../../types/activity";

test('createActivity creates a new activity successfully', async () => {
    const tracker = new Tracker();

    const activity: ActivityData = {
        subject: "Integration Test",
        type: "InMail",
        date: "2024-10-29",
        time: "11:30 AM",
        status: "Closed",
        priority: "High",
        contactType: "Outbound",
        note: "Follow up call regarding recent job opportunity.",
        userId: 21,
        linkRecordType: "R", 
        linkRecordId: 2080
    };

    const response = await tracker.activities.createActivity(activity);

    expect(response).toBeTruthy();
    expect(response.message).toEqual("success");
}, 15000);