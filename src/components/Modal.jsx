import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        background: 'var(--bg-surface)',
        color: 'var(--text-main)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '400px',
        width: '90%',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    }
};

export function ConfirmModal({ isOpen, onRequestClose, children }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Confirm Delete"
        >
            {children}
        </Modal>
    );
}
Modal.setAppElement('#root');

