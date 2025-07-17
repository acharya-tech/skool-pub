import { useEffect, useState } from "react";
import { IItem, IMenuContext } from "../interface";
import { editorMergeItem } from "../utils";

interface IUseMenuContext {
  setItemList: React.Dispatch<React.SetStateAction<IItem[]>>;
}

const MENU_INITIAL: IMenuContext = {
  action: null,
  element: null,
  open: false,
  position: undefined,
};

export const useMenuContext = ({ setItemList }: IUseMenuContext) => {
  const [menuState, setMenu] = useState<IMenuContext>(MENU_INITIAL);

  // Handle menu actions
  useEffect(() => {
    if (!menuState.element || !menuState.action) return;

    handleUpdateMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuState.action, menuState.element]);

  // Handle keypress and global click events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!menuState.element) return;

      const { id } = menuState.element;

      switch (e.key) {
        case "Delete":
          setItemList((prev) => prev.filter((el) => el.id !== id));
          resetMenu();
          break;
        case "ArrowRight":
          updateElementPosition(id, 1, 0);
          break;
        case "ArrowLeft":
          updateElementPosition(id, -1, 0);
          break;
        case "ArrowUp":
          updateElementPosition(id, 0, -1);
          break;
        case "ArrowDown":
          updateElementPosition(id, 0, 1);
          break;
      }
    };

    const handleCloseContextMenu = () =>
      setMenu((prev) => ({ ...prev, open: false }));

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("click", handleCloseContextMenu);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("click", handleCloseContextMenu);
    };
  }, [menuState.element, setItemList]);

  const handleUpdateMenu = () => {
    const { action, element } = menuState;

    if (!element) return;

    switch (action) {
      case "delete":
        setItemList((prev) => prev.filter((el) => el.id !== element.id));
        resetMenu();
        break;
      case "hide":
        updateElementProperty(element.id, { hidden: true });
        break;
      case "show":
        updateElementProperty(element.id, { hidden: false });
        break;
      case "lock":
        updateElementProperty(element.id, { locked: true });
        break;
      case "unlock":
        updateElementProperty(element.id, { locked: false });
        break;
      case "bottom":
        setItemList((els) => [
          ...els.filter((el) => el.id !== element.id),
          element,
        ]);
        break;
      case "top":
        setItemList((els) => [
          element,
          ...els.filter((el) => el.id !== element.id),
        ]);
        break;
      case "clone":
        const clone = {
          ...element,
          id: Date.now().toString(),
          x: element.x + 30,
          y: element.y + 30,
        };
        setItemList((els) => [clone, ...els]);
        break;
      default:
        break;
    }
  };

  const resetMenu = () => {
    setMenu(MENU_INITIAL);
  };

  const updateElementProperty = (id: string, props: Partial<IItem>) => {
    setItemList((els) =>
      els.map((el) => (el.id === id ? editorMergeItem(el, props) : el))
    );
    resetMenu();
  };

  const updateElementPosition = (id: string, dx: number, dy: number) => {
    setItemList((els) =>
      els.map((el) =>
        el.id === id ? { ...el, x: el.x + dx, y: el.y + dy } : el
      )
    );
  };

  return {
    menuState,
    setMenu,
    resetMenu,
  };
};
