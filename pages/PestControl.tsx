import React, { useState, useRef } from 'react';
import { Upload, Camera, X, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { AnalysisStatus, PestAnalysisResult } from '../types';

const PestControl: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<PestAnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Keep the full data URL for display, extract base64 for API
        setSelectedImage(base64String);
        setResult(null);
        setStatus(AnalysisStatus.IDLE);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setStatus(AnalysisStatus.ANALYZING);
    try {
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = selectedImage.split(',')[1];
      const analysisData = await GeminiService.analyzePlantHealth(base64Data);
      setResult(analysisData);
      setStatus(AnalysisStatus.COMPLETE);
    } catch (error) {
      console.error(error);
      setStatus(AnalysisStatus.ERROR);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setResult(null);
    setStatus(AnalysisStatus.IDLE);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">AI Pest & Disease Detector</h1>
        <p className="text-gray-600 mt-2">Upload a photo of your crop to instantly identify issues using Gemini Vision.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-4">
          <div className={`relative border-2 border-dashed rounded-2xl h-80 flex flex-col items-center justify-center transition-colors ${selectedImage ? 'border-agri-500 bg-gray-50' : 'border-gray-300 hover:border-agri-400 hover:bg-gray-50'}`}>
            
            {selectedImage ? (
              <>
                <img src={selectedImage} alt="Preview" className="h-full w-full object-contain rounded-2xl p-2" />
                <button 
                  onClick={clearImage}
                  className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white text-gray-700 shadow-sm"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-agri-100 text-agri-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera size={32} />
                </div>
                <p className="text-lg font-medium text-gray-700">Upload Plant Photo</p>
                <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG</p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-6 px-6 py-2 bg-agri-600 text-white rounded-lg hover:bg-agri-700 transition-colors"
                >
                  Select File
                </button>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>

          <button 
            onClick={analyzeImage}
            disabled={!selectedImage || status === AnalysisStatus.ANALYZING}
            className={`w-full py-3 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all ${
              !selectedImage 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : status === AnalysisStatus.ANALYZING 
                  ? 'bg-agri-400 text-white cursor-wait' 
                  : 'bg-agri-600 text-white hover:bg-agri-700 shadow-lg shadow-agri-200'
            }`}
          >
            {status === AnalysisStatus.ANALYZING ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Analyzing Plant...</span>
              </>
            ) : (
              <>
                <Upload size={20} />
                <span>Analyze Health</span>
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col h-80 overflow-y-auto">
          {status === AnalysisStatus.IDLE && (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center">
              <CheckCircle size={48} className="mb-4 opacity-20" />
              <p>Analysis results will appear here.</p>
            </div>
          )}

          {status === AnalysisStatus.ANALYZING && (
            <div className="flex-1 flex flex-col items-center justify-center text-agri-600 animate-pulse">
              <p>Consulting AI Agronomist...</p>
            </div>
          )}

          {status === AnalysisStatus.ERROR && (
            <div className="flex-1 flex flex-col items-center justify-center text-red-500 text-center">
              <AlertCircle size={48} className="mb-4" />
              <p>Could not analyze image. Please try a clearer photo.</p>
            </div>
          )}

          {status === AnalysisStatus.COMPLETE && result && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Diagnosis</p>
                <div className="flex justify-between items-start mt-1">
                   <h2 className="text-2xl font-bold text-gray-900">{result.diagnosis}</h2>
                   <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                     {result.confidence} Confidence
                   </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">Recommended Treatment</p>
                <ul className="space-y-2">
                  {result.treatment.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-2 bg-red-50 p-3 rounded-lg text-red-900 text-sm">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">Prevention</p>
                 <ul className="space-y-2">
                  {result.prevention.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-gray-700 text-sm">
                       <div className="w-1.5 h-1.5 bg-agri-400 rounded-full mt-1.5 shrink-0" />
                       <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PestControl;
