import videoBackground from "@assets/AdobeStock_1524630051_Video_HD_Preview_1760661589299.mov";

export default function VideoBackground() {
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
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
