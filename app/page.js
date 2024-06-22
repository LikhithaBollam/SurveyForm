import SurveyForm from './components/SurveyForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Survey Form</h1>
        <SurveyForm />
      </div>
    </div>
  );
}
