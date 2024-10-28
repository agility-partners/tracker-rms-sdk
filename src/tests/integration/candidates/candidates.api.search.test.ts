import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { SearchInstructions } from "../../../types/search/schema";

test('searchCandidates returns candidates matching search criteria', async () => {
    const tracker = new Tracker();

    const searchInstructions: SearchInstructions = {
        searchtext: 'Jane Selby',
        onlymyrecords: false,
    };

    const response = await tracker.candidates.searchCandidates(searchInstructions);

    console.log(response)

    // Test structure of results if there are any
    if (response.results.length > 0) {
        const firstCandidate = response.results[0];
        expect(firstCandidate).toHaveProperty('name');
        expect(firstCandidate).toHaveProperty('company');
        expect(firstCandidate).toHaveProperty('status');
        expect(firstCandidate).toHaveProperty('dateopened');
        expect(firstCandidate).toHaveProperty('details');
        expect(firstCandidate.details).toHaveProperty('firstname');
        expect(firstCandidate.details).toHaveProperty('lastname');
        expect(firstCandidate.details).toHaveProperty('jobtitle');
        expect(firstCandidate).toHaveProperty('customfields');
        expect(Array.isArray(firstCandidate.customfields)).toBeTruthy();
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