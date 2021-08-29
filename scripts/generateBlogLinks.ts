import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';
import { writeFile, readdir } from 'fs/promises';
import { resolve } from 'path';

async function main(): Promise<void> {
  const jevesClient = new S3Client({
    credentials: {
      accessKeyId: 'AKIAZ6I4426MCLWQCRPW',
      secretAccessKey: '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',
    },
    region: 'us-east-2',
  });

  const command = new ListObjectsCommand({
    Bucket: 'obscurelymeclub',
    Prefix: 'blogs/',
  });

  const response = await jevesClient.send(command);

  if (!response.Contents) {
    console.error('No blogs were found!');
    process.exit(1);
  }

  const parsed = response.Contents.map((content) => ({
    slug: `/${content?.Key?.replace('.md', '')}`,
    link: `/${content.Key}`,
    published: content.LastModified,
  }));

  try {
    console.log('Writing to links.json...');
    await writeFile('./src/links.json', JSON.stringify(parsed));
    console.log('Successfully wrote to link.json!');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function main2(): Promise<void> {
  const DIR = resolve(process.cwd(), 'public', 'blogs');
  console.log(`Reading blogs from directory: ${DIR}`);
  const blogs = await readdir(DIR, { encoding: 'utf8' });
  console.log(blogs);
}

void main2();
