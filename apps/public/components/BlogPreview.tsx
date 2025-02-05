import Image from "next/image";
import Link from "next/link";
import {Button} from "./ui/button";

const blogPosts = [
  {
    title: "10 Tips for Successful Crowdfunding",
    image: "/placeholder.svg",
    excerpt:
      "Learn the secrets to running a successful crowdfunding campaign and bringing your ideas to life.Get insights from experts and learn how to maximize your campaign's potential.",
    slug: "10-tips-for-successful-crowdfunding",
  },
  {
    title: "The Future of Crowdfunding",
    image: "/placeholder.svg",
    excerpt: "Explore emerging trends and technologies shaping the future of crowdfunding and online fundraising.",
    slug: "the-future-of-crowdfunding",
  },
  {
    title: "Spotlight: Innovative Projects Making a Difference",
    image: "/placeholder.svg",
    excerpt:
      "Discover inspiring projects that are leveraging crowdfunding to create positive change in communities worldwide.",
    slug: "spotlight-innovative-projects",
  },
];

export default function BlogPreview() {
  return (
    <section className="bg-muted px-6 py-12 md:py-20">
      <div className="container mx-auto">
        <h2 className="mb-10 text-center text-3xl font-bold">Latest from Our Blog</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-background flex flex-col justify-between overflow-hidden rounded-lg shadow-md">
              <Image src={post.image} alt={post.title} width={300} height={200} className="h-48 w-full object-cover" />
              <div className="grid grid-rows-[auto_1fr_auto] p-6">
                <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <Button className="mt-4 self-start">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
