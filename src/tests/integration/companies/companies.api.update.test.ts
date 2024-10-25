import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { CompanyUpdateData } from "../../../types/company";

test('updateCompany updates a company successfully', async () => {
    // Initialize the Tracker
    const tracker = new Tracker();

    const companyId = 1741; // Using the company ID from your example data
    const updates: Partial<CompanyUpdateData> = {
        clientname: 'New Tech Solutions Inc',
        addressline1: '123 Innovation Drive',
        addressline2: 'Suite 500',
        town: 'San Francisco',
        county: 'CA',
        postcode: '94105',
        country: 'United States',
        telephone: '415-555-0123',
        email: 'info@newtechsolutions.com',
        website: 'www.newtechsolutions.com',
        department: 'Corporate',
        ranking: 'A',
        targetrevenue: '1000000',
        clientsource: 'Referral'
    };

    // Call the updateCompany method
    const response = await tracker.companies.updateCompany(companyId, updates);

    // Assertions
    expect(response).toBeTruthy();
    expect(response.status).toBe(0); // Success status
    expect(response.message).toBe('success');
    expect(response.count).toBeDefined();
}, 15000);