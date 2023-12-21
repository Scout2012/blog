import { AWSDataSource } from "./AwsDataSource";
import { FsDataSource } from "./FsDataSource";

const NOTES_BUCKET = process.env.NOTES_BUCKET || '';
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID || '';
const ACCESS_KEY_SECRET = process.env.ACCESS_KEY_SECRET || '';
const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';
const REGION = process.env.POSTS_REGION || 'us-east-1';

const dataSource = ENVIRONMENT == "dev"
  ? new FsDataSource()
  : new AWSDataSource(
    {
      region: REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: ACCESS_KEY_SECRET
      }
    }
  );

export async function getAllNotes(path: string = NOTES_BUCKET) {
    // fetch all notes
    const ids = await dataSource.getAllIds(path)
    return ids.map(id => { return { params: { id } } } );
}