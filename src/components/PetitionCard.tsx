import React from 'react';
import { ChevronRight, Users } from 'lucide-react';
import { Petition } from '../types';

interface PetitionCardProps {
  petition: Petition;
  onClick: () => void;
}

export function PetitionCard({ petition, onClick }: PetitionCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer border border-gray-100"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{petition.title}</h3>
          <p className="text-gray-600 line-clamp-2">{petition.description}</p>
        </div>
        <ChevronRight className="text-gray-400 w-5 h-5 mt-1" />
      </div>
      <div className="flex items-center mt-4 text-sm text-gray-500">
        <Users className="w-4 h-4 mr-1" />
        <span>{petition.signatures.length} signatures</span>
        <span className="mx-2">•</span>
        <span>{new Date(petition.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}