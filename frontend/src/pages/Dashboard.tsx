import { useEffect, useState } from 'react';
import { usuarioService, cursoService, categoriaService, matriculaService } from '../services/services';

function Dashboard() {
  const [totais, setTotais] = useState({ cursos: 0, categorias: 0, usuarios: 0, matriculas: 0 });
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      setLoading(true);
      setErro(null);
      try {
        const [cursos, categorias, usuarios, matriculas] = await Promise.all([
          cursoService.listar(),
          categoriaService.listar(),
          usuarioService.listar(),
          matriculaService.listar(),
        ]);
        setTotais({
          cursos: cursos.data.length,
          categorias: categorias.data.length,
          usuarios: usuarios.data.length,
          matriculas: matriculas.data.length,
        });
      } catch (error) {
        console.error(error);
        setErro('Erro ao carregar dashboard. Verifique se o backend está rodando.');
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  const cards = [
    { label: 'Cursos', valor: totais.cursos, cor: 'primary', icone: '🎓' },
    { label: 'Categorias', valor: totais.categorias, cor: 'success', icone: '📚' },
    { label: 'Usuários', valor: totais.usuarios, cor: 'warning', icone: '👥' },
    { label: 'Matrículas', valor: totais.matriculas, cor: 'info', icone: '📋' },
  ];

  return (
    <div>
      <h2 className="mb-4">📊 Dashboard</h2>
      {loading && <div className="text-center py-4"><div className="spinner-border text-primary" /><p className="mt-2 text-muted">Carregando...</p></div>}
      {erro && !loading && <div className="alert alert-danger">{erro}</div>}
      {!loading && !erro && (
        <div className="row g-4">
          {cards.map(card => (
            <div className="col-md-3" key={card.label}>
              <div className={`card border-${card.cor} text-center shadow-sm`}>
                <div className="card-body">
                  <div style={{ fontSize: '2rem' }}>{card.icone}</div>
                  <h5 className="card-title mt-2">{card.label}</h5>
                  <h2 className={`text-${card.cor}`}>{card.valor}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;