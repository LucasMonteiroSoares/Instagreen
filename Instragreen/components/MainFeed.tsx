import { useState } from 'react';
import { Heart, MessageCircle, Share2, Trophy, Leaf } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: string;
  };
  action: string;
  description: string;
  image: string;
  points: number;
  likes: number;
  comments: number;
  timeAgo: string;
  category: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      name: 'Ana Silva',
      avatar: 'AS',
      level: 'Eco Warrior'
    },
    action: 'Coleta Seletiva Organizada',
    description: 'Organizei toda a coleta seletiva da minha casa e separei materiais recicláveis por categorias. Consegui 2kg de plástico, 1kg de papel e 500g de vidro!',
    image: 'https://images.unsplash.com/photo-1756362399416-503694e40cf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBzdXN0YWluYWJsZSUyMGVudmlyb25tZW50fGVufDF8fHx8MTc1OTA4NDkwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    points: 50,
    likes: 23,
    comments: 5,
    timeAgo: '2h',
    category: 'reciclagem'
  },
  {
    id: '2',
    user: {
      name: 'Carlos Verde',
      avatar: 'CV',
      level: 'Sustentável'
    },
    action: 'Sistema de Captação de Água da Chuva',
    description: 'Instalei um sistema caseiro para captar água da chuva! Já consegui coletar 50 litros na primeira chuva. Vou usar para regar as plantas.',
    image: 'https://images.unsplash.com/photo-1694536379307-33c6c6ef9b1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluJTIwd2F0ZXIlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc1OTA4NDkwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    points: 80,
    likes: 31,
    comments: 8,
    timeAgo: '4h',
    category: 'água'
  },
  {
    id: '3',
    user: {
      name: 'Maria Jardim',
      avatar: 'MJ',
      level: 'Eco Expert'
    },
    action: 'Nova Horta Caseira',
    description: 'Plantei ervas e temperos na varanda! Manjericão, salsinha, cebolinha e alecrim. Agora não preciso mais comprar no mercado.',
    image: 'https://images.unsplash.com/photo-1704048001164-9e454dd611e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBwbGFudHMlMjBmbG93ZXJzfGVufDF8fHx8MTc1OTA2Nzg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    points: 60,
    likes: 18,
    comments: 3,
    timeAgo: '6h',
    category: 'plantio'
  },
  {
    id: '4',
    user: {
      name: 'João Eco',
      avatar: 'JE',
      level: 'Iniciante Verde'
    },
    action: 'Composteira Doméstica',
    description: 'Criei minha primeira composteira! Estou colocando cascas de frutas, restos de vegetais e folhas secas. Em breve terei adubo natural.',
    image: 'https://images.unsplash.com/photo-1716903282677-3a1b5c936b41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wb3N0aW5nJTIwb3JnYW5pYyUyMHdhc3RlfGVufDF8fHx8MTc1OTA0ODQwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    points: 40,
    likes: 15,
    comments: 2,
    timeAgo: '1d',
    category: 'compostagem'
  }
];

export function MainFeed() {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      reciclagem: 'bg-blue-100 text-blue-700',
      água: 'bg-cyan-100 text-cyan-700',
      plantio: 'bg-green-100 text-green-700',
      compostagem: 'bg-amber-100 text-amber-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="py-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">Feed</h2>
        <p className="text-gray-600 text-sm">Últimas ações da comunidade</p>
      </div>

      <div className="space-y-4">
        {mockPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header do Post */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{post.user.avatar}</span>
                </div>
                <div>
                  <h3 className="font-medium">{post.user.name}</h3>
                  <p className="text-sm text-gray-500">{post.user.level} • {post.timeAgo}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-green-600">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm">+{post.points}</span>
                </div>
              </div>
            </div>

            {/* Conteúdo do Post */}
            <div className="px-4 pb-3">
              <h4 className="font-medium text-lg mb-2">{post.action}</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{post.description}</p>
            </div>

            {/* Imagem */}
            <div className="relative">
              <ImageWithFallback 
                src={post.image}
                alt={post.action}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                <Leaf className="w-4 h-4 text-green-600" />
              </div>
            </div>

            {/* Ações do Post */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1 transition-colors ${
                    likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                  <span className="text-sm">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                </button>

                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>

                <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="text-sm text-gray-500">
                {post.likes} curtidas
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}