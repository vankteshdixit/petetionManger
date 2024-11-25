import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Petition } from '../types';

interface PetitionModalProps {
  petition: Petition;
  onClose: () => void;
  onSign: (name: string) => void;
}

export function PetitionModal({ petition, onClose, onSign }: PetitionModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSign(name.trim());
      setName('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">{petition.title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 whitespace-pre-wrap mb-8">{petition.description}</p>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Sign this petition</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Petition
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Signatures ({petition.signatures.length})
            </h3>
            <div className="space-y-2">
              {petition.signatures.map((signature) => (
                <div
                  key={signature.id}
                  className="flex justify-between items-center text-sm text-gray-600 py-2 border-b border-gray-100 last:border-0"
                >
                  <span>{signature.name}</span>
                  <span>{new Date(signature.timestamp).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}