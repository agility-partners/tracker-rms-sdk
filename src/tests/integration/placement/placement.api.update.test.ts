import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { ActivityUpdateData } from "../../../types/activity";
import type { placementUpdateData } from "../../../types/placement";

test('updatePlacement updates an placement successfully', async () => {
    // Initialize the Tracker
    const tracker = new Tracker();

    const placementId = 52055; // Using the ID from your search results example
    const updates: Partial<placementUpdateData> = {
        opportunityresourcestatusid: '13'
    };

    // Call the updateActivity method
    const response = await tracker.placements.updatePlacement(placementId, updates);

    // Assertions
    expect(response).toBeTruthy();
    expect(response.status).toBe(0); // Success status
    expect(response.message).toBe('success');
    expect(response.count).toBeDefined();
}, 15000);