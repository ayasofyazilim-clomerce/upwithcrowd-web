"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, LinkIcon, Twitter } from "lucide-react";
import Image from "next/image";
import { blogPost } from "@/_data/blogs";
// Mock data for a single blog post

export default function BlogDetailPage() {
  // In a real application, you would fetch the blog post data based on the slug
  // For this example, we're using the mock data
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <article className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <Badge>{blogPost.category}</Badge>
              <span className="text-muted-foreground text-sm">
                {new Date(blogPost.date).toLocaleDateString()}
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              {blogPost.title}
            </h1>
            <Image
              src={blogPost.image}
              alt={blogPost.title}
              width={800}
              height={400}
              className="mb-6 h-auto w-full rounded-lg"
            />
            <div className="bg-muted mb-8 flex items-center justify-between rounded-lg p-4">
              <div className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage
                    src={blogPost.author.avatar}
                    alt={blogPost.author.name}
                  />
                  <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{blogPost.author.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {blogPost.author.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm font-semibold">Topics</p>
                  <p className="text-muted-foreground text-sm">
                    {blogPost.topics.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Read Time</p>
                  <p className="text-muted-foreground text-sm">
                    {blogPost.readTime}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Last Updated</p>
                  <p className="text-muted-foreground text-sm">
                    {new Date(blogPost.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="prose mb-12 max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          <div className="mb-8 flex items-center justify-between border-b border-t py-4">
            <div className="text-muted-foreground text-sm">
              Share this article:
            </div>
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
      <div className="fixed left-4 top-1/2 hidden -translate-y-1/2 transform flex-col space-y-4 lg:flex">
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
  );
}
