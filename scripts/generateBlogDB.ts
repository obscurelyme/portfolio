import { writeFile, readdir } from 'fs/promises';
import { statSync } from 'fs';
import { resolve } from 'path';
import lineReader from 'line-reader';

const DIR = resolve(process.cwd(), 'public', 'blogs');

type MetaData = Record<string, string | boolean>;

interface Blog {
  slug: string;
  title: string;
  author: string;
  published: string;
  next: Partial<Blog> | null;
  prev: Partial<Blog> | null;
  live: boolean;
}

interface BlogDatabase {
  latest: Blog[];
  archive: Blog[];
}

async function writeDBFile(db: any): Promise<void> {
  try {
    console.log('Writing to links.json...');
    await writeFile('./src/db.json', JSON.stringify(db));
    console.log('Successfully wrote to ./src/db.json');
  } catch (e) {
    console.error(e);
    process.exit(5);
  }
}

function readLine(fileName: string): Promise<MetaData> {
  return new Promise((resolve) => {
    const meta: MetaData = {};
    lineReader.open(fileName, (err: Error, reader: any) => {
      let reading = true;

      function d() {
        reader.nextLine((e: Error, line: string) => {
          if (e) {
            console.error(e);
            console.log(
              `NOTE: If you did not expect this then you should check the format of the file ${fileName} and see if contains valid meta data`,
            );
            process.exit(2);
          }
          if (line === '-->') {
            reading = false;
            reader.close((closeError: Error) => {
              if (closeError) {
                console.error(closeError);
                console.log(`NOTE: This means there was an error closing the file ${fileName}`);
                process.exit(3);
              }
              if (meta.live === undefined) meta.live = true;
              return resolve(meta);
            });
          } else if (line !== '<!--') {
            const [k, v] = line.trim().split(':');
            if (k === 'live') {
              meta[k] = new Date(v) <= new Date(Date.now());
            } else {
              meta[k] = v;
            }
          }
        });
      }

      if (err) {
        console.error(err);
        process.exit(1);
      }

      while (reading) {
        d();
      }
    });
  });
}

async function serialize(
  blogs: string[],
  blogFile: string,
  index: number,
  isLast: boolean = false,
  isFirst: boolean = false,
): Promise<Blog> {
  const blogStats = statSync(`${resolve(DIR, blogFile)}`);
  const metaData = await readLine(`${resolve(DIR, blogFile)}`);

  return {
    title: (metaData.title as string) ?? '',
    author: (metaData.author as string) ?? '',
    slug: blogFile.replace('.md', ''),
    published: blogStats.birthtime.toString(),
    next: !isLast ? { title: blogs[index + 1], slug: blogs[index + 1].replace('.md', '') } : null,
    prev: !isFirst ? { title: blogs[index - 1], slug: blogs[index - 1].replace('.md', '') } : null,
    live: metaData.live as boolean,
  };
}

async function pushToMemory(blogs: string[], blogDB: BlogDatabase): Promise<void> {
  return new Promise((resolve) => {
    blogs.forEach(async (blogFile, index) => {
      const isFirst = index === 0;
      const isLast = index === blogs.length - 1;
      const blog = await serialize(blogs, blogFile, index, isLast, isFirst);

      if (blog.live) {
        if (index < 10) {
          blogDB.latest.push(await serialize(blogs, blogFile, index, isLast, isFirst));
        } else {
          blogDB.archive.push(await serialize(blogs, blogFile, index, isLast, isFirst));
        }
      }

      if (isLast) {
        return resolve();
      }
    });
  });
}

async function main(): Promise<void> {
  console.log(`Reading blogs from directory: ${DIR}`);
  const blogs = await readdir(DIR, { encoding: 'utf8' });
  const blogDB: BlogDatabase = {
    latest: [],
    archive: [],
  };

  blogs.sort((a, b) => {
    const aStats = statSync(`${resolve(DIR, a)}`);
    const bStats = statSync(`${resolve(DIR, b)}`);

    return bStats.birthtimeMs - aStats.birthtimeMs;
  });

  await pushToMemory(blogs, blogDB);

  void writeDBFile(blogDB);
}

void main();
