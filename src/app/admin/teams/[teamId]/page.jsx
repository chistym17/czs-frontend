import { Suspense } from 'react';
import { use } from 'react';
import TeamDetailsClient from './TeamDetailsClient';

// This is now a server component
export default function TeamDetails({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <TeamDetailsClient teamId={unwrappedParams.teamId} />
    </Suspense>
  );
} 