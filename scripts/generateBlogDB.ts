import { writeFile, readdir } from 'fs/promises';
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
      console.log(`Opening ${fileName}`);
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
              meta.published = new Date(v).toUTCString();
            } else if (k === 'published') {
              meta[k] = new Date(v).toUTCString();
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

async function serialize(blogFile: string): Promise<Blog> {
  const metaData = await readLine(`${resolve(DIR, blogFile)}`);

  return {
    title: (metaData.title as string) ?? '',
    author: (metaData.author as string) ?? '',
    slug: blogFile.replace('.md', ''),
    published: metaData.published.toString(),
    next: null,
    prev: null,
    live: metaData.live as boolean,
    ...metaData,
  };
}

async function pushToMemory(blogs: string[], blogDB: BlogDatabase): Promise<void> {
  for (let index = 0; index < blogs.length; index++) {
    console.log(`Serializing ${blogs[index]}`);
    const blog = await serialize(blogs[index]);

    if (blog.live) {
      if (index < 10) {
        console.log(`${blogs[index]} pushed to latest`);
        blogDB.latest.push(blog);
      } else {
        console.log(`${blogs[index]} pushed to archive`);
        blogDB.archive.push(blog);
      }
    } else {
      console.warn(`${blogs[index]} was not pushed because it is not yet live`);
    }
  }

  return Promise.resolve();
}

function abridgedBlog(blog: Blog): Pick<Blog, 'title' | 'author' | 'slug' | 'published'> {
  return {
    title: blog.title,
    author: blog.author,
    published: blog.published,
    slug: blog.slug,
  };
}

async function linkAdjacentBlogs(db: BlogDatabase): Promise<void> {
  db.latest = db.latest.map((blog, index, arr) => {
    const temp = { ...blog };
    const isFirst = index === 0;
    const isLast = index === arr.length - 1;

    if (isFirst) {
      temp.next = abridgedBlog(arr[index + 1]);
      return temp;
    }

    if (isLast) {
      temp.prev = abridgedBlog(arr[index - 1]);
      return temp;
    }

    temp.next = abridgedBlog(arr[index + 1]);
    temp.prev = abridgedBlog(arr[index - 1]);
    return temp;
  });

  db.archive = db.archive.map((blog, index, arr) => {
    const temp = { ...blog };
    const isFirst = index === 0;
    const isLast = index === arr.length - 1;

    if (isFirst) {
      temp.next = abridgedBlog(arr[index + 1]);
      return temp;
    }

    if (isLast) {
      temp.prev = abridgedBlog(arr[index - 1]);
      return temp;
    }

    temp.next = abridgedBlog(arr[index + 1]);
    temp.prev = abridgedBlog(arr[index - 1]);
    return temp;
  });
}

async function main(): Promise<void> {
  console.log(`Reading blogs from directory: ${DIR}`);
  const blogs = await readdir(DIR, { encoding: 'utf8' });
  const blogDB: BlogDatabase = {
    latest: [],
    archive: [],
  };

  console.log(blogs);
  await pushToMemory(blogs, blogDB);
  await linkAdjacentBlogs(blogDB);

  console.log('Sorting blogs by published date...');
  blogDB.latest.sort((a, b) => {
    const blogA = new Date(a.published);
    const blogB = new Date(b.published);

    if (blogA > blogB) {
      return -1;
    } else if (blogA < blogB) {
      return 1;
    } else {
      return 0;
    }
  });
  console.log('Sorted latest blogs');
  blogDB.archive.sort((a, b) => {
    const blogA = new Date(a.published);
    const blogB = new Date(b.published);

    if (blogA > blogB) {
      return -1;
    } else if (blogA < blogB) {
      return 1;
    } else {
      return 0;
    }
  });
  console.log('Sorted archived blogs');

  void writeDBFile(blogDB);
}

void main();
