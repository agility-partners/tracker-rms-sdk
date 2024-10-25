import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { ActivityUpdateData } from "../../../types/activity";

test('updateActivity updates an activity successfully', async () => {
    // Initialize the Tracker
    const tracker = new Tracker();

    const activityId = 135; // Using the ID from your search results example
    const updates: Partial<ActivityUpdateData> = {
        taskstatus: 'Completed'
    };

    // Call the updateActivity method
    const response = await tracker.activities.updateActivity(activityId, updates);

    // Assertions
    expect(response).toBeTruthy();
    expect(response.status).toBe(0); // Success status
    expect(response.message).toBe('success');
    expect(response.count).toBeDefined();
}, 15000);