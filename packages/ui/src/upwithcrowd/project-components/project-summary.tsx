"use client";

import {
  UpwithCrowd_Projects_ProjectsResponseDto,
  UpwithCrowd_Projects_ProjectsFundingResponseDto,
  UpwithCrowd_Files_FileResponseListDto,
  UpwithCrowd_Projects_ProjectStatisticsDto,
} from "@repo/actions/upwithcrowd/types";
import {Button} from "@repo/ayasofyazilim-ui/atoms/button";
import {Progress} from "@repo/ayasofyazilim-ui/atoms/progress";
import {Badge} from "@repo/ayasofyazilim-ui/atoms/badge";
import {cn, formatCurrency} from "@repo/ui/utils";
import {ChevronLeft, ChevronRight, Film} from "lucide-react";
import Image from "next/image";
import {useEffect, useRef, useState} from "react";

// Helper function to determine if a file is a video
const isVideoFile = (filePath: string | null | undefined): boolean => {
  if (!filePath) return false;
  return (
    filePath.includes("/Videos/") ||
    filePath.toLowerCase().endsWith(".mp4") ||
    filePath.toLowerCase().endsWith(".mov") ||
    filePath.toLowerCase().endsWith(".avi")
  );
};

export default function ProjectSummary({
  basics,
  funding,
  fileResponse,
  statsResponse,
}: {
  basics: UpwithCrowd_Projects_ProjectsResponseDto;
  funding: UpwithCrowd_Projects_ProjectsFundingResponseDto;
  fileResponse: UpwithCrowd_Files_FileResponseListDto[];
  statsResponse: UpwithCrowd_Projects_ProjectStatisticsDto | null;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasFiles = fileResponse.length > 0;
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const currentFile = hasFiles ? fileResponse[currentImageIndex] : null;
  const isCurrentFileVideo = currentFile ? isVideoFile(currentFile.fullPath) : false;

  const nextImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => (prev + 1) % fileResponse.length);
    }
  };

  const prevImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => (prev - 1 + fileResponse.length) % fileResponse.length);
    }
  };

  // Reset transition state after animation completes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isTransitioning]);

  // Handle video playback when changing slides
  useEffect(() => {
    if (videoRef.current) {
      // Reset video when changing slides
      videoRef.current.currentTime = 0;

      // If autoplay is desired, uncomment the following line:
      // videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [currentImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasFiles, isTransitioning]);

  const scrollThumbnails = (direction: "left" | "right") => {
    if (!thumbnailsRef.current) return;

    const container = thumbnailsRef.current;
    const scrollAmount = direction === "left" ? -140 : 140; // Approximate width of 2 thumbnails + gap

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold md:text-3xl">{basics.projectName}</h2>
      <p className="text-md mb-4 font-medium md:text-lg">{basics.projectDefinition}</p>
      <p className="text-normal mb-4">
        <span className="text-primary font-bold">{formatCurrency(statsResponse?.totalInvestment)}</span> of{" "}
        {formatCurrency(funding.fundableAmount)} toplandı
      </p>

      <div className="relative mx-auto mb-2 w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg">
        <div className="relative aspect-video w-full">
          {(() => {
            if (!hasFiles) {
              return (
                <Image
                  alt={`${basics.projectName} - No Image Available`}
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  src="/placeholder.jpg"
                />
              );
            }

            if (isCurrentFileVideo) {
              return (
                <video
                  className={cn(
                    "h-full w-full object-cover transition-all duration-300",
                    isTransitioning ? "scale-[1.02] opacity-70" : "scale-100 opacity-100",
                  )}
                  controls
                  playsInline
                  ref={videoRef}
                  src={currentFile?.fullPath ?? ""}>
                  <track kind="captions" label="English" src="" />
                </video>
              );
            }

            return (
              <Image
                alt={`${basics.projectName} - Image ${currentImageIndex + 1}`}
                className={cn(
                  "object-cover transition-all duration-300",
                  isTransitioning ? "scale-[1.02] opacity-70" : "scale-100 opacity-100",
                )}
                fill
                priority={currentImageIndex === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                src={currentFile?.fullPath ?? "/placeholder.jpg"}
              />
            );
          })()}

          <Badge className="bg-primary text-primary-foreground absolute right-4 top-4 px-3 py-1 text-sm font-medium shadow-md">
            {funding.fundCollectionType}
          </Badge>

          {hasFiles && fileResponse.length > 1 ? (
            <>
              <Button
                aria-label="Previous image"
                className="focus:ring-primary absolute left-3 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm hover:bg-white focus:ring-2 focus:ring-offset-2"
                onClick={() => {
                  prevImage();
                  scrollThumbnails("left");
                }}
                size="icon"
                type="button"
                variant="secondary">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                aria-label="Next image"
                className="focus:ring-primary absolute right-3 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm hover:bg-white focus:ring-2 focus:ring-offset-2"
                onClick={() => {
                  nextImage();
                  scrollThumbnails("right");
                }}
                size="icon"
                type="button"
                variant="secondary">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          ) : null}
        </div>
      </div>

      {/* Carousel-style Thumbnails Gallery */}
      {hasFiles && fileResponse.length > 1 ? (
        <div className="relative mb-6 rounded-lg p-2">
          <div className="flex w-full items-center justify-between">
            <Button
              aria-label="Scroll thumbnails left"
              className="mr-2 h-8 w-8 flex-shrink-0 rounded-full"
              onClick={() => {
                scrollThumbnails("left");
              }}
              size="icon"
              type="button"
              variant="outline">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div
              className="flex max-w-full gap-2 overflow-x-hidden scroll-smooth px-1 py-1 md:gap-3"
              ref={thumbnailsRef}>
              {fileResponse.map((file, index) => {
                const isVideo = isVideoFile(file.fullPath);
                const fileUrl = file.fullPath || "";

                return (
                  <button
                    aria-label={`Select ${isVideo ? "video" : "image"} ${index + 1}`}
                    className={cn(
                      "focus-visible:ring-primary group relative min-w-0 flex-shrink-0 cursor-pointer overflow-hidden rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2",
                      index === currentImageIndex ? "scale-105" : "opacity-70 hover:opacity-100 hover:shadow-sm",
                    )}
                    key={`thumb-${file.fileId || index}`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                    }}
                    type="button">
                    <div className="h-18 relative w-24 overflow-hidden rounded-md md:h-20 md:w-32">
                      <Image
                        alt={`${isVideo ? "Video" : ""} Thumbnail ${index + 1}`}
                        className={cn(
                          "object-cover transition-transform duration-300",
                          index === currentImageIndex ? "" : "group-hover:scale-105",
                        )}
                        fill
                        sizes="(max-width: 768px) 96px, 128px"
                        src={fileUrl}
                      />

                      {/* Video indicator */}
                      {isVideo ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Film className="h-6 w-6 text-white" />
                        </div>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>

            <Button
              aria-label="Scroll thumbnails right"
              className="ml-2 h-8 w-8 flex-shrink-0 rounded-full"
              onClick={() => {
                scrollThumbnails("right");
              }}
              size="icon"
              type="button"
              variant="outline">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : null}

      <Progress className="mb-4 h-3" value={10} />

      <div className="mb-6 flex justify-between text-sm">
        <span>{formatCurrency(statsResponse?.totalInvestment)} toplandı</span>
        <span>
          {funding.projectEndDate
            ? Math.ceil((new Date(funding.projectEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
            : "N/A"}
          gün kaldı
        </span>
        <span> {formatCurrency(funding.fundableAmount)} hedef</span>
      </div>
    </>
  );
}
