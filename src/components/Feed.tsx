"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Calendar, Briefcase, BookOpen, LucideIcon } from "lucide-react";
import { JSX } from "react";

// 1. Define strong types for your post data for better code safety
type PostCategory = "Event" | "Placement" | "Resource";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  authorImage: string; // URL for the author's avatar
  timestamp: string;
  category: PostCategory;
};

// 2. Expanded post data for a richer UI
const posts: Post[] = [
  {
    id: 1,
    title: "University Fest 2025 🎉",
    content: "Join us at the main ground for a week of cultural events, music, and fun. Don't miss the final concert!",
    author: "Cultural Committee",
    authorImage: "https://ui-avatars.com/api/?name=CC&background=8b5cf6&color=fff",
    timestamp: "4h ago",
    category: "Event",
  },
  {
    id: 2,
    title: "Big Tech Placement Drive",
    content: "Infosys and TCS are visiting campus next week. Final year students should register on the portal immediately.",
    author: "Placement Cell",
    authorImage: "https://ui-avatars.com/api/?name=PC&background=22c55e&color=fff",
    timestamp: "1d ago",
    category: "Placement",
  },
  {
    id: 3,
    title: "New Study Resources",
    content: "Fresh materials for Data Structures and Algorithms have just been uploaded to the student portal.",
    author: "Academics Dept.",
    authorImage: "https://ui-avatars.com/api/?name=AD&background=f97316&color=fff",
    timestamp: "2d ago",
    category: "Resource",
  },
];

// 3. Map categories to specific icons for better visual cues
const categoryIcons: Record<PostCategory, LucideIcon> = {
  Event: Calendar,
  Placement: Briefcase,
  Resource: BookOpen,
};

export default function Feed(): JSX.Element {
  return (
    // 4. A responsive grid layout that adapts to screen size
    <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
        const Icon = categoryIcons[post.category];
        return (
          // 5. Enhanced card with hover effects for a dynamic feel
          <Card
            key={post.id}
            className="flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <Avatar>
                <AvatarImage src={post.authorImage} alt={`${post.author} avatar`} />
                <AvatarFallback>
                  {post.author.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                <CardDescription>
                  {post.author} • {post.timestamp}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{post.content}</p>
            </CardContent>
            <CardFooter>
              <Badge variant="secondary" className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{post.category}</span>
              </Badge>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}