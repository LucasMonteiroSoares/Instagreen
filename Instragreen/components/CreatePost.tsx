import { useState } from 'react';
import { ArrowLeft, Camera, MapPin, Tag, Trophy, Upload } from 'lucide-react';

interface CreatePostProps {
  onBack: () => void;
}

export function CreatePost({ onBack }: CreatePostProps) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [actionTitle, setActionTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const categories = [
    { id: 'reciclagem', name: 'Reciclagem', emoji: '♻️', points: 50 },
    { id: 'agua', name: 'Economia de Água', emoji: '💧', points: 60 },
    { id: 'plantio', name: 'Plantio', emoji: '🌱', points: 70 },
    { id: 'compostagem', name: 'Compostagem', emoji: '🌿', points: 40 },
    { id: 'energia', name: 'Economia de Energia', emoji: '💡', points: 55 },
    { id: 'transporte', name: 'Transporte Sustentável', emoji: '🚲', points: 65 },
    { id: 'conserto', name: 'Reparo/Reutilização', emoji: '🔧', points: 45 },
    { id: 'educacao', name: 'Educação Ambiental', emoji: '📚', points: 35 },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = () => {
    if (actionTitle && description && selectedCategory) {
      // Simular criação do post
      alert('Post criado com sucesso! Você ganhou pontos pela sua ação sustentável.');
      onBack();
    }
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold">Nova Ação</h2>
          <p className="text-gray-600 text-sm">Compartilhe sua ação sustentável</p>
        </div>
      </div>

      <div>
        {/* Formulário */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          
          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium mb-3">Categoria da Ação</label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-3 rounded-xl border transition-all ${
                    selectedCategory === category.id
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.emoji}</span>
                    <div className="text-left">
                      <p className="font-medium text-sm">{category.name}</p>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <Trophy className="w-3 h-3" />
                        <span>+{category.points} pts</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Título da Ação */}
          <div>
            <label className="block text-sm font-medium mb-2">Título da Ação</label>
            <input
              type="text"
              value={actionTitle}
              onChange={(e) => setActionTitle(e.target.value)}
              placeholder="Ex: Instalei sistema de captação de água da chuva"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva sua ação sustentável, como foi feita, resultados obtidos..."
              rows={4}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
            />
          </div>

          {/* Localização */}
          <div>
            <label className="block text-sm font-medium mb-2">Localização (opcional)</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Cidade, Estado"
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Upload de Imagem */}
          <div>
            <label className="block text-sm font-medium mb-2">Foto da Ação</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                {image ? (
                  <div className="space-y-2">
                    <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto flex items-center justify-center">
                      <Camera className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-green-600">Imagem selecionada: {image.name}</p>
                    <p className="text-xs text-gray-500">Clique para alterar</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-600">Clique para enviar uma foto</p>
                    <p className="text-xs text-gray-500">PNG, JPG até 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Preview dos Pontos */}
          {selectedCategoryData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-700">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">
                  Você ganhará {selectedCategoryData.points} pontos por esta ação!
                </span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Suas ações sustentáveis são importantes para o meio ambiente e para a comunidade.
              </p>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onBack}
              className="flex-1 py-4 px-4 border border-gray-300 rounded-xl text-gray-700 active:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!actionTitle || !description || !selectedCategory}
              className={`flex-1 py-4 px-4 rounded-xl transition-colors font-medium ${
                actionTitle && description && selectedCategory
                  ? 'bg-green-500 text-white active:bg-green-600'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Publicar Ação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}