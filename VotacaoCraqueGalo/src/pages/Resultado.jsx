import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularResultado,
  desfazerUltimoVoto,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = votos.length;
  const resultado = calcularResultado(votos);

  const craque = resultado[0];
  const vice = resultado[1];
  const vantagem = craque.votos - vice.votos;

  function handleDesfazer() {
    setVotos(desfazerUltimoVoto());
  }

  function handleZerar() {
    if (window.confirm('Apagar todos os votos?')) {
      zerarVotos();
      setVotos([]);
    }
  }

  function classePlacar(indice) {
    if (indice === 0) return 'placar-item placar-craque';
    if (indice === 1) return 'placar-item placar-vice';
    return 'placar-item';
  }

  return (
    <main className="pagina">
      <section className="pagina-topo">
        <h1>Parcial: Craque do Jogo</h1>
        <p className="total-votos">
          <strong>{total}</strong> {total === 1 ? 'voto computado' : 'votos computados'}
        </p>
      </section>

      {total === 0 ? (
        <section className="sem-votos">
          <p>Nenhum voto ainda. Escolha o craque do jogo para ver a parcial.</p>
          <Link to="/votacao" className="botao botao-principal">
            Ir para a votação
          </Link>
        </section>
      ) : (
        <>
          <p className="disputa">
            {vantagem === 0
              ? `Empate na liderança entre ${craque.nome} e ${vice.nome}!`
              : `${craque.nome} lidera com ${vantagem} ${vantagem === 1 ? 'voto' : 'votos'} de vantagem sobre ${vice.nome}.`}
          </p>

          <ol className="placar">
            {resultado.map((j, indice) => (
              <li key={j.id} className={classePlacar(indice)}>
                <span className="placar-posicao">{indice + 1}º</span>
                <img src={j.foto} alt={j.nome} className="placar-foto" />
                <div className="placar-info">
                  <h3 className="placar-nome">
                    {j.nome}
                    {indice === 0 && <span className="placar-selo selo-craque">Craque do jogo</span>}
                    {indice === 1 && <span className="placar-selo selo-vice">Vice</span>}
                  </h3>
                  <div className="barra">
                    <div className="barra-preenchida" style={{ width: `${j.percentual}%` }} />
                  </div>
                  <p className="placar-votos">
                    {j.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}% ({j.votos}{' '}
                    {j.votos === 1 ? 'voto' : 'votos'})
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="resultado-acoes">
            <button type="button" className="botao botao-claro" onClick={handleDesfazer}>
              Desfazer último voto
            </button>
            <button type="button" className="botao botao-contorno" onClick={handleZerar}>
              Zerar votação
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Resultado;
