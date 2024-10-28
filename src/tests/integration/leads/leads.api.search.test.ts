import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { SearchInstructions } from "../../../types/search/schema";

test('searchLeads returns leads matching search criteria', async () => {
  const tracker = new Tracker();

  const searchInstructions: SearchInstructions = {
    searchtext: 'Java Project Manager',
    onlymyrecords: false,
  };

  const response = await tracker.leads.searchLeads(searchInstructions);

  // Test structure of results if there are any
  if (response.results.length > 0) {
    const firstLead = response.results[0];
    expect(firstLead).toHaveProperty('name');
    expect(firstLead).toHaveProperty('company');
    expect(firstLead).toHaveProperty('status');
    expect(firstLead).toHaveProperty('dateopened');
    expect(firstLead).toHaveProperty('details');
    expect(firstLead.details).toHaveProperty('source');
    expect(firstLead.details).toHaveProperty('clientname');
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