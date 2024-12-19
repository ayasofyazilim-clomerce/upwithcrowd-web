'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, LinkIcon } from 'lucide-react'

// Mock data for a single blog post
const blogPost = {
  slug: "10-tips-for-successful-crowdfunding",
  title: "10 Tips for Successful Crowdfunding",
  content: `
    <p>Crowdfunding has revolutionized the way individuals and organizations raise funds for their projects and causes. Whether you're an entrepreneur, artist, or nonprofit, these ten tips will help you run a successful crowdfunding campaign:</p>

    <h2>1. Define Your Goals Clearly</h2>
    <p>Before launching your campaign, clearly define what you're raising funds for and how much you need. Be specific about how the funds will be used and what backers can expect in return.</p>

    <h2>2. Tell a Compelling Story</h2>
    <p>Your campaign should tell a story that resonates with potential backers. Share your passion, motivation, and the impact your project will have. Use a mix of text, images, and video to bring your story to life.</p>

    <h2>3. Set Realistic Funding Goals</h2>
    <p>While it's tempting to aim high, setting a realistic funding goal increases your chances of success. Research similar campaigns in your category to get an idea of what's achievable.</p>

    <h2>4. Offer Attractive Rewards</h2>
    <p>Create a range of reward tiers that appeal to different types of backers. Offer exclusive or limited-edition items related to your project to incentivize higher contributions.</p>

    <h2>5. Build a Strong Team</h2>
    <p>Assemble a team of supporters who can help spread the word about your campaign. Assign roles such as social media manager, content creator, and outreach coordinator.</p>

    <h2>6. Create a Marketing Plan</h2>
    <p>Develop a comprehensive marketing plan that includes social media, email marketing, press releases, and influencer outreach. Start building buzz before your campaign launches.</p>

    <h2>7. Engage with Your Audience</h2>
    <p>Regularly update your backers on the progress of your campaign and respond promptly to questions and comments. Engagement builds trust and encourages sharing.</p>

    <h2>8. Leverage Social Proof</h2>
    <p>Showcase endorsements, testimonials, and media mentions to build credibility. Early backers can help create momentum, so consider reaching out to your network before the public launch.</p>

    <h2>9. Be Transparent</h2>
    <p>Be open about potential challenges and how you plan to overcome them. Transparency builds trust with your backers and can lead to stronger support.</p>

    <h2>10. Follow Through on Promises</h2>
    <p>After your campaign ends, keep your backers informed about the progress of your project. Deliver rewards on time and as described to maintain goodwill and support for future endeavors.</p>

    <p>By following these tips, you'll be well on your way to running a successful crowdfunding campaign. Remember, success often comes from a combination of careful planning, authentic storytelling, and persistent effort. Good luck with your crowdfunding journey!</p>
  `,
  image: "/placeholder.svg",
  date: "2023-06-01",
  category: "Crowdfunding",
  readTime: "5 min read",
  lastUpdated: "2023-06-05",
  author: {
    name: "Jane Doe",
    avatar: "/placeholder.svg",
    role: "Crowdfunding Expert"
  },
  topics: ["Crowdfunding", "Fundraising", "Project Management"]
}

export default function BlogDetailPage() {
  const params = useParams()
  const { slug } = params

  // In a real application, you would fetch the blog post data based on the slug
  // For this example, we're using the mock data

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <Badge>{blogPost.category}</Badge>
              <span className="text-sm text-muted-foreground">{new Date(blogPost.date).toLocaleDateString()}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blogPost.title}</h1>
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg mb-6"
            />
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg mb-8">
              <div className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                  <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{blogPost.author.name}</p>
                  <p className="text-sm text-muted-foreground">{blogPost.author.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm font-semibold">Topics</p>
                  <p className="text-sm text-muted-foreground">{blogPost.topics.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Read Time</p>
                  <p className="text-sm text-muted-foreground">{blogPost.readTime}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Last Updated</p>
                  <p className="text-sm text-muted-foreground">{new Date(blogPost.lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

          <div className="flex justify-between items-center border-t border-b py-4 mb-8">
            <div className="text-sm text-muted-foreground">Share this article:</div>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </article>
      </main>

      {/* Floating share buttons on the left side */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col space-y-4">
        <Button variant="outline" size="icon">
          <Facebook className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Twitter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

