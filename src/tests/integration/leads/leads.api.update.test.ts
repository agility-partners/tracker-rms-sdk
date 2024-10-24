import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { LeadUpdateData } from "../../../types";

test('updateLead updates a lead successfully', async () => {
    // Initialize the Tracker
    const tracker = new Tracker();

    // Define the lead ID and update data
    const leadId = 58; // You might want to use a real ID or create a lead first
    const updates: Partial<LeadUpdateData> = {
        leadname: 'Updated Lead',
        potentialvalue: '600,00',
        department: "Columbus"
    };

    // Call the updateLead method
    const response = await tracker.leads.updateLead(leadId, updates);

    // Assertions
    expect(response).toBeTruthy();
    expect(response.status).toBe(0); // Success status
    expect(response.message).toBe('success');
    expect(response.count).toBeDefined();
}); 