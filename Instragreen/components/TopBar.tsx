import { Leaf, Trophy, User } from 'lucide-react';

interface TopBarProps {
  userPoints: number;
}

export function TopBar({ userPoints }: TopBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Instagreen</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-full">
          <Trophy className="w-4 h-4 text-green-600" />
          <span className="text-green-700 font-medium">{userPoints.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}