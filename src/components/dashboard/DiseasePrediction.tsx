import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Edit3,
  Play
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiseasePredictionProps {
  onMascotStateChange: (state: 'idle' | 'wave' | 'blink' | 'concerned' | 'dance') => void;
  onMascotMessage: (message: string) => void;
}

type PredictionStep = 'upload' | 'extract' | 'edit' | 'result';

interface ExtractedData {
  age: number;
  bloodPressure: number;
  cholesterol: number;
  glucose: number;
  heartRate: number;
  bmi: number;
  smoking: 'yes' | 'no';
  exercise: 'regular' | 'occasional' | 'rare';
}

export const DiseasePrediction: React.FC<DiseasePredictionProps> = ({
  onMascotStateChange,
  onMascotMessage
}) => {
  const [currentStep, setCurrentStep] = useState<PredictionStep>('upload');
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<ExtractedData>({
    age: 45,
    bloodPressure: 120,
    cholesterol: 200,
    glucose: 95,
    heartRate: 72,
    bmi: 24.5,
    smoking: 'no',
    exercise: 'regular'
  });
  const [predictionResult, setPredictionResult] = useState<{
    prediction: 0 | 1;
    status: string;
    confidence: number;
    explanation: string;
  } | null>(null);
  
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      simulateExtraction();
    }
  };

  const simulateExtraction = () => {
    setCurrentStep('extract');
    onMascotStateChange('blink');
    onMascotMessage("Let me analyze your health report... 📑 This might take a moment!");

    // Simulate extraction progress
    const interval = setInterval(() => {
      setExtractionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentStep('edit');
          onMascotStateChange('wave');
          onMascotMessage("Here's what I found in your report 📑 — tweak values then click Run Analysis.");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleRunAnalysis = () => {
    setCurrentStep('result');
    setAnalysisProgress(0);
    
    // Simulate analysis
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate good health result
          const result = {
            prediction: 0 as const,
            status: "No Disease Detected",
            confidence: 94,
            explanation: "Based on your health metrics, all indicators show excellent cardiovascular health. Your BMI, blood pressure, and cholesterol levels are all within optimal ranges."
          };
          setPredictionResult(result);
          onMascotStateChange('dance');
          onMascotMessage("Woohoo 🎉 — everything looks good! Keep up the good work.");
          return 100;
        }
        return prev + 12;
      });
    }, 150);
  };

  const resetPrediction = () => {
    setCurrentStep('upload');
    setUploadedFile(null);
    setExtractionProgress(0);
    setAnalysisProgress(0);
    setPredictionResult(null);
    onMascotStateChange('wave');
    onMascotMessage("Ready for another analysis! Upload your health report when you're ready. 📄");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-primary" />
          AI Health Analysis
        </h1>
        <p className="text-muted-foreground">
          Upload your medical reports for AI-powered disease prediction
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-4">
        {[
          { step: 'upload', label: 'Upload', icon: Upload },
          { step: 'extract', label: 'Extract', icon: FileText },
          { step: 'edit', label: 'Review', icon: Edit3 },
          { step: 'result', label: 'Analyze', icon: Brain },
        ].map((item, index) => {
          const Icon = item.icon;
          const isActive = currentStep === item.step;
          const isCompleted = ['upload', 'extract', 'edit'].includes(item.step) && 
            ['edit', 'result'].includes(currentStep);
          
          return (
            <div key={item.step} className="flex items-center">
              <div className={`flex flex-col items-center ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  isActive ? 'bg-primary-gradient text-white' : 
                  isCompleted ? 'bg-success-gradient text-white' : 
                  'bg-muted'
                }`}>
                  {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {index < 3 && (
                <div className={`w-16 h-1 mx-4 rounded ${
                  isCompleted ? 'bg-success' : 'bg-muted'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="glass-card border-0 shadow-lg max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle>Upload Health Report</CardTitle>
                <CardDescription>
                  Upload PDF, JPG, or PNG files containing your medical test results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Drop your files here</p>
                  <p className="text-muted-foreground mb-4">or click to browse</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                </div>
                {uploadedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 'extract' && (
          <motion.div
            key="extract"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="glass-card border-0 shadow-lg max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle>Extracting Data</CardTitle>
                <CardDescription>
                  AI is analyzing your document and extracting health metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Brain className="w-8 h-8 text-white" />
                  </motion.div>
                  <p className="text-lg font-medium mb-2">Processing your report...</p>
                  <Progress value={extractionProgress} className="max-w-md mx-auto" />
                  <p className="text-sm text-muted-foreground mt-2">{extractionProgress}% complete</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 'edit' && (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="glass-card border-0 shadow-lg max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Review Extracted Data</CardTitle>
                <CardDescription>
                  Verify and adjust the extracted values before running the analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Numeric Fields */}
                  <div className="space-y-4">
                    <div>
                      <Label>Age (years)</Label>
                      <div className="mt-2">
                        <Slider
                          value={[extractedData.age]}
                          onValueChange={([value]) => setExtractedData(prev => ({ ...prev, age: value }))}
                          max={100}
                          min={18}
                          step={1}
                          className="mb-2"
                        />
                        <Input
                          type="number"
                          value={extractedData.age}
                          onChange={(e) => setExtractedData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                          className="glass-card border-0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Blood Pressure (systolic)</Label>
                      <div className="mt-2">
                        <Slider
                          value={[extractedData.bloodPressure]}
                          onValueChange={([value]) => setExtractedData(prev => ({ ...prev, bloodPressure: value }))}
                          max={200}
                          min={80}
                          step={1}
                          className="mb-2"
                        />
                        <Input
                          type="number"
                          value={extractedData.bloodPressure}
                          onChange={(e) => setExtractedData(prev => ({ ...prev, bloodPressure: parseInt(e.target.value) || 0 }))}
                          className="glass-card border-0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Cholesterol (mg/dL)</Label>
                      <div className="mt-2">
                        <Slider
                          value={[extractedData.cholesterol]}
                          onValueChange={([value]) => setExtractedData(prev => ({ ...prev, cholesterol: value }))}
                          max={400}
                          min={100}
                          step={1}
                          className="mb-2"
                        />
                        <Input
                          type="number"
                          value={extractedData.cholesterol}
                          onChange={(e) => setExtractedData(prev => ({ ...prev, cholesterol: parseInt(e.target.value) || 0 }))}
                          className="glass-card border-0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Glucose (mg/dL)</Label>
                      <div className="mt-2">
                        <Slider
                          value={[extractedData.glucose]}
                          onValueChange={([value]) => setExtractedData(prev => ({ ...prev, glucose: value }))}
                          max={200}
                          min={70}
                          step={1}
                          className="mb-2"
                        />
                        <Input
                          type="number"
                          value={extractedData.glucose}
                          onChange={(e) => setExtractedData(prev => ({ ...prev, glucose: parseInt(e.target.value) || 0 }))}
                          className="glass-card border-0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Heart Rate (bpm)</Label>
                      <div className="mt-2">
                        <Slider
                          value={[extractedData.heartRate]}
                          onValueChange={([value]) => setExtractedData(prev => ({ ...prev, heartRate: value }))}
                          max={120}
                          min={50}
                          step={1}
                          className="mb-2"
                        />
                        <Input
                          type="number"
                          value={extractedData.heartRate}
                          onChange={(e) => setExtractedData(prev => ({ ...prev, heartRate: parseInt(e.target.value) || 0 }))}
                          className="glass-card border-0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>BMI</Label>
                      <div className="mt-2">
                        <Slider
                          value={[extractedData.bmi]}
                          onValueChange={([value]) => setExtractedData(prev => ({ ...prev, bmi: value }))}
                          max={40}
                          min={15}
                          step={0.1}
                          className="mb-2"
                        />
                        <Input
                          type="number"
                          value={extractedData.bmi}
                          onChange={(e) => setExtractedData(prev => ({ ...prev, bmi: parseFloat(e.target.value) || 0 }))}
                          className="glass-card border-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categorical Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                  <div>
                    <Label className="text-base font-medium">Smoking History</Label>
                    <RadioGroup
                      value={extractedData.smoking}
                      onValueChange={(value: 'yes' | 'no') => setExtractedData(prev => ({ ...prev, smoking: value }))}
                      className="mt-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no-smoking" />
                        <Label htmlFor="no-smoking">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes-smoking" />
                        <Label htmlFor="yes-smoking">Yes</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Exercise Frequency</Label>
                    <RadioGroup
                      value={extractedData.exercise}
                      onValueChange={(value: 'regular' | 'occasional' | 'rare') => 
                        setExtractedData(prev => ({ ...prev, exercise: value }))
                      }
                      className="mt-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="regular" id="regular-exercise" />
                        <Label htmlFor="regular-exercise">Regular (3+ times/week)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="occasional" id="occasional-exercise" />
                        <Label htmlFor="occasional-exercise">Occasional (1-2 times/week)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rare" id="rare-exercise" />
                        <Label htmlFor="rare-exercise">Rare (less than weekly)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <Button
                    onClick={handleRunAnalysis}
                    size="lg"
                    className="min-w-48"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Run Analysis
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click to get your AI-powered health prediction
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentStep === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {analysisProgress < 100 ? (
              <Card className="glass-card border-0 shadow-lg max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle>Analyzing Your Health Data</CardTitle>
                  <CardDescription>
                    AI is processing your metrics and generating predictions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 bg-primary-gradient rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Brain className="w-8 h-8 text-white" />
                    </motion.div>
                    <p className="text-lg font-medium mb-2">Running AI analysis...</p>
                    <Progress value={analysisProgress} className="max-w-md mx-auto" />
                    <p className="text-sm text-muted-foreground mt-2">{analysisProgress}% complete</p>
                  </div>
                </CardContent>
              </Card>
            ) : predictionResult && (
              <div className="space-y-6 max-w-4xl mx-auto">
                {/* Result Card */}
                <Card className={`glass-card border-0 shadow-xl ${
                  predictionResult.prediction === 0 ? 'ring-2 ring-success/30' : 'ring-2 ring-alert/30'
                }`}>
                  <CardHeader className="text-center">
                    <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      predictionResult.prediction === 0 ? 'bg-success-gradient' : 'bg-alert-gradient'
                    }`}>
                      {predictionResult.prediction === 0 ? (
                        <CheckCircle className="w-10 h-10 text-white" />
                      ) : (
                        <AlertTriangle className="w-10 h-10 text-white" />
                      )}
                    </div>
                    <CardTitle className="text-2xl">{predictionResult.status}</CardTitle>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Badge variant="outline" className="text-lg px-4 py-1">
                        {predictionResult.confidence}% Confidence
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground leading-relaxed">
                      {predictionResult.explanation}
                    </p>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="secondary">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button onClick={resetPrediction}>
                    <Upload className="w-4 h-4 mr-2" />
                    New Analysis
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};