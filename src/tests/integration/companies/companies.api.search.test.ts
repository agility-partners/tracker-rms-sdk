import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { SearchInstructions } from "../../../types/search/schema";

test('searchCompanies returns companies matching search criteria', async () => {
    const tracker = new Tracker();

    const searchInstructions: SearchInstructions = {
        searchtext: 'New Tech Solutions Inc',
        onlymyrecords: false,
    };

    const response = await tracker.companies.searchCompanies(searchInstructions);

    // Test structure of results if there are any
    if (response.results.length > 0) {
        const firstCompany = response.results[0];
        expect(firstCompany).toHaveProperty('name');
        expect(firstCompany).toHaveProperty('company');
        expect(firstCompany).toHaveProperty('status');
        expect(firstCompany).toHaveProperty('dateopened');
        expect(firstCompany).toHaveProperty('details');
        expect(firstCompany.details).toHaveProperty('address1');
        expect(firstCompany.details).toHaveProperty('email');
        expect(firstCompany.details).toHaveProperty('website');
        expect(firstCompany.details).toHaveProperty('telephone');
        expect(firstCompany.details).toHaveProperty('type');
        expect(firstCompany.details).toHaveProperty('rank');
        expect(firstCompany.details).toHaveProperty('territory');
        expect(firstCompany.details).toHaveProperty('owner');
        expect(firstCompany.details).toHaveProperty('clienttypes');
        expect(firstCompany).toHaveProperty('customfields');
        expect(Array.isArray(firstCompany.customfields)).toBeTruthy();
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