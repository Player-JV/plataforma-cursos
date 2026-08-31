import { ReactNode } from 'react';

interface Props {
  titulo: string;
  onSalvar: () => void;
  onFechar: () => void;
  children: ReactNode;
}

function Modal({ titulo, onSalvar, onFechar, children }: Props) {
  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">{titulo}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onFechar} />
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onFechar}>Cancelar</button>
            <button className="btn btn-primary" onClick={onSalvar}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;