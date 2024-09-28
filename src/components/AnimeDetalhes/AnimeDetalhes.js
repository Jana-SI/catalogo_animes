import Button from "../Button/Button";
import "./AnimeDetalhes.css";

// Exibe os detalhes de um anime em um modal
const AnimeDetalhes = ({ titulo, children, onDelete, ...props }) => {
  return (
    <>
      {props.showModal && (
        <div
          className="modal fade show animeDetalhes" 
          style={{ display: "block" }}  
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{titulo}</h5>            
                <Button
                  className="btn btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close" 
                  type="button"
                  onClick={props.fecharModal} 
                />
              </div>
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnimeDetalhes;