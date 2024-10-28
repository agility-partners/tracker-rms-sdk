import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { SearchInstructions } from "../../../types/search/schema";

test('searchJobs returns jobs matching search criteria', async () => {
    const tracker = new Tracker();

    const searchInstructions: SearchInstructions = {
        searchtext: 'Data Center Operations Analyst',
        onlymyrecords: false,
    };

    const response = await tracker.jobs.searchJobs(searchInstructions);

    console.log(response);

    // Test structure of results if there are any
    if (response.results.length > 0) {
        const firstJob = response.results[0];
        expect(firstJob).toHaveProperty('name');
        expect(firstJob).toHaveProperty('company');
        expect(firstJob).toHaveProperty('status');
        expect(firstJob).toHaveProperty('dateopened');
        expect(firstJob).toHaveProperty('details');
        expect(firstJob.details).toHaveProperty('clientid');
        expect(firstJob.details).toHaveProperty('clientname');
        expect(firstJob.details).toHaveProperty('contactid');
        expect(firstJob.details).toHaveProperty('contactname');
        expect(firstJob.details).toHaveProperty('type');
        expect(firstJob.details).toHaveProperty('values');
        expect(firstJob.details).toHaveProperty('shortlisted');
        expect(firstJob.details).toHaveProperty('Owners');
        expect(Array.isArray(firstJob.details.Owners)).toBeTruthy();
        expect(firstJob).toHaveProperty('customfields');
        expect(Array.isArray(firstJob.customfields)).toBeTruthy();
    }

    // Verify response structure
    expect(response.status).toBe(0); // Success status
    expect(response.message).toBe('success');
    expect(response.count).toBeDefined();
    expect(Array.isArray(response.results)).toBeTruthy();

    // Test length if numrecords was specified
    if (searchInstructions.numrecords) {
        expect(response.results.length).toBeLessThanOrEqual(searchInstructions.numrecords);
    }
}, 15000);