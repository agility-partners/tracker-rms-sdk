import { 
    Activities,
    Candidates, 
    Contacts, 
    Jobs, 
    Leads,
    Placements,
    Settings
} from './api';
import { Companies } from './api/companies';
import { ResourceApplications } from './api/resourceApplication';
import { createAPIClient } from './config/apiClient';
import type { Credentials } from './types';

class Tracker {
  private baseURL: string;
  private credentials: Credentials;
  private client: ReturnType<typeof createAPIClient>;

  public contacts: Contacts;
  public leads: Leads;
  public jobs: Jobs
  public candidates: Candidates;
  public activities: Activities;
  public companies: Companies
  public resourceApplications: ResourceApplications
  public placements: Placements
  public settings: Settings

  constructor(baseURL?: string, credentials?: Credentials) {
    this.baseURL = baseURL || process.env.TRACKER_BASE_URL || '';
    
    this.credentials = credentials || {
      username: process.env.TRACKER_USERNAME || '',
      password: process.env.TRACKER_PASSWORD || ''
    };

    if (!this.baseURL) {
      throw new Error('No base URL provided. Set TRACKER_BASE_URL environment variable or pass baseURL to constructor');
    }

    if (!this.credentials.username || !this.credentials.password) {
      throw new Error('No credentials provided. Set TRACKER_USERNAME and TRACKER_PASSWORD environment variables or pass credentials to constructor');
    }

    this.client = createAPIClient(this.baseURL);

    this.contacts = new Contacts(this.client, this.credentials);
    this.leads = new Leads(this.client, this.credentials);
    this.jobs = new Jobs(this.client, this.credentials);
    this.candidates = new Candidates(this.client, this.credentials);
    this.activities = new Activities(this.client, this.credentials);
    this.companies = new Companies(this.client, this.credentials);
    this.resourceApplications = new ResourceApplications(this.client, this.credentials)
    this.placements = new Placements(this.client, this.credentials);
    this.settings = new Settings(this.client, this.credentials);
  }
}

export default Tracker;