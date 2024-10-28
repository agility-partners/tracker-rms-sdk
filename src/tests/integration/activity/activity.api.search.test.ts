import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { SearchInstructions } from "../../../types/search/schema";

test('searchActivities returns activities matching search criteria', async () => {
    const tracker = new Tracker();

    const searchInstructions: SearchInstructions = {
        searchtext: 'Telephone Call',
        onlymyrecords: false,
    };

    const response = await tracker.activities.searchActivities(searchInstructions);

    console.log(response);

    // Test structure of results if there are any
    if (response.results.length > 0) {
        const firstActivity = response.results[0];
        expect(firstActivity).toHaveProperty('name');
        expect(firstActivity).toHaveProperty('company');
        expect(firstActivity).toHaveProperty('status');
        expect(firstActivity).toHaveProperty('dateopened');
        expect(firstActivity).toHaveProperty('details');
        expect(firstActivity.details).toHaveProperty('subject');
        expect(firstActivity.details).toHaveProperty('activityTypeId');
        expect(firstActivity.details).toHaveProperty('ActivityTypeName');
        expect(firstActivity.details).toHaveProperty('datedue');
        expect(firstActivity.details).toHaveProperty('timedue');
        expect(firstActivity.details).toHaveProperty('userid');
        expect(firstActivity.details).toHaveProperty('priority');
        expect(firstActivity.details).toHaveProperty('contacttype');
        expect(firstActivity).toHaveProperty('customfields');
        expect(Array.isArray(firstActivity.customfields)).toBeTruthy();
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