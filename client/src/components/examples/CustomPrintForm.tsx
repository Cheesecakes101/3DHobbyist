import CustomPrintForm from "../CustomPrintForm";
import { ThemeProvider } from "../ThemeProvider";

export default function CustomPrintFormExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-2xl mx-auto">
        <CustomPrintForm />
      </div>
    </ThemeProvider>
  );
}
