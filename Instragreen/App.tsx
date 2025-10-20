import { useState } from 'react';
import { MainFeed } from './components/MainFeed';
import { VirtualGarden } from './components/VirtualGarden';
import { ProfilePage } from './components/ProfilePage';
import { CreatePost } from './components/CreatePost';
import { ChallengesPage } from './components/ChallengesPage';
import { AuthScreen } from './components/AuthScreen';
import { Navigation } from './components/Navigation';
import { TopBar } from './components/TopBar';

type Page = 'feed' | 'garden' | 'profile' | 'create' | 'challenges';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('feed');
  const [userPoints, setUserPoints] = useState(1250);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  const handleLogin = (loginData: { name: string; email: string }) => {
    setUserData(loginData);
    setIsAuthenticated(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'feed':
        return <MainFeed />;
      case 'challenges':
        return <ChallengesPage userPoints={userPoints} setUserPoints={setUserPoints} />;
      case 'garden':
        return <VirtualGarden userPoints={userPoints} setUserPoints={setUserPoints} />;
      case 'profile':
        return <ProfilePage userPoints={userPoints} />;
      case 'create':
        return <CreatePost onBack={() => setCurrentPage('feed')} />;
      default:
        return <MainFeed />;
    }
  };

  // Tela de autenticação
  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <TopBar userPoints={userPoints} />
      
      <div className="flex-1 overflow-y-auto pb-16">
        <div className="px-4">
          {renderPage()}
        </div>
      </div>

      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
    </div>
  );
}

export default App;