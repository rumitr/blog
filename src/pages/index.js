import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { getAllPosts } from "../lib/data";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {posts.map((item) => (
          <BlogListItem key={item.slug} {...item} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts.map(({ data, content, slug }) => ({
        ...data,
        date: data.date.toISOString(),
        content,
        slug,
      })),
    },
  };
}

function BlogListItem({ slug, title, date, content }) {
  return (
    <div>
      <div>
        <Link href={`/blog/${slug}`}>
          <a>{title}</a>
        </Link>
      </div>
      <div>{format(parseISO(date), "MMMM do, uuu")}</div>
      <div>{content.substr(0, 300)}</div>
    </div>
  );
}
