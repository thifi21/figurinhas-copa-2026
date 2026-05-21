import { useState } from 'react';
import { Trophy, User, Lock, Eye, EyeOff, LogIn, FileText } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (username: string, password: string) => boolean;
  onRegister: (username: string, password: string) => void;
}

export function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'welcome' | 'form'>('welcome');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Digite seu nome');
      return;
    }
    if (password.length < 4) {
      setError('A senha deve ter ao menos 4 caracteres');
      return;
    }

    if (isRegistering) {
      onRegister(username.trim(), password);
    } else {
      const success = onLogin(username.trim(), password);
      if (!success) {
        setError('Usuário ou senha incorretos');
      }
    }
  };

  if (step === 'welcome') {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden relative bg-panini-navy">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-panini-gold/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-panini-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-panini-burgundy/10 rounded-full blur-3xl" />
        </div>

        {/* Decorative line pattern */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>

        <div className="relative z-10 flex flex-col items-center px-6 max-w-sm w-full">
          {/* Trophy icon */}
          <div className="mb-6 relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-panini-gold to-yellow-700 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.3)] border-2 border-yellow-300/40">
              <Trophy size={36} className="text-panini-navy" />
            </div>
            <div className="absolute -inset-2 rounded-full border border-panini-gold/20 animate-ping" style={{ animationDuration: '3s' }} />
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-black text-center leading-tight mb-2">
            <span className="bg-gradient-to-r from-panini-gold via-yellow-300 to-panini-gold bg-clip-text text-transparent">
              COPA 2026
            </span>
          </h1>
          <p className="text-panini-lightgold/60 text-sm font-bold uppercase tracking-[0.25em] mb-8">
            Álbum de Figurinhas
          </p>

          {/* Stylized host nations */}
          <div className="flex items-center gap-6 mb-10 text-white/30 text-xs font-bold uppercase tracking-widest">
            <span>USA</span>
            <span className="w-1 h-1 rounded-full bg-panini-gold/40" />
            <span>CAN</span>
            <span className="w-1 h-1 rounded-full bg-panini-gold/40" />
            <span>MEX</span>
          </div>

          {/* Enter button */}
          <button
            onClick={() => setStep('form')}
            className="group relative w-full py-4 px-6 rounded-2xl font-black text-base uppercase tracking-widest text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-panini-blue via-panini-blue to-panini-burgundy" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              <LogIn size={18} />
              ENTRAR NO ÁLBUM
            </span>
          </button>

          {/* Footer */}
          <p className="mt-8 text-white/20 text-[10px] font-bold uppercase tracking-widest text-center leading-relaxed">
            FIFA World Cup 2026 &bull; Panini
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden relative bg-panini-navy">
      {/* Same background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-panini-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-panini-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-panini-burgundy/10 rounded-full blur-3xl" />
      </div>
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid2)" />
      </svg>

      <div className="relative z-10 flex flex-col items-center px-6 max-w-sm w-full">
        {/* Mini logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-panini-gold to-yellow-600 flex items-center justify-center shadow-lg border border-yellow-300/30">
            <span className="text-panini-navy font-black text-sm">26</span>
          </div>
          <span className="text-sm font-black text-panini-lightgold uppercase tracking-widest">Copa 2026</span>
        </div>

        {/* Form card */}
        <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-panini-gold/20 flex items-center justify-center">
              <FileText size={18} className="text-panini-gold" />
            </div>
            <div>
              <h2 className="text-white font-black text-lg uppercase tracking-tight">
                {isRegistering ? 'Criar Conta' : 'Entrar'}
              </h2>
              <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider">
                {isRegistering ? 'Novo colecionador' : 'Bem-vindo de volta'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">
                Nome
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-9 pr-3 text-white text-sm font-bold placeholder:text-white/20 focus:outline-none focus:border-panini-gold/50 focus:bg-white/15 transition-all"
                  maxLength={30}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Mínimo 4 caracteres"
                  className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-9 pr-10 text-white text-sm font-bold placeholder:text-white/20 focus:outline-none focus:border-panini-gold/50 focus:bg-white/15 transition-all"
                  maxLength={20}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                <p className="text-red-300 text-xs font-bold text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-widest text-white bg-gradient-to-r from-panini-gold to-yellow-600 hover:brightness-110 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
            >
              {isRegistering ? 'Criar Conta' : 'Entrar'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
              className="text-white/40 hover:text-panini-lightgold text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {isRegistering ? 'Já tem conta? Entrar' : 'Novo? Criar conta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
