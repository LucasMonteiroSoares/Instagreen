import { useState } from 'react';
import { TreePine, Flower, Sprout, Star, Coins, Droplets, Zap, Leaf, Trash2, TrendingUp, Award, Info } from 'lucide-react';

interface GardenItem {
  id: string;
  name: string;
  icon: any;
  cost: number;
  category: 'trees' | 'flowers' | 'decorations';
  owned: boolean;
  relatedAction: string;
  impact: string;
}

interface PlacedItem {
  id: string;
  itemId: string;
  x: number;
  y: number;
  name: string;
  icon: any;
}

interface VirtualGardenProps {
  userPoints: number;
  setUserPoints: (points: number) => void;
}

const gardenItems: GardenItem[] = [
  { id: '1', name: 'Árvore de Carvalho', icon: TreePine, cost: 100, category: 'trees', owned: true, relatedAction: 'Reciclagem', impact: '5kg CO₂ economizados' },
  { id: '2', name: 'Roseira', icon: Flower, cost: 50, category: 'flowers', owned: true, relatedAction: 'Economia de água', impact: '200L água economizada' },
  { id: '3', name: 'Mudas de Manjericão', icon: Sprout, cost: 30, category: 'flowers', owned: false, relatedAction: 'Compostagem', impact: '2kg resíduos compostados' },
  { id: '4', name: 'Pinheiro', icon: TreePine, cost: 150, category: 'trees', owned: false, relatedAction: 'Transporte sustentável', impact: '10km sem carro' },
  { id: '5', name: 'Girassol', icon: Flower, cost: 40, category: 'flowers', owned: false, relatedAction: 'Energia limpa', impact: '5kWh economizados' },
  { id: '6', name: 'Fonte Decorativa', icon: Star, cost: 200, category: 'decorations', owned: false, relatedAction: 'Consumo consciente', impact: '3kg plástico evitado' },
];

