interface VideoBackgroundProps {
  videoSrc?: string;
}

export default function VideoBackground({ 
  videoSrc = "https://cdn.pixabay.com/video/2023/05/02/160713-822758825_large.mp4"
}: VideoBackgroundProps) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/90 z-10" />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover opacity-60"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
