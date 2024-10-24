import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import type { CandidateUpdateData } from "../../../types/candidate";

test('updateCandidate updates a candidate successfully', async () => {
    // Initialize the Tracker
    const tracker = new Tracker();

    const candidateId = 133; 
    const updates: Partial<CandidateUpdateData> = {
        firstname: 'James',
        department: 'Columbus',
        jobtitle: 'Senior Java Developer',
        addressline1: '456 tech street',
        workphone: '4192023773'
    };

    // Call the updateCandidate method
    const response = await tracker.candidates.updateCandidate(candidateId, updates);

    // Assertions
    expect(response).toBeTruthy();
    expect(response.status).toBe(0); // Success status
    expect(response.message).toBe('success');
    expect(response.count).toBeDefined();
}, 15000);