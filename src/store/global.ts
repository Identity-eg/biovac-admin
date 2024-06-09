import { create } from 'zustand';

type TGlobalState = {
  openSidebar: boolean;
  toggleSidebar: () => void;

  openSidebarMobile: boolean;
  toggleSidebarMobile: () => void;
};

export const useGlobalStore = create<TGlobalState>()((set) => ({
  openSidebar: false,
  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),

  openSidebarMobile: false,
  toggleSidebarMobile: () =>
    set((state) => ({ openSidebarMobile: !state.openSidebarMobile })),
}));
