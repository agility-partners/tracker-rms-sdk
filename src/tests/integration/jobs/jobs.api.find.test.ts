import { test, expect } from "bun:test";
import Tracker from "../../../tracker";
import { ApiError } from "../../../utils/errors";

test('findJobById retrieves a job opportunity successfully', async () => {
  const tracker = new Tracker();

  const jobId = 1056;

  try {
    const job = await tracker.jobs.findById(jobId); 
    expect(job.id).toBe(jobId);

  } catch (error) {
    console.error('Error finding or validating job:', error);
    throw error;
  }
}, 15000);

test('findJobById throws ApiError when no job is found', async () => {
  const tracker = new Tracker('https://evoapius.tracker-rms.com', {
    username: 'Andy@trackertrial.com',
    password: 'Zaga8866'
  });

  const nonExistentJobId = 999999; 

  try {
    await tracker.jobs.findById(nonExistentJobId);
    expect(true).toBe(false);  // This line should never be reached
  } catch (error) {
    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).message).toBe('No job found');
  }
}, 15000);