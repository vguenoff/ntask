import { createPortal } from 'react-dom'
import { bool, func, string } from 'prop-types'

import './index.scss'

Modal.propTypes = {
    isShowing: bool.isRequired,
    toggleModal: func.isRequired,
    title: string.isRequired,
}

export default function Modal({ isShowing, toggleModal, title, children }) {
    // TODO: Research click outside
    return isShowing
        ? createPortal(
              <div className="modal-overlay">
                  <div className="wrapper">
                      <div className="modal">
                          <div className="header">
                              <h4>{title}</h4>
                              <button type="button" onClick={toggleModal}>
                                  <span>&times;</span>
                              </button>
                          </div>
                          <div className="body">{children}</div>
                      </div>
                  </div>
              </div>,
              document.body,
          )
        : null
}
