import CustomCursor from "../CustomCursor";
import { ThemeProvider } from "../ThemeProvider";
import { Button } from "@/components/ui/button";

export default function CustomCursorExample() {
  return (
    <ThemeProvider>
      <div className="p-8 space-y-8">
        <CustomCursor />
        <h1 className="font-display text-2xl font-bold">Custom Cursor Demo</h1>
        <p className="text-muted-foreground">Move your mouse around to see the custom cursor effect</p>
        <div className="space-x-4">
          <Button>Hover over me</Button>
          <Button variant="outline">Or me</Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
