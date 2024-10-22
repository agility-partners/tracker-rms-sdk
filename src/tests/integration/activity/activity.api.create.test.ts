import { test, expect } from "bun:test";
import type { ActivityData } from "../../../types/activity/activityData";
import type { ActivityInstructions } from "../../../types/activity/activityTypes";
import Tracker from "../../../tracker";

test('createActivity creates a new activity successfully', async () => {
  // Initialize the Tracker
  const tracker = new Tracker();

  // Define the activity data
  const activity: ActivityData = {
    subject: 'Test Phone Call',
    type: 'Telephone',
    date: '2024-10-21',
    time: '11:34 AM',
    status: 'Completed',
    priority: 'Medium',
    contactType: 'Outbound',
    note: 'Test activity creation',
    userId: 21,
    linkRecordType: 'N',
    linkRecordId: 1854
  };

  // Define any instructions (optional)
  const instructions: ActivityInstructions = {
    
  };

  // Call the createActivity method
  const response = await tracker.activities.createActivity(activity, instructions);

  // Assertions
  expect(response).toBeTruthy();
  expect(response.message).toEqual("created");
  expect(response.recordName).toEqual(activity.subject);
});