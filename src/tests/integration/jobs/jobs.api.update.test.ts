import { test, expect } from "bun:test";
import Tracker from "../../../tracker";

test('updateJob updates a job opportunity successfully', async () => {
  const tracker = new Tracker();

  const jobId = 1056; // Use an existing job ID
  const updatedName = `Updated Job Name ${Date.now()}`; // Ensure unique name for each test run

  // First, retrieve the job
  const initialJob = await tracker.jobs.findById(jobId);
  expect(initialJob.id).toBe(jobId);

  // Update the job
  await tracker.jobs.updateJob(jobId, {
    opportunityname: updatedName
  });

  // Retrieve the job again to check if updates were applied
  const updatedJob = await tracker.jobs.findById(jobId);
  
  // Check if the updates were applied successfully
  expect(updatedJob.id).toBe(jobId);
  expect(updatedJob.name).toBe(updatedName);


}, 15000); 