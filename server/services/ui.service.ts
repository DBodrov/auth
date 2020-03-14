export const createModalRootNode = (): HTMLElement => {
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
        const node = document.createElement('div');
        node.setAttribute('id', 'modal-root');
        document.body.appendChild(node);
        modalRoot = document.getElementById('modal-root');
    }
    return modalRoot;
};
