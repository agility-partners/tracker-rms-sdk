import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { SearchInstructions } from "../../../types/search/schema";

test('searchContacts returns contacts matching search criteria', async () => {
  const tracker = new Tracker();

  const searchInstructions: SearchInstructions = {
    searchtext: 'Adam Smith',
    onlymyrecords: false,
  };

  const response = await tracker.contacts.searchContacts(searchInstructions);

  // Test structure of results if there are any
  if (response.results.length > 0) {
    const firstContact = response.results[0];
    expect(firstContact).toHaveProperty('name');
    expect(firstContact).toHaveProperty('company');
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