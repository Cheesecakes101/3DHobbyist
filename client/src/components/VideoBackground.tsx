interface VideoBackgroundProps {
  videoSrc?: string;
  opacity?: number;
}

export default function VideoBackground({ 
  videoSrc = "https://cdn.pixabay.com/video/2023/05/02/160713-822758825_large.mp4",
  opacity = 0.3 
}: VideoBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background z-10" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
        style={{ opacity }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
