'use client';

import React from 'react'
import Image from 'next/image'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { MapPin, DollarSign, Target } from 'lucide-react'

type Project = {
  id: number
  title: string
  image: string
  location: string
  badge: string
  goal: number
  raised: number
}

const projects: Project[] = [
  {
    id: 1,
    title: "Eco-Friendly Water Purifier",
    image: "/placeholder.svg",
    location: "San Francisco, CA",
    badge: "Environment",
    goal: 50000,
    raised: 35000,
  },
  {
    id: 2,
    title: "Solar-Powered Education Kits",
    image: "/placeholder.svg",
    location: "Nairobi, Kenya",
    badge: "Education",
    goal: 30000,
    raised: 22500,
  },
  {
    id: 3,
    title: "Community Garden Initiative",
    image: "/placeholder.svg",
    location: "London, UK",
    badge: "Community",
    goal: 20000,
    raised: 15000,
  },
  {
    id: 4,
    title: "Affordable 3D-Printed Prosthetics",
    image: "/placeholder.svg",
    location: "Berlin, Germany",
    badge: "Healthcare",
    goal: 40000,
    raised: 28000,
  },
]

const columnHelper = createColumnHelper<Project>()

const columns = [
  columnHelper.accessor('image', {
    header: 'Project',
    cell: (info) => (
      <div className="relative">
        <Image
          src={info.getValue()}
          alt={info.row.original.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge className="absolute bottom-4 left-4 bg-primary text-primary-foreground">
          {info.row.original.badge}
        </Badge>
      </div>
    ),
  }),
  columnHelper.accessor('title', {
    header: 'Details',
    cell: (info) => {
      const project = info.row.original
      const fundedPercentage = (project.raised / project.goal) * 100
      return (
        <div className="p-4">
          <div className="flex items-center text-xs md:text-sm text-muted-foreground mb-2">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            {project.location}
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">{project.title}</h3>
          <div className="bg-muted-foreground/5 p-3 md:p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm font-medium">Funded: {fundedPercentage.toFixed(0)}%</span>
              <span className="text-xs md:text-sm text-muted-foreground">30 days left</span>
            </div>
            <Progress value={fundedPercentage} className="mb-3 md:mb-4" />
            <div className="flex justify-between items-center text-xs md:text-sm">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-primary mr-2" />
                <div>
                  <p className="font-semibold">${project.raised.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">raised</p>
                </div>
              </div>
              <div className="flex items-center">
                <Target className="w-5 h-5 text-primary mr-2" />
                <div>
                  <p className="font-semibold">${project.goal.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">goal</p>
                </div>
              </div>
            </div>
          </div>
          <Button className="w-full mt-4">Support This Project</Button>
        </div>
      )
    },
  }),
]

export default function FeaturedProjects() {
  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <section className="py-20 px-6 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {table.getRowModel().rows.map((row) => (
            <Card key={row.id} className="overflow-hidden">
              {row.getVisibleCells().map((cell) => (
                <React.Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </React.Fragment>
              ))}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

