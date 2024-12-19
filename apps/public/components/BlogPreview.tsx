import Image from 'next/image'
import Link from 'next/link'

const blogPosts = [
  {
    title: "10 Tips for Successful Crowdfunding",
    image: "/placeholder.svg",
    excerpt: "Learn the secrets to running a successful crowdfunding campaign and bringing your ideas to life.",
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
    excerpt: "Discover inspiring projects that are leveraging crowdfunding to create positive change in communities worldwide.",
    slug: "spotlight-innovative-projects",
  },
]

export default function BlogPreview() {
  return (
    <section className="py-12 md:py-20 px-6 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Latest from Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-background rounded-lg overflow-hidden shadow-md">
              <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