export function VirtualGarden({ userPoints, setUserPoints }: VirtualGardenProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'garden' | 'shop'>('dashboard');
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([
    { id: '1', itemId: '1', x: 30, y: 40, name: 'Árvore de Carvalho', icon: TreePine },
    { id: '2', itemId: '2', x: 60, y: 70, name: 'Roseira', icon: Flower },
  ]);
  const [items, setItems] = useState(gardenItems);
  const [selectedItem, setSelectedItem] = useState<GardenItem | null>(null);

  const buyItem = (item: GardenItem) => {
    if (userPoints >= item.cost) {
      setUserPoints(userPoints - item.cost);
      setItems(prev => prev.map(i => i.id === item.id ? { ...i, owned: true } : i));
    }
  };

  const addToGarden = (item: GardenItem) => {
    const newItem: PlacedItem = {
      id: Date.now().toString(),
      itemId: item.id,
      x: Math.random() * 60 + 20,
      y: Math.random() * 50 + 30,
      name: item.name,
      icon: item.icon
    };
    setPlacedItems(prev => [...prev, newItem]);
  };

  const removeFromGarden = (itemId: string) => {
    setPlacedItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <div className="py-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">Meu Impacto</h2>
        <p className="text-gray-600 text-sm">Visualize seu impacto ambiental real</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-3 rounded-xl transition-colors font-medium ${
            activeTab === 'dashboard' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('garden')}
          className={`flex-1 py-3 rounded-xl transition-colors font-medium ${
            activeTab === 'garden' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Jardim
        </button>
        <button
          onClick={() => setActiveTab('shop')}
          className={`flex-1 py-3 rounded-xl transition-colors font-medium ${
            activeTab === 'shop' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Loja
        </button>
      </div>

      {activeTab === 'dashboard' ? (
        <div>
          {/* Estatísticas de Impacto */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white mb-4">
            <h3 className="font-bold text-lg mb-1">Seu Impacto Ambiental</h3>
            <p className="text-white/80 text-sm mb-4">Dados acumulados das suas ações</p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5" />
                  <span className="text-sm">CO₂ Economizado</span>
                </div>
                <div className="font-bold text-2xl">48.5 kg</div>
                <div className="text-xs text-white/80 mt-1">≈ 2 árvores plantadas</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5" />
                  <span className="text-sm">Água Economizada</span>
                </div>
                <div className="font-bold text-2xl">850 L</div>
                <div className="text-xs text-white/80 mt-1">≈ 10 banhos completos</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm">Energia Poupada</span>
                </div>
                <div className="font-bold text-2xl">32 kWh</div>
                <div className="text-xs text-white/80 mt-1">≈ 4 dias de consumo</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Trash2 className="w-5 h-5" />
                  <span className="text-sm">Resíduos Reciclados</span>
                </div>
                <div className="font-bold text-2xl">15.2 kg</div>
                <div className="text-xs text-white/80 mt-1">≈ 3 sacolas cheias</div>
              </div>
            </div>
          </div>

          {/* Progresso Mensal */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Progresso Mensal</h3>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+23%</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Meta de CO₂</span>
                  <span className="font-medium">48.5 / 50 kg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '97%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Meta de Água</span>
                  <span className="font-medium">850 / 1000 L</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Meta de Reciclagem</span>
                  <span className="font-medium">15.2 / 20 kg</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Minhas Plantas e Ações */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-bold">Minhas Conquistas</h3>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mb-4">Cada planta do seu jardim representa ações sustentáveis reais que você realizou!</p>
            
            <div className="space-y-3">
              {items.filter(item => item.owned).map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-600 mt-0.5">Ação: {item.relatedAction}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Leaf className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-700 font-medium">{item.impact}</span>
                        </div>
                      </div>
                      <Award className="w-5 h-5 text-yellow-500" />
                    </div>
                  </div>
                );
              })}
            </div>

            {items.filter(item => item.owned).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <TreePine className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Complete desafios para começar a acumular impacto!</p>
              </div>
            )}
          </div>
        </div>
      ) : activeTab === 'garden' ? (
        <div>
          {/* Área do Jardim */}
          <div className="relative bg-gradient-to-b from-sky-200 to-green-300 rounded-2xl h-80 mb-4 overflow-hidden">
            {/* Chão do jardim */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-600 to-green-400"></div>
            
            {/* Itens colocados */}
            {placedItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="absolute cursor-pointer group"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  onClick={() => removeFromGarden(item.id)}
                >
                  <div className="relative">
                    <Icon className="w-8 h-8 text-green-700 group-hover:scale-110 transition-transform" />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.name} - Clique para remover
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Mensagem se jardim vazio */}
            {placedItems.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/80">
                  <TreePine className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Seu jardim está vazio</p>
                  <p className="text-sm">Compre itens na loja para começar a plantar!</p>
                </div>
              </div>
            )}
          </div>

          {/* Inventário */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="font-medium mb-3">Inventário</h3>
            <div className="grid grid-cols-4 gap-3">
              {items.filter(item => item.owned).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => addToGarden(item)}
                    className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex flex-col items-center gap-1"
                  >
                    <Icon className="w-6 h-6 text-green-600" />
                    <span className="text-xs text-center">{item.name}</span>
                  </button>
                );
              })}
            </div>
            {items.filter(item => item.owned).length === 0 && (
              <p className="text-gray-500 text-center py-4">Nenhum item no inventário</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Loja do Jardim */}
          <div className="grid gap-4">
            {['trees', 'flowers', 'decorations'].map((category) => (
              <div key={category} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h3 className="font-medium mb-3 capitalize">
                  {category === 'trees' ? 'Árvores' : 
                   category === 'flowers' ? 'Flores' : 'Decorações'}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {items.filter(item => item.category === category).map((item) => {
                    const Icon = item.icon;
                    const canBuy = userPoints >= item.cost && !item.owned;
                    
                    return (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                          <Icon className="w-8 h-8 text-green-600" />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                              <Coins className="w-4 h-4" />
                              <span>{item.cost} pontos</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              <span className="font-medium text-green-600">{item.relatedAction}</span> • {item.impact}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            <Info className="w-4 h-4 text-gray-400" />
                          </button>
                          
                          {item.owned ? (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                              Adquirido
                            </span>
                          ) : (
                            <button
                              onClick={() => buyItem(item)}
                              disabled={!canBuy}
                              className={`px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                                canBuy
                                  ? 'bg-green-500 text-white hover:bg-green-600'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {canBuy ? 'Comprar' : 'Insuficiente'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
              <div className="flex gap-2 items-start">
                <Leaf className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 mb-1">Como funciona?</p>
                  <p className="text-sm text-green-800">Cada planta representa uma ação sustentável. Quanto mais você compra e coloca no jardim, maior é o impacto ambiental visualizado no Dashboard!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Detalhes do Item */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 animate-in zoom-in" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <selectedItem.icon className="w-10 h-10 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{selectedItem.name}</h3>
              
              <div className="bg-green-50 rounded-2xl p-4 mb-4 text-left">
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Representa a ação:</p>
                    <p className="font-medium text-green-900">{selectedItem.relatedAction}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Impacto ambiental:</p>
                    <p className="font-medium text-green-900">{selectedItem.impact}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Custo:</p>
                    <div className="flex items-center gap-1">
                      <Coins className="w-4 h-4 text-green-600" />
                      <p className="font-medium text-green-900">{selectedItem.cost} pontos</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-left">
                <p className="text-sm text-blue-900">
                  Ao adicionar esta planta ao seu jardim, você visualiza o impacto acumulado de todas as suas ações sustentáveis no Dashboard!
                </p>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-full py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}