import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Petition } from './types';
import { PetitionCard } from './components/PetitionCard';
import { PetitionModal } from './components/PetitionModal';
import { CreatePetitionModal } from './components/CreatePetitionModal';

function App() {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [selectedPetition, setSelectedPetition] = useState<Petition | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreatePetition = (title: string, description: string) => {
    const newPetition: Petition = {
      id: crypto.randomUUID(),
      title,
      description,
      signatures: [],
      createdAt: new Date(),
    };
    setPetitions([newPetition, ...petitions]);
  };

  const handleSignPetition = (name: string) => {
    if (!selectedPetition) return;

    const signature = {
      id: crypto.randomUUID(),
      name,
      timestamp: new Date(),
    };

    setPetitions(petitions.map(petition =>
      petition.id === selectedPetition.id
        ? {
            ...petition,
            signatures: [...petition.signatures, signature],
          }
        : petition
    ));

    setSelectedPetition(prev =>
      prev ? { ...prev, signatures: [...prev.signatures, signature] } : null
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Online Petitions</h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Start Petition</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {petitions.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No petitions yet</h2>
            <p className="text-gray-600">Be the first to start a petition!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {petitions.map(petition => (
              <PetitionCard
                key={petition.id}
                petition={petition}
                onClick={() => setSelectedPetition(petition)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedPetition && (
        <PetitionModal
          petition={selectedPetition}
          onClose={() => setSelectedPetition(null)}
          onSign={handleSignPetition}
        />
      )}

      {showCreateModal && (
        <CreatePetitionModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePetition}
        />
      )}
    </div>
  );
}

export default App;