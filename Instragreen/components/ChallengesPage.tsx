import { useState } from 'react';
import { Trophy, Clock, Star, Target, CheckCircle, Calendar, Flame, Gift, HelpCircle, Camera, Award, X } from 'lucide-react';

interface ChallengesPageProps {
  userPoints: number;
  setUserPoints: (points: number) => void;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  timeLimit: string;
  completed: boolean;
  progress?: number;
  maxProgress?: number;
}

export function ChallengesPage({ userPoints, setUserPoints }: ChallengesPageProps) {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'special'>('daily');
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [completedChallenge, setCompletedChallenge] = useState<Challenge | null>(null);

  const mockChallenges: Record<string, Challenge[]> = {
    daily: [
      {
        id: '1',
        title: 'Separação Seletiva',
        description: 'Separe corretamente o lixo doméstico hoje',
        points: 50,
        difficulty: 'easy',
        category: 'Reciclagem',
        timeLimit: '24h',
        completed: false,
        progress: 0,
        maxProgress: 1
      },
      {
        id: '2',
        title: 'Economia de Água',
        description: 'Tome um banho de no máximo 5 minutos',
        points: 30,
        difficulty: 'easy',
        category: 'Água',
        timeLimit: '24h',
        completed: true,
        progress: 1,
        maxProgress: 1
      },
      {
        id: '3',
        title: 'Transporte Sustentável',
        description: 'Use bicicleta, caminhada ou transporte público',
        points: 80,
        difficulty: 'medium',
        category: 'Mobilidade',
        timeLimit: '24h',
        completed: false,
        progress: 0,
        maxProgress: 1
      }
    ],
    weekly: [
      {
        id: '4',
        title: 'Horta Caseira',
        description: 'Plante 3 tipos diferentes de plantas esta semana',
        points: 200,
        difficulty: 'medium',
        category: 'Jardinagem',
        timeLimit: '7 dias',
        completed: false,
        progress: 1,
        maxProgress: 3
      },
      {
        id: '5',
        title: 'Zero Plástico',
        description: 'Complete 5 dias sem usar produtos plásticos descartáveis',
        points: 350,
        difficulty: 'hard',
        category: 'Sustentabilidade',
        timeLimit: '7 dias',
        completed: false,
        progress: 2,
        maxProgress: 5
      },
      {
        id: '6',
        title: 'Energia Renovável',
        description: 'Reduza o consumo de energia em 20% esta semana',
        points: 250,
        difficulty: 'medium',
        category: 'Energia',
        timeLimit: '7 dias',
        completed: false,
        progress: 3,
        maxProgress: 7
      }
    ],
    special: [
      {
        id: '7',
        title: 'Eco Influencer',
        description: 'Inspire 10 pessoas a adotarem práticas sustentáveis',
        points: 500,
        difficulty: 'hard',
        category: 'Comunidade',
        timeLimit: '30 dias',
        completed: false,
        progress: 3,
        maxProgress: 10
      },
      {
        id: '8',
        title: 'Guardião Verde',
        description: 'Complete 50 ações sustentáveis em qualquer categoria',
        points: 1000,
        difficulty: 'hard',
        category: 'Geral',
        timeLimit: '30 dias',
        completed: false,
        progress: 23,
        maxProgress: 50
      }
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Normal';
    }
  };

  const completeChallenge = (challenge: Challenge) => {
    setUserPoints(userPoints + challenge.points);
    setCompletedChallenge(challenge);
    // Em uma implementação real, aqui atualizaríamos o estado do desafio
  };

  const renderChallengeCard = (challenge: Challenge) => (
    <div key={challenge.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-gray-900">{challenge.title}</h3>
            {challenge.completed && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
          <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
          
          <div className="flex items-center gap-3 text-xs">
            <span className={`px-2 py-1 rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
              {getDifficultyText(challenge.difficulty)}
            </span>
            <span className="text-gray-500">{challenge.category}</span>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3 h-3" />
              {challenge.timeLimit}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1 text-green-600 font-bold mb-2">
            <Star className="w-4 h-4" />
            {challenge.points}
          </div>
        </div>
      </div>

      {/* Progresso */}
      {challenge.maxProgress && challenge.maxProgress > 1 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progresso</span>
            <span>{challenge.progress}/{challenge.maxProgress}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((challenge.progress || 0) / challenge.maxProgress) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Botão de ação */}
      {!challenge.completed ? (
        <button
          onClick={() => completeChallenge(challenge)}
          className="w-full py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 active:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4" />
          Registrar Conclusão
        </button>
      ) : (
        <div className="w-full py-3 bg-gray-100 text-gray-500 rounded-xl font-medium text-center">
          ✅ Concluído
        </div>
      )}
    </div>
  );

  return (
    <div className="py-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1">Desafios</h2>
          <p className="text-gray-600 text-sm">Complete desafios e ganhe mais pontos</p>
        </div>
        <button
          onClick={() => setShowHowItWorks(true)}
          className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4 text-center border border-gray-100">
          <div className="flex justify-center mb-2">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div className="font-bold text-gray-900">7</div>
          <div className="text-xs text-gray-600">Sequência</div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 text-center border border-gray-100">
          <div className="flex justify-center mb-2">
            <Target className="w-6 h-6 text-blue-500" />
          </div>
          <div className="font-bold text-gray-900">23</div>
          <div className="text-xs text-gray-600">Concluídos</div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 text-center border border-gray-100">
          <div className="flex justify-center mb-2">
            <Gift className="w-6 h-6 text-purple-500" />
          </div>
          <div className="font-bold text-gray-900">5</div>
          <div className="text-xs text-gray-600">Recompensas</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { id: 'daily', label: 'Diários', icon: Calendar },
          { id: 'weekly', label: 'Semanais', icon: Clock },
          { id: 'special', label: 'Especiais', icon: Trophy }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 rounded-xl transition-colors font-medium flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Lista de Desafios */}
      <div className="space-y-4">
        {mockChallenges[activeTab].map(renderChallengeCard)}
      </div>

      {/* Modal: Como Funciona */}
      {showHowItWorks && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-in fade-in" onClick={() => setShowHowItWorks(false)}>
          <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-8 animate-in slide-in-from-bottom" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Como Funcionam os Desafios</h3>
              <button onClick={() => setShowHowItWorks(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-medium mb-1">Escolha um Desafio</h4>
                  <p className="text-sm text-gray-600">Selecione um desafio diário, semanal ou especial que você queira completar.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-medium mb-1">Complete a Ação</h4>
                  <p className="text-sm text-gray-600">Realize a ação sustentável proposta no desafio (ex: separar lixo, economizar água).</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-medium mb-1">Registre no App</h4>
                  <p className="text-sm text-gray-600">Clique em "Registrar Conclusão" e, se desejar, adicione uma foto como comprovação.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div>
                  <h4 className="font-medium mb-1">Ganhe Pontos e Impacto</h4>
                  <p className="text-sm text-gray-600">Receba pontos para usar no seu jardim e veja o impacto ambiental real da sua ação!</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
                <div className="flex gap-2 items-start">
                  <Award className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900 mb-1">Dica:</p>
                    <p className="text-sm text-green-800">Mantenha sua sequência diária ativa para ganhar multiplicadores de pontos e badges exclusivas!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Desafio Completado */}
      {completedChallenge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in p-4" onClick={() => setCompletedChallenge(null)}>
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 animate-in zoom-in" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Parabéns! 🎉</h3>
              <p className="text-gray-600 mb-4">Você completou o desafio</p>
              
              <div className="bg-green-50 rounded-2xl p-4 mb-4">
                <p className="font-bold text-green-900 mb-1">{completedChallenge.title}</p>
                <div className="flex items-center justify-center gap-1 text-green-600">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold text-xl">+{completedChallenge.points} pontos</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-3">
                  <h4 className="font-medium mb-2">O que acontece agora?</h4>
                  <div className="space-y-2 text-sm text-gray-600 text-left">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                      <p>Seus pontos foram adicionados ao saldo</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                      <p>Use no Jardim para comprar plantas e decorações</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                      <p>Seu impacto ambiental foi registrado no dashboard</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                      <p>Continue completando desafios para ganhar badges!</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCompletedChallenge(null)}
                className="w-full py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}