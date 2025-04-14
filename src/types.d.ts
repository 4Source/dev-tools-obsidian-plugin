import { } from 'obsidian';

declare module 'obsidian' {
	interface WorkspaceParent {
		id: string,
		children: WorkspaceLeaf[],
		detach: () => void;
		selectTab: (leaf: WorkspaceLeaf) => void;
		selectTabIndex: (index: number) => void;
		recomputeChildrenDimensions: () => void;
	}

	interface WorkspaceLeaf {
		id: string,
		parent: WorkspaceTabs | WorkspaceMobileDrawer;
		setParent: (parent: WorkspaceParent) => void;
	}

	interface Workspace {
		getLayout(): unknown;
		setLayout(layout: unknown): void;
	}
}