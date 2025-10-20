import { Trophy, Award, Calendar, TrendingUp, Leaf, Target, Star, Download } from 'lucide-react';

interface ProfilePageProps {
  userPoints: number;
}

export function ProfilePage({ userPoints }: ProfilePageProps) {
  const achievements = [
    { id: 1, name: 'Primeiro Post', description: 'Fez sua primeira postagem sustentável', icon: '🌱', earned: true },
    { id: 2, name: 'Eco Warrior', description: 'Completou 10 ações sustentáveis', icon: '🛡️', earned: true },
    { id: 3, name: 'Coletor Expert', description: 'Fez 5 posts sobre coleta seletiva', icon: '♻️', earned: true },
    { id: 4, name: 'Jardineiro Virtual', description: 'Plantou 15 itens no jardim virtual', icon: '🌳', earned: false },
    { id: 5, name: 'Sustentável Avançado', description: 'Acumulou 2000 pontos', icon: '⭐', earned: false },
    { id: 6, name: 'Influenciador Verde', description: 'Recebeu 100 curtidas', icon: '💚', earned: true },
  ];

  const stats = [
    { label: 'Posts Criados', value: '24', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Ações Sustentáveis', value: '18', icon: Leaf, color: 'text-green-600' },
    { label: 'Curtidas Recebidas', value: '127', icon: Star, color: 'text-yellow-600' },
    { label: 'Ranking Mensal', value: '#3', icon: Trophy, color: 'text-purple-600' },
  ];

  const monthlyActivities = [
    { month: 'Jan', actions: 8, points: 420 },
    { month: 'Fev', actions: 12, points: 680 },
    { month: 'Mar', actions: 15, points: 850 },
    { month: 'Abr', actions: 18, points: 960 },
  ];

  const currentLevel = userPoints < 500 ? 'Iniciante Verde' : 
                      userPoints < 1000 ? 'Sustentável' : 
                      userPoints < 2000 ? 'Eco Warrior' : 'Eco Expert';

  const nextLevel = userPoints < 500 ? 'Sustentável' : 
                    userPoints < 1000 ? 'Eco Warrior' : 
                    userPoints < 2000 ? 'Eco Expert' : 'Eco Master';

  const pointsToNext = userPoints < 500 ? 500 - userPoints : 
                       userPoints < 1000 ? 1000 - userPoints : 
                       userPoints < 2000 ? 2000 - userPoints : 0;

  const progressPercent = userPoints < 500 ? (userPoints / 500) * 100 : 
                          userPoints < 1000 ? ((userPoints - 500) / 500) * 100 : 
                          userPoints < 2000 ? ((userPoints - 1000) / 1000) * 100 : 100;

  const certificateExpiry = '28 de Setembro de 2026';

  return (
    <div className="py-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">Perfil</h2>
        <p className="text-gray-600 text-sm">Seu progresso sustentável</p>
      </div>

      {/* Perfil Header */}
      <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">AS</span>
          </div>
          <div>
            <h3 className="text-xl">Ana Silva</h3>
            <p className="text-gray-600">{currentLevel}</p>
            <div className="flex items-center gap-1 text-green-600">
              <Trophy className="w-4 h-4" />
              <span>{userPoints.toLocaleString()} pontos</span>
            </div>
          </div>
        </div>

        {/* Progresso do Nível */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Próximo nível: {nextLevel}</span>
            <span>{pointsToNext > 0 ? `${pointsToNext} pontos restantes` : 'Nível máximo!'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <Icon className={`w-8 h-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificado Sustentável */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 mb-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">Certificado Sustentável 2025</h3>
              <p className="text-green-100">Reconhecimento de Práticas Sustentáveis</p>
            </div>
          </div>
          <button 
            onClick={() => {
              // Simular download do certificado
              const link = document.createElement('a');
              link.href = '#';
              link.download = 'certificado_sustentavel_2025_ana_silva.pdf';
              alert('Download do certificado iniciado!');
            }}
            className="bg-white/20 hover:bg-white/30 transition-colors rounded-lg p-3 flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span className="text-sm">Download</span>
          </button>
        </div>
        <div className="bg-white/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span>Status: Ativo</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Válido até {certificateExpiry}</span>
            </div>
          </div>
          <div className="text-sm text-green-100">
            Este certificado reconhece Ana Silva como uma praticante ativa de sustentabilidade ambiental, 
            demonstrando consistência em ações eco-friendly durante o período de 2025.
          </div>
        </div>
      </div>

      {/* Conquistas */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4">Conquistas</h3>
        <div className="grid grid-cols-1 gap-3">
          {achievements.map((achievement) => (
            <div key={achievement.id} className={`flex items-center gap-3 p-3 rounded-lg ${
              achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
            }`}>
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className={`font-medium ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                  {achievement.name}
                </h4>
                <p className={`text-sm ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                  {achievement.description}
                </p>
              </div>
              {achievement.earned && (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Atividade Mensal */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4">Atividade dos Últimos Meses</h3>
        <div className="space-y-3">
          {monthlyActivities.map((month, index) => (
            <div key={month.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-medium">{month.month}</span>
                </div>
                <div>
                  <p className="font-medium">{month.actions} ações</p>
                  <p className="text-sm text-gray-600">{month.points} pontos</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-green-600 text-sm">Meta atingida</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}