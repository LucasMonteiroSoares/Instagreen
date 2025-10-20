import { Home, TreePine, User, Plus, Target } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const navItems = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'challenges', icon: Target, label: 'Desafios' },
    { id: 'create', icon: Plus, label: 'Postar' },
    { id: 'garden', icon: TreePine, label: 'Jardim' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex justify-around items-center py-2 pb-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          const isCreate = item.id === 'create';
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center gap-1 py-3 px-4 rounded-xl transition-all ${
                isCreate
                  ? 'bg-green-500 text-white shadow-lg scale-110'
                  : isActive
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-400'
              }`}
            >
              <Icon className={`w-6 h-6 ${isCreate ? 'text-white' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}