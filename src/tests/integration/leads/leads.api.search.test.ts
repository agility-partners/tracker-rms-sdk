import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { SearchInstructions } from "../../../types/search/searchData";

test('searchContacts returns contacts matching search criteria', async () => {
  const tracker = new Tracker();

  const searchInstructions: SearchInstructions = {
    searchtext: 'Adam Smith',
    onlymyrecords: false,
  };

  const response = await tracker.contacts.searchContacts(searchInstructions);

  console.log(response)

  // Test structure of results if there are any
  if (response.results.length > 0) {
    const firstContact = response.results[0];
    expect(firstContact).toHaveProperty('firstname');
    expect(firstContact).toHaveProperty('lastname');
    expect(firstContact).toHaveProperty('email');
    expect(firstContact).toHaveProperty('phone');
    expect(firstContact).toHaveProperty('status');
    expect(firstContact).toHaveProperty('datecreated');
    expect(firstContact.details).toHaveProperty('address');
    expect(firstContact.details).toHaveProperty('title');
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