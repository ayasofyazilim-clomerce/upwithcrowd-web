import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for blog posts
const blogPosts = [
  {
    slug: "10-tips-for-successful-crowdfunding",
    title: "10 Tips for Successful Crowdfunding",
    excerpt:
      "Learn the secrets to running a successful crowdfunding campaign and bringing your ideas to life.",
    image: "/placeholder.svg",
    date: "2023-06-01",
    category: "Crowdfunding",
    readTime: "5 min read",
  },
  {
    slug: "the-future-of-crowdfunding",
    title: "The Future of Crowdfunding",
    excerpt:
      "Explore emerging trends and technologies shaping the future of crowdfunding and online fundraising.",
    image: "/placeholder.svg",
    date: "2023-05-15",
    category: "Industry Insights",
    readTime: "7 min read",
  },
  {
    slug: "spotlight-innovative-projects",
    title: "Spotlight: Innovative Projects Making a Difference",
    excerpt:
      "Discover inspiring projects that are leveraging crowdfunding to create positive change in communities worldwide.",
    image: "/placeholder.svg",
    date: "2023-05-01",
    category: "Project Spotlight",
    readTime: "6 min read",
  },
  {
    slug: "crowdfunding-for-nonprofits",
    title: "Crowdfunding for Nonprofits: A Complete Guide",
    excerpt:
      "Learn how nonprofits can effectively use crowdfunding to support their causes and expand their reach.",
    image: "/placeholder.svg",
    date: "2023-04-20",
    category: "Nonprofit",
    readTime: "8 min read",
  },
  {
    slug: "building-community-around-your-project",
    title: "Building a Community Around Your Crowdfunding Project",
    excerpt:
      "Discover strategies to engage supporters and create a lasting community around your crowdfunding campaign.",
    image: "/placeholder.svg",
    date: "2023-04-10",
    category: "Community",
    readTime: "6 min read",
  },
  {
    slug: "legal-considerations-for-crowdfunding",
    title: "Legal Considerations for Crowdfunding Campaigns",
    excerpt:
      "Navigate the legal landscape of crowdfunding with this comprehensive guide to regulations and best practices.",
    image: "/placeholder.svg",
    date: "2023-03-25",
    category: "Legal",
    readTime: "7 min read",
  },
];

export default function Page() {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          UPwithCrowd Blog
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg md:text-xl">
          Insights, tips, and stories from the world of crowdfunding
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link href={`/blogs/${post.slug}`} key={post.slug}>
              <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge>{post.category}</Badge>
                    <span className="text-muted-foreground text-sm">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <p className="text-muted-foreground text-sm">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
