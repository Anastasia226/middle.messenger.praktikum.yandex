import Block from "@/services/block";

export function render(root: HTMLElement | null, component: Block) {
    if (root) {
        root.innerHTML = ''
        root.appendChild(component.getContent()!);
    }
    component.dispatchComponentDidMount();
    return root;
}