import AnimatedBackground from "../AnimatedBackground";
import { ThemeProvider } from "../ThemeProvider";

export default function AnimatedBackgroundExample() {
  return (
    <ThemeProvider>
      <div className="relative h-screen w-full bg-background">
        <AnimatedBackground />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold">Animated Background</h1>
            <p className="mt-2 text-muted-foreground">
              Interactive particles that move and connect
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
