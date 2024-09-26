import './AnimeDetalhes.css';

const AnimeDetalhes = ({ showModal, fecharModal, titulo, children }) => {
    return (
        <>
         {/* Estrutura do Modal usando classes do Bootstrap 
        Exibe detalhes se um anime estiver selecionado*/}
        {showModal && (

        <div
        className="modal fade show animdeDetalhes"
        style={{ display: "block" }}
        onClick={fecharModal}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{titulo}</h5>
              <button
                className="btn btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                type="button"
                onClick={fecharModal}
              ></button>
            </div>
            <div className="modal-body">
            {children}
            </div>
              </div>
            </div>
          </div>

    )}
        </>
    )
}

export default AnimeDetalhes;