import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { JobUpdateData } from "../../../types";

test('updateJob updates a job successfully', async () => {
    // Initialize the Tracker
    const tracker = new Tracker();

    // Define the job ID and update data
    const jobId = 1106; // You might want to use a real ID or create a job first
    const updates: Partial<JobUpdateData> = {
        opportunityname: 'Updated IT Project Manager Role',
        publishsalaryfrom: '120000',
        publishsalaryto: '150000',
        publishworktype: 'Contract',
        location: 'Remote',
        publishdescription: 'Updated role description for IT Project Manager position',
        opportunityrate: '50',
        opportunitychargerate: '70'
    };

    // Call the updateJob method
    const response = await tracker.jobs.updateJob(jobId, updates);

    // Assertions
    expect(response).toBeTruthy();
    expect(response.status).toBe(0); // Success status
    expect(response.message).toBe('success');
    expect(response.count).toBeDefined();
}, 15000);